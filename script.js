// Ajoutez ceci à la fin de votre fichier JS
gsap.registerPlugin(ScrollTrigger);

// Scroll horizontal de la section 1 à 2
let sectionsHorizontal1 = gsap.utils.toArray(".wrapper-horizontal-1 .panel");

gsap.to(sectionsHorizontal1, {
    xPercent: -100 * (sectionsHorizontal1.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".wrapper-horizontal-1",
        pin: true,
        scrub: 0.1,
        end: "+=2000"
    }
});

// Scroll vertical de la section 2 à 5
let sectionsVertical = gsap.utils.toArray(".section3, .section4");

sectionsVertical.forEach((section, index) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        // Ne pas utiliser pin pour éviter l'effet de superposition
        pin: false,
        pinSpacing: false
    });
});

// Scroll horizontal de la section 5 à 6
let sectionsHorizontal2 = gsap.utils.toArray(".wrapper-horizontal-2 .panel");

gsap.to(sectionsHorizontal2, {
    xPercent: -100 * (sectionsHorizontal2.length - 1),
    ease: "none",
    scrollTrigger: {
        trigger: ".wrapper-horizontal-2",
        pin: true,
        scrub: 0.1,
        end: "+=2000"
    }
});

// Animation de la timeline
document.addEventListener("DOMContentLoaded", function() {
    let options = {
        threshold: 0.5
    };

    let observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                let delay = index * 600; // Délai entre les apparitions des items

                // Ajouter un délai supplémentaire pour les items de la deuxième section
                if (entry.target.parentElement.parentElement.classList.contains('section6')) {
                    delay += 1000; // Par exemple, 1000ms de plus
                }

                setTimeout(() => {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    }, options);

    let items = document.querySelectorAll(".timeline-item");
    items.forEach(item => {
        observer.observe(item);
    });
});





// Animation des bulles
const bubbles = document.querySelectorAll('.bubble');

bubbles.forEach(bubble => {
    animateBubble(bubble);
});

function animateBubble(bubble) {
    setInterval(() => {
        const top = random(50, 80);
        const bottom = random(50, 80);
        const left = random(50, 80);
        const right = random(50, 80);
        bubble.style.borderRadius = `${top}% ${100 - top}% ${bottom}% ${100 - bottom}% / ${left}% ${100 - right}% ${100 - right}% ${left}%`;
    }, 2000); // Ajustez la durée selon vos besoins
}

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getCssVar(v) {
    return getComputedStyle(document.documentElement).getPropertyValue(v);
}

let text404 = 'Romain';
let textSubtitle = 'Étudiant Ingénieur IA '; // Texte supplémentaire
let textTest = 'JUNIA Isen'; // Nouveau texte
let canvas = document.getElementById('scene');
let ch = canvas.height = canvas.getBoundingClientRect().height;
let cw = canvas.width = canvas.getBoundingClientRect().width;
let sceneBackground = getCssVar('--scene-background');
let context = canvas.getContext('2d');
let previousMouseCoord = { x: 0, y: 0 };
let mouseCoord = { x: 0, y: 0 };
let sceneResize = false;
let particlesCount = 0;
let particles = [];
let colors = [
    getCssVar('--particle-color-1'),
    getCssVar('--particle-color-2'),
    getCssVar('--particle-color-3'),
    getCssVar('--particle-color-4'),
    getCssVar('--particle-color-5')
];
const dpi = 200;

let Particle = function(x, y) {
    this.x = getRandomInt(cw);
    this.y = getRandomInt(ch);
    this.coord = { x: x, y: y };
    this.r = Math.min((getRandomInt((cw / dpi)) + 1), 6);
    this.vx = (Math.random() - 0.5) * 100;
    this.vy = (Math.random() - 0.5) * 100;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.05 + 0.90;
    this.color = colors[Math.floor(Math.random() * 6)];
}

Particle.prototype.render = function(isDisableMouse) {
    this.accX = (this.coord.x - this.x) / 100;
    this.accY = (this.coord.y - this.y) / 100;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.x += this.vx;
    this.y += this.vy;
    if (!isDisableMouse) {
        let a = this.x - mouseCoord.x;
        let b = this.y - mouseCoord.y;
        var distance = Math.sqrt(a * a + b * b);
        if (distance < (cw / 15)) {
            this.accX = (this.x - mouseCoord.x) / 100;
            this.accY = (this.y - mouseCoord.y) / 100;
            this.vx += this.accX;
            this.vy += this.accY;
        }
    }
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
}

function onmouseCoordMove(e) {
    let rect = canvas.getBoundingClientRect();
    mouseCoord.x = e.clientX - rect.left;
    mouseCoord.y = e.clientY - rect.top;
}

function onTouchMove(e) {
    if (e.touches.length > 0) {
        let rect = canvas.getBoundingClientRect();
        mouseCoord.x = e.touches[0].clientX - rect.left;
        mouseCoord.y = e.touches[0].clientY - rect.top;
    }
}

function onTouchEnd() {
    mouseCoord.x = -9999;
    mouseCoord.y = -9999;
}

function initScene() {
    ch = canvas.height = canvas.getBoundingClientRect().height;
    cw = canvas.width = canvas.getBoundingClientRect().width;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = 'bold ' + (cw / 8) + 'px sans-serif';
    context.fillStyle = sceneBackground;
    context.textAlign = 'center';
    context.fillText(text404, cw / 2, ch / 2);

    // Ajouter le texte supplémentaire
    context.font = (cw / 11) + 'px sans-serif';
    context.fillText(textSubtitle, cw / 2, ch / 2 + cw / 10 + 20);

    // Ajouter le nouveau texte "test"
    context.font = (cw / 11) + 'px sans-serif';
    context.fillText(textTest, cw / 2, ch / 2 + cw / 5 + 40);

    let imageData = context.getImageData(0, 0, cw, ch).data;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'screen';
    particles = [];
    for (let y = 0; y < ch; y += Math.round(cw / dpi)) {
        for (let x = 0; x < cw; x += Math.round(cw / dpi)) {
            if (imageData[((x + y * cw) * 4) + 3] > 128) {
                particles.push(new Particle(x, y));
            }
        }
    }
    particlesCount = particles.length;
}

function renderScene() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let isDisableMouse = false;
    if ((previousMouseCoord.x === mouseCoord.x) && (previousMouseCoord.y === mouseCoord.y)) {
        isDisableMouse = true;
    } else {
        previousMouseCoord.x = mouseCoord.x;
        previousMouseCoord.y = mouseCoord.y;
        isDisableMouse = false;
    }
    for (let i = 0; i < particlesCount; i++) {
        particles[i].render(isDisableMouse);
    }
    requestAnimationFrame(renderScene);
};

document.addEventListener('DOMContentLoaded', function() {
    initScene();
    renderScene();
    window.addEventListener('mousemove', onmouseCoordMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('resize', function() {
        if (!sceneResize) {
            requestAnimationFrame(function() {
                initScene();
                sceneResize = false;
            });
            sceneResize = true;
        }
    });
});


// animation derniere page
document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    };

    window.addEventListener('mousemove', event => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});
