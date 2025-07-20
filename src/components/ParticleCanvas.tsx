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

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseCoordRef = useRef({ x: 0, y: 0 });
  const previousMouseCoordRef = useRef({ x: 0, y: 0 });

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

    canvas.height = canvas.getBoundingClientRect().height;
    canvas.width = canvas.getBoundingClientRect().width;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "bold " + canvas.width / 8 + "px sans-serif";
    context.fillStyle = getCssVar("--scene-background") || "black";
    context.textAlign = "left";

    const marginTop404 = 200;
    const marginTopOthersubtitle = 350;
    const marginTopSubtitle = 500;

    context.fillText("Étudiant", 50, marginTop404);

    context.font = "bold " + canvas.width / 9 + "px sans-serif";
    context.fillText("Ingénieur IA", 50, marginTopOthersubtitle);

    context.font = canvas.width / 14 + "px sans-serif";
    context.fillText("- JUNIA ISEN", 50, marginTopSubtitle);

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

    requestAnimationFrame(renderScene);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initScene();
    renderScene();

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    const handleResize = () => {
      initScene();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas id="scene" ref={canvasRef} />;
};

export default ParticleCanvas;
