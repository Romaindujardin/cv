function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getCssVar(v) {
  return getComputedStyle(document.documentElement).getPropertyValue(v);
}

let text404 = 'Étudiant'; // Texte supplémentaire
let othersubtitle = 'Ingénieur IA';
let textSubtitle = '- JUNIA ISEN'; // Nouveau texte

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
  context.textAlign = 'left';
// Taille des marges en pixels
  let marginTop404 = 200;      // Marge supérieure pour le texte principal (en px)
  let marginTopOthersubtitle = 350; // Marge supérieure pour l'autre texte (en px)
  let marginTopSubtitle = 500; // Marge supérieure pour le texte supplémentaire (en px)

// Texte principal
  context.fillText(text404, 50, marginTop404);

// Texte supplémentaire
  context.font = 'bold ' + (cw / 9) + 'px sans-serif';
  context.fillText(othersubtitle, 50, marginTopOthersubtitle);

// Texte supplémentaire
  context.font = (cw / 14) + 'px sans-serif';
  context.fillText(textSubtitle, 50, marginTopSubtitle);





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

// Afficher le loader et empêcher le défilement
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  document.body.classList.add('noscroll'); // Ajoute la classe pour bloquer le défilement

  // Simuler une fin de chargement après 3 secondes (par exemple)
  setTimeout(() => {
    loader.style.display = 'none'; // Cache le loader
    document.body.classList.remove('noscroll'); // Réactive le défilement
  }, 3000); // Remplace 3000 par la durée réelle du chargement
});

document.getElementById('navbarToggle').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'flex';
});

document.getElementById('closeOverlay').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'none';
});

document.querySelectorAll('.overlay-link').forEach(link => {
  link.addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
  });
});
