/* =========================================================
   Romain Dujardin — comportements du site
   ========================================================= */

(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Thème clair / sombre ---------- */
  var STORAGE_KEY = "rd-theme";

  function applyTheme(theme) {
    doc.setAttribute("data-theme", theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#0f1115" : "#fbfaf8");
  }

  // La révélation circulaire repose sur l'API View Transitions. Sans elle, ou
  // si l'utilisateur a demandé moins d'animation, on bascule simplement.
  function revelationPossible() {
    return (
      typeof document.startViewTransition === "function" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  // Le nouveau thème est dévoilé par un cercle qui naît au centre du bouton et
  // s'élargit jusqu'à couvrir l'écran. L'ancienne image reste dessous : le
  // changement paraît progressif au lieu d'être un basculement sec.
  function revelerTheme(btn, theme) {
    var boite = btn.getBoundingClientRect();
    var x = boite.left + boite.width / 2;
    var y = boite.top + boite.height / 2;

    // Rayon qu'il faut pour atteindre le coin le plus éloigné du bouton.
    var rayon = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Un écran large n'a pas besoin d'une animation plus longue, seulement plus
    // ample : on borne la durée pour rester vif partout.
    var duree = Math.min(680, Math.max(380, Math.round(rayon * 0.6)));

    var transition = document.startViewTransition(function () {
      applyTheme(theme);
    });

    transition.ready
      .then(function () {
        doc.animate(
          {
            clipPath: [
              "circle(0px at " + x + "px " + y + "px)",
              "circle(" + rayon + "px at " + x + "px " + y + "px)"
            ]
          },
          {
            duration: duree,
            easing: "cubic-bezier(.2,.7,.2,1)",
            pseudoElement: "::view-transition-new(root)"
          }
        );
      })
      .catch(function () {
        /* transition interrompue : le thème est déjà appliqué */
      });
  }

  var saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* stockage indisponible */
  }

  if (saved === "dark" || saved === "light") {
    applyTheme(saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = doc.getAttribute("data-theme") === "dark" ? "light" : "dark";

      if (revelationPossible()) {
        revelerTheme(btn, next);
      } else {
        applyTheme(next);
      }

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* stockage indisponible */
      }
    });
  });

  /* ---------- 2. Menu mobile ---------- */
  var nav = document.querySelector(".site-nav");
  var navToggle = document.querySelector(".nav-toggle");
  var navPanel = document.getElementById("panneau-nav");

  function setNavOpen(open) {
    if (!nav) return;
    nav.setAttribute("data-open", open ? "true" : "false");
    document.body.classList.toggle("nav-open", open);

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    }

    // Le panneau couvre l'écran : on empêche la page de défiler derrière.
    if (open) {
      var scrollbar = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbar > 0) {
        document.body.style.paddingRight = scrollbar + "px";
      }
    } else {
      document.body.style.paddingRight = "";
    }
  }

  function closeNav() {
    setNavOpen(false);
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      setNavOpen(nav.getAttribute("data-open") !== "true");
    });
  }

  if (navPanel) {
    navPanel.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });

  document.addEventListener("click", function (event) {
    if (!nav || nav.getAttribute("data-open") !== "true") return;
    if (!nav.contains(event.target)) closeNav();
  });

  /* ---------- 3. En-tête collant ---------- */
  var header = document.querySelector(".site-header");
  var lastStuck = null;

  function onScroll() {
    if (!header) return;
    var stuck = window.scrollY > 8;
    if (stuck !== lastStuck) {
      header.classList.toggle("is-stuck", stuck);
      lastStuck = stuck;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 4. Surlignage du lien de navigation actif ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a[data-nav]"));
  var navLinksList = nav ? nav.querySelector(".nav-links") : null;
  var navIndicator = nav ? nav.querySelector(".nav-indicator") : null;
  var indicatorReady = false;

  // Le point se pose sous le lien survolé ; à défaut sous celui qui reçoit le
  // clavier ; à défaut sous la rubrique active. C'est cet ordre de priorité qui
  // donne l'impression qu'il voyage d'un élément à l'autre.
  var lienSurvole = null;
  var lienAuClavier = null;

  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("data-nav");
      return document.getElementById(id);
    })
    .filter(Boolean);

  function lienActif() {
    return nav ? nav.querySelector('.nav-links a[aria-current="true"]') : null;
  }

  function cibleIndicator() {
    return lienSurvole || lienAuClavier || lienActif();
  }

  // Le point de navigation est un élément unique que l'on translate : il glisse
  // d'une cible à l'autre au lieu de sauter. L'abscisse suit la cible ; la
  // hauteur reste celle de la rubrique active, pour qu'il ne change jamais de
  // ligne et se contente de couler latéralement.
  function placeIndicator(cible) {
    if (!nav || !navIndicator) return;

    var lien = cible || cibleIndicator();
    if (!lien) return;

    var navBox = nav.getBoundingClientRect();
    var lienBox = lien.getBoundingClientRect();
    if (!lienBox.width) return; // point masqué (mobile ou panneau fermé)

    var ligne = lienActif() || lien;
    var ligneBox = ligne.getBoundingClientRect();

    nav.style.setProperty(
      "--dot-x",
      Math.round(lienBox.left - navBox.left + lienBox.width / 2 - 4) + "px"
    );
    nav.style.setProperty("--dot-y", Math.round(ligneBox.bottom - navBox.top - 8) + "px");

    if (!indicatorReady) {
      // Premier placement : on fige la position avant d'activer la transition,
      // sinon le point traverserait la barre en partant du coin.
      void nav.offsetWidth;
      nav.setAttribute("data-indicator-ready", "true");
      indicatorReady = true;
    }
  }

  function setActive(id) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("data-nav") === id) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    // Le survol reste prioritaire : on ne ramène pas le point sous la souris.
    placeIndicator();
  }

  // La souris fait voyager le point ; en quittant la liste il regagne la
  // rubrique active. Un doigt, lui, ne survole pas : on l'ignore.
  navLinks.forEach(function (link) {
    link.addEventListener("pointerenter", function (event) {
      if (event.pointerType === "touch") return;
      lienSurvole = link;
      placeIndicator();
    });

    link.addEventListener("focus", function () {
      lienAuClavier = link;
      placeIndicator();
    });

    link.addEventListener("blur", function () {
      if (lienAuClavier === link) lienAuClavier = null;
      placeIndicator();
    });
  });

  if (navLinksList) {
    navLinksList.addEventListener("pointerleave", function () {
      lienSurvole = null;
      placeIndicator();
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var visible = Object.create(null);

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });

        var best = null;
        var bestRatio = 0;
        Object.keys(visible).forEach(function (id) {
          if (visible[id] > bestRatio) {
            bestRatio = visible[id];
            best = id;
          }
        });

        if (best) setActive(best);
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.15, 0.4, 0.75, 1] }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }

  // La position du point dépend de la largeur des libellés : on la recalcule
  // quand la fenêtre change de taille ou que la police finit de charger.
  // Revenir en desktop avec le menu ouvert laisserait la page verrouillée.
  function onViewportChange() {
    if (nav && nav.getAttribute("data-open") === "true" && window.matchMedia("(min-width: 901px)").matches) {
      closeNav();
    }

    // La largeur des libellés a changé : les cibles mémorisées ne valent plus.
    lienSurvole = null;
    lienAuClavier = null;
    placeIndicator();
  }

  window.addEventListener("resize", onViewportChange);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(onViewportChange);
  }

  /* ---------- 5. Boutons « afficher plus » ---------- */
  function wireToggle(buttonId, listId, expandedLabel, collapsedLabel) {
    var button = document.getElementById(buttonId);
    var list = document.getElementById(listId);
    if (!button || !list) return;

    var extras = Array.prototype.slice.call(list.querySelectorAll(".extra"));
    if (!extras.length) {
      button.hidden = true;
      return;
    }

    var label = button.querySelector("span");
    var collapsed = collapsedLabel || label.textContent;
    var expanded = expandedLabel || "Réduire";

    button.hidden = false;

    button.addEventListener("click", function () {
      var isOpen = button.getAttribute("aria-expanded") === "true";
      extras.forEach(function (item) {
        item.hidden = isOpen;
      });
      button.setAttribute("aria-expanded", isOpen ? "false" : "true");
      if (label) label.textContent = isOpen ? collapsed : expanded;
    });
  }

  wireToggle("toggle-parcours", "liste-parcours", "Réduire", "Afficher la suite");
  wireToggle("toggle-projets", "projets-restants", "Réduire", "Afficher les 10 autres projets");

  /* ---------- 6. Apparition au défilement ---------- */
  var revealables = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealables.forEach(function (el) {
      revealer.observe(el);
    });
  }

  /* ---------- 7. Année dans le pied de page ---------- */
  var year = document.getElementById("annee");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- 8. Compteur de visites ---------- */
  // Le site est statique : il n'a pas d'API a lui, contrairement a la reference
  // qui compte cote serveur. Le comptage passe donc par un service tiers sans
  // compte. Le chiffre n'apparait que si le service repond : faute de valeur
  // verifiee, mieux vaut ne rien montrer qu'un nombre invente.
  var COMPTEUR_SERVICE = "https://abacus.jasoncameron.dev";
  var COMPTEUR_ESPACE = "romaindujardin";
  var COMPTEUR_CLE = "portfolio";

  var compteurBloc = document.querySelector("[data-compteur]");
  var compteurValeur = document.querySelector("[data-compteur-valeur]");

  if (compteurBloc && compteurValeur && "fetch" in window) {
    // Une seule visite comptee par session : recharger la page ne gonfle pas le
    // total, et le chiffre affiche reste celui du service.
    var dejaCompte = false;
    try {
      dejaCompte = sessionStorage.getItem("rd-visite") === "1";
    } catch (err) {
      dejaCompte = false;
    }

    fetch(
      COMPTEUR_SERVICE +
        "/" +
        (dejaCompte ? "get" : "hit") +
        "/" +
        COMPTEUR_ESPACE +
        "/" +
        COMPTEUR_CLE
    )
      .then(function (reponse) {
        if (!reponse.ok) throw new Error(String(reponse.status));
        return reponse.json();
      })
      .then(function (donnees) {
        if (!donnees || typeof donnees.value !== "number") return;

        if (!dejaCompte) {
          try {
            sessionStorage.setItem("rd-visite", "1");
          } catch (err) {
            /* Mode prive : la visite sera recomptee, sans conséquence. */
          }
        }

        compteurValeur.textContent =
          donnees.value.toLocaleString("fr-FR") +
          (donnees.value > 1 ? " visites" : " visite");
        compteurBloc.hidden = false;
      })
      .catch(function () {
        /* Service injoignable : le compteur reste masque. */
      });
  }
})();
