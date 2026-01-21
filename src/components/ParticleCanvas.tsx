import React, { useEffect, useRef } from "react";
import "./ParticleCanvas.css";

interface Particle {
  x: number;
  y: number;
  coord: { x: number; y: number };
  r: number;
  vx: number;
  vy: number;
  accX: number;
  accY: number;
  friction: number;
  color: string;
}

type ParticleCanvasMode = "default" | "welcome";

type ParticleCanvasProps = {
  mode?: ParticleCanvasMode;
};

const ParticleCanvas: React.FC<ParticleCanvasProps> = ({
  mode = "default",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseCoordRef = useRef({ x: 0, y: 0 });
  const previousMouseCoordRef = useRef({ x: 0, y: 0 });
  const modeRef = useRef<ParticleCanvasMode>(mode);
  const rafIdRef = useRef<number | null>(null);
  const lastSizeRef = useRef<{ w: number; h: number } | null>(null);

  const random = (min: number, max: number): number => {
    return Math.round(Math.random() * (max - min) + min);
  };

  const getRandomInt = (max: number): number => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  const getCssVar = (v: string): string => {
    return getComputedStyle(document.documentElement).getPropertyValue(v);
  };

  const colors = [
    getCssVar("--particle-color-1"),
    getCssVar("--particle-color-2"),
    getCssVar("--particle-color-3"),
    getCssVar("--particle-color-4"),
    getCssVar("--particle-color-5"),
  ];

  const dpi = 200;

  const createParticle = (x: number, y: number): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    return {
      x: getRandomInt(canvas.width),
      y: getRandomInt(canvas.height),
      coord: { x, y },
      r: Math.min(getRandomInt(canvas.width / dpi) + 1, 6),
      vx: (Math.random() - 0.5) * 100,
      vy: (Math.random() - 0.5) * 100,
      accX: 0,
      accY: 0,
      friction: Math.random() * 0.05 + 0.9,
      color: colors[Math.floor(Math.random() * 6)],
    };
  };

  const renderParticle = (particle: Particle, isDisableMouse: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    particle.accX = (particle.coord.x - particle.x) / 100;
    particle.accY = (particle.coord.y - particle.y) / 100;
    particle.vx += particle.accX;
    particle.vy += particle.accY;
    particle.vx *= particle.friction;
    particle.vy *= particle.friction;
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (!isDisableMouse) {
      const a = particle.x - mouseCoordRef.current.x;
      const b = particle.y - mouseCoordRef.current.y;
      const distance = Math.sqrt(a * a + b * b);
      if (distance < canvas.width / 15) {
        particle.accX = (particle.x - mouseCoordRef.current.x) / 100;
        particle.accY = (particle.y - mouseCoordRef.current.y) / 100;
        particle.vx += particle.accX;
        particle.vy += particle.accY;
      }
    }

    context.fillStyle = particle.color;
    context.beginPath();
    context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
  };

  const onMouseMove = (e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseCoordRef.current.x = e.clientX - rect.left;
    mouseCoordRef.current.y = e.clientY - rect.top;
  };

  const onTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseCoordRef.current.x = e.touches[0].clientX - rect.left;
      mouseCoordRef.current.y = e.touches[0].clientY - rect.top;
    }
  };

  const onTouchEnd = () => {
    mouseCoordRef.current.x = -9999;
    mouseCoordRef.current.y = -9999;
  };

  const initScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rect = canvas.getBoundingClientRect();
    canvas.height = rect.height;
    canvas.width = rect.width;
    lastSizeRef.current = { w: rect.width, h: rect.height };

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = getCssVar("--scene-background") || "black";

    const getTextMetrics = (text: string, fontSizePx: number) => {
      const metrics = context.measureText(text);
      const ascent =
        metrics.actualBoundingBoxAscent ?? Math.round(fontSizePx * 0.8);
      const descent =
        metrics.actualBoundingBoxDescent ?? Math.round(fontSizePx * 0.2);
      return { ascent, descent, height: ascent + descent };
    };

    // Le canvas fait 120vh; si on centre sur canvas.height/2, le texte paraît "trop bas"
    // dans le viewport. On centre donc par rapport au viewport (clamp si besoin).
    const viewportHeight = Math.min(canvas.height, window.innerHeight);
    const viewportCenterY = viewportHeight / 2;
    // Petit ajustement visuel vers le haut (le rendu canvas paraît souvent "un peu bas")
    const nudgeUpPx =
      Math.round(Math.min(28, Math.max(12, viewportHeight * 0.02))) + 50;
    const targetCenterY = viewportCenterY - nudgeUpPx;

    if (modeRef.current === "welcome") {
      context.textAlign = "center";
      context.textBaseline = "alphabetic";
      const size = canvas.width / 6;
      context.font = "bold " + size + "px sans-serif";

      const { ascent, descent } = getTextMetrics("WELCOME", size);
      const baselineY = targetCenterY + Math.round((ascent - descent) / 2);
      context.fillText("WELCOME", canvas.width / 2, baselineY);
    } else {
      context.textAlign = "center";
      context.textBaseline = "alphabetic";

      const size1 = canvas.width / 8;
      const size2 = canvas.width / 9;
      const size3 = canvas.width / 14;
      const gap = Math.max(12, canvas.width / 40);

      const cx = canvas.width / 2;
      const cy = targetCenterY;

      const line1 = "Ingénieur IA";
      const line2 = "";
      const line3 = "Septembre 2026";

      context.font = "bold " + size1 + "px sans-serif";
      const m1 = getTextMetrics(line1, size1);

      context.font = "bold " + size2 + "px sans-serif";
      const m2 = getTextMetrics(line2, size2);

      context.font = size3 + "px sans-serif";
      const m3 = getTextMetrics(line3, size3);

      const totalHeight = m1.height + gap + m2.height + gap + m3.height;
      const topY = cy - totalHeight / 2;

      const baseline1 = topY + m1.ascent;
      const baseline2 = baseline1 + m1.descent + gap + m2.ascent;
      const baseline3 = baseline2 + m2.descent + gap + m3.ascent;

      context.font = "bold " + size1 + "px sans-serif";
      context.fillText(line1, cx, baseline1);

      context.font = "bold " + size2 + "px sans-serif";
      context.fillText(line2, cx, baseline2);

      context.font = size3 + "px sans-serif";
      context.fillText(line3, cx, baseline3);
    }

    const imageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ).data;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = "screen";

    particlesRef.current = [];
    for (let y = 0; y < canvas.height; y += Math.round(canvas.width / dpi)) {
      for (let x = 0; x < canvas.width; x += Math.round(canvas.width / dpi)) {
        if (imageData[(x + y * canvas.width) * 4 + 3] > 128) {
          particlesRef.current.push(createParticle(x, y));
        }
      }
    }
  };

  const renderScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const isDisableMouse =
      previousMouseCoordRef.current.x === mouseCoordRef.current.x &&
      previousMouseCoordRef.current.y === mouseCoordRef.current.y;

    if (!isDisableMouse) {
      previousMouseCoordRef.current.x = mouseCoordRef.current.x;
      previousMouseCoordRef.current.y = mouseCoordRef.current.y;
    }

    particlesRef.current.forEach((particle) => {
      renderParticle(particle, isDisableMouse);
    });

    rafIdRef.current = requestAnimationFrame(renderScene);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initScene();
    renderScene();

    window.addEventListener("mousemove", onMouseMove);
    // passive: important sur mobile pour ne pas perturber le scroll
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    const handleResize = () => {
      // Sur iOS/Android, le scroll peut déclencher des "resize" (barre d'adresse).
      // Réinitialiser les particules dans ce cas donne l'effet "reset" à chaque scroll.
      // On ne rebuild que si la largeur change réellement (orientation / vrai resize).
      const rect = canvas.getBoundingClientRect();
      const last = lastSizeRef.current;
      const widthChanged = !last || Math.abs(rect.width - last.w) > 1;
      if (widthChanged) initScene();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  useEffect(() => {
    modeRef.current = mode;
    initScene();
  }, [mode]);

  return <canvas id="scene" ref={canvasRef} />;
};

export default ParticleCanvas;
