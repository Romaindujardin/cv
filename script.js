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

// deuxieme page
"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const menu = new Accordion("#menu");
});
class Accordion {
    /**
     * @param el CSS selector of the accordion
     */
    constructor(el) {
        var _a;
        /** Accordion item array */
        this.items = [];
        this.el = document.querySelector(el);
        const itemEls = Array.from(((_a = this.el) === null || _a === void 0 ? void 0 : _a.querySelectorAll("details")) || []);
        itemEls.forEach((itemEl, i) => {
            const id = `${i}`;
            itemEl.setAttribute("data-item", id);
            this.items.push(new AccordionItem(id, this));
        });
    }
}
class AccordionItem {
    /**
     * @param id ID of the accordion item
     * @param parent Accordion object to which the item belongs
     */
    constructor(id, parent) {
            var _a, _b, _c, _d;
            /** Element is collapsing */
            this.isCollapsing = false;
            /** Element is expanding */
            this.isExpanding = false;
            /** Animation duration and easing */
            this.animParams = {
                duration: 500,
                easing: "cubic-bezier(0.33,1,0.68,1)"
            };
            /** Actions to run after expanding the item. */
            this.animActionsExpand = {
                onfinish: this.onAnimationFinish.bind(this, true),
                oncancel: () => { this.isExpanding = false; }
            };
            /** Actions to run after collapsing the item. */
            this.animActionsCollapse = {
                onfinish: this.onAnimationFinish.bind(this, false),
                oncancel: () => { this.isCollapsing = false; }
            };
            this.parent = parent;
            this.el = (_a = this.parent.el) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-item="${id}"]`);
            this.summary = (_b = this.el) === null || _b === void 0 ? void 0 : _b.querySelector("summary");
            (_c = this.summary) === null || _c === void 0 ? void 0 : _c.addEventListener("click", this.toggle.bind(this));
            this.content = (_d = this.summary) === null || _d === void 0 ? void 0 : _d.nextElementSibling;
        }
        /** Close any open items. */
    closePrevious() {
            const openItems = this.parent.items.filter(item => { var _a; return item.isExpanding || ((_a = item.el) === null || _a === void 0 ? void 0 : _a.open); });
            openItems === null || openItems === void 0 ? void 0 : openItems.forEach(item => item.collapse());
        }
        /**
         * Open or close the accordion.
         * @param e Click event whose default behavior should be prevented
         */
    toggle(e) {
            var _a, _b, _c, _d, _e;
            e === null || e === void 0 ? void 0 : e.preventDefault();
            (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.remove("collapsing", "expanding");
            const detailsClicked = (e === null || e === void 0 ? void 0 : e.target).parentElement;
            const dataItemClicked = detailsClicked === null || detailsClicked === void 0 ? void 0 : detailsClicked.getAttribute("data-item");
            const detailsOpen = (_c = (_b = this.el) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector("[open]");
            const dataItemOpen = detailsOpen === null || detailsOpen === void 0 ? void 0 : detailsOpen.getAttribute("data-item");
            if (dataItemClicked !== dataItemOpen) {
                // run the pre-toggle action only if a different item is clicked
                this.closePrevious();
            }
            if (this.isCollapsing || !((_d = this.el) === null || _d === void 0 ? void 0 : _d.open)) {
                this.open();
            } else if (this.isExpanding || ((_e = this.el) === null || _e === void 0 ? void 0 : _e.open)) {
                this.collapse();
            }
        }
        /** Open the item and run the animation for expanding. */
    open() {
            if (this.el) {
                this.el.style.height = `${this.el.offsetHeight}px`;
                this.el.open = true;
                this.expand();
            }
        }
        /** Expansion animation */
    expand() {
            var _a, _b, _c, _d, _e, _f;
            (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.add("expanding");
            this.isExpanding = true;
            const startHeight = ((_b = this.el) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
            const summaryHeight = ((_c = this.summary) === null || _c === void 0 ? void 0 : _c.offsetHeight) || 0;
            const contentHeight = ((_d = this.content) === null || _d === void 0 ? void 0 : _d.offsetHeight) || 0;
            const endHeight = summaryHeight + contentHeight;
            (_e = this.animation) === null || _e === void 0 ? void 0 : _e.cancel();
            this.animation = (_f = this.el) === null || _f === void 0 ? void 0 : _f.animate({ height: [`${startHeight}px`, `${endHeight}px`] }, this.animParams);
            if (this.animation) {
                this.animation.onfinish = this.animActionsExpand.onfinish;
                this.animation.oncancel = this.animActionsExpand.oncancel;
            }
        }
        /** Close the item and run the animation for collapsing. */
    collapse() {
            var _a, _b, _c, _d, _e;
            (_a = this.el) === null || _a === void 0 ? void 0 : _a.classList.add("collapsing");
            this.isCollapsing = true;
            const startHeight = ((_b = this.el) === null || _b === void 0 ? void 0 : _b.offsetHeight) || 0;
            const endHeight = ((_c = this.summary) === null || _c === void 0 ? void 0 : _c.offsetHeight) || 0;
            (_d = this.animation) === null || _d === void 0 ? void 0 : _d.cancel();
            this.animation = (_e = this.el) === null || _e === void 0 ? void 0 : _e.animate({ height: [`${startHeight}px`, `${endHeight}px`] }, this.animParams);
            if (this.animation) {
                this.animation.onfinish = this.animActionsCollapse.onfinish;
                this.animation.oncancel = this.animActionsCollapse.oncancel;
            }
        }
        /** Actions to run when the animation is finished */
    onAnimationFinish(open) {
        if (this.el) {
            this.el.open = open;
            if (this.animation) {
                this.animation = null;
            }
            this.isCollapsing = false;
            this.isExpanding = false;
            this.el.style.height = "";
            this.el.classList.remove("collapsing", "expanding");
        }
    }
}

// fonction qui permets de faire apparaitre le contenu principal après 5 secondes pour la deuxieme page
document.addEventListener("DOMContentLoaded", function() {
    // Fonction à exécuter lorsque la section est visible
    const onSectionVisible = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cachez le contenu principal et affichez le texte "test" pendant 3 secondes
                setTimeout(function() {
                    // Cachez le texte "test"
                    document.getElementById("loadingText").style.display = "none";

                    // Affichez le contenu principal
                    document.getElementById("menu").classList.remove("hidden");
                }, 5000); // 5000 millisecondes = 5 secondes, ajustez selon le commentaire précédent

                // Arrête d'observer après le déclenchement
                observer.disconnect();
            }
        });
    };

    // Créez un observateur
    const observer = new IntersectionObserver(onSectionVisible, {
        threshold: 0.5 // 50% de la section doit être visible pour déclencher le callback
    });

    // Ciblez la section "panel section2"
    const section2 = document.getElementById("section2");
    observer.observe(section2);
});

// fonction qui permets de faire apparaitre le contenu principal après 5 secondes pour la timeline
document.addEventListener("DOMContentLoaded", function() {
    // Fonction à exécuter lorsque la section est visible
    const onSectionVisible = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cachez le contenu principal et affichez le texte "test" pendant 3 secondes
                setTimeout(function() {
                    // Cachez le texte "test"
                    document.getElementById("loadingText1").style.display = "none";

                    // Affichez le contenu principal
                    document.getElementById("timeline").classList.remove("hidden");
                }, 5000); // 5000 millisecondes = 5 secondes, ajustez selon le commentaire précédent

                // Arrête d'observer après le déclenchement
                observer.disconnect();
            }
        });
    };

    // Créez un observateur
    const observer = new IntersectionObserver(onSectionVisible, {
        threshold: 0.5 // 50% de la section doit être visible pour déclencher le callback
    });

    // Ciblez la section "panel section2"
    const section5 = document.getElementById("section5");
    observer.observe(section5);
});

document.getElementById('cards').onmousemove = e => {
    for (const card of document.getElementsByClassName('card')) {
        const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
    }
};
