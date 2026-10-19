# Portfolio — Romain Dujardin

Site personnel : ingénieur en Intelligence Artificielle. Site statique, sans dépendance
ni build, déployable tel quel sur GitHub Pages, Netlify, Vercel ou n'importe quel hébergeur.

## Structure

```
Site/
├── index.html      # page unique, sections ancrées
├── styles.css      # feuille de style (thèmes clair + sombre)
├── script.js       # navigation, thème, apparitions, boutons « voir plus »
└── images/
    ├── romain.jpg                # portrait (hero)
    ├── leboncoin_terminal.svg    # illustration de la carte Leboncoin-finder
    ├── favicon.svg
    ├── CV.pdf                    # CV téléchargeable
    ├── Lettre-de-recommandation.pdf  # second document du bloc CV
    ├── uqar.svg                  # conservé mais plus référencé (voir Notes)
    ├── logos/                    # logos des organisations (expérience, formation)
    └── projets/                  # visuels des cartes de projet
```

Les trois visuels de projet sont de natures différentes : `computellm.jpg`, `fridge_pro.jpg`
et les autres sont des captures d'écran ; `srgan_schema.svg` est un **schéma vectoriel
dessiné pour ce site** ; plusieurs cartes sans capture utilisent une vignette purement
typographique (`.cover-type`), dont le CSS dessine la trame de fond.

## Sections de la page

| Ancre | Contenu |
| --- | --- |
| `#accueil` | Présentation, boutons CV / contact |
| `#projets` | 3 projets mis en avant + 10 projets repliables |
| `#parcours` | Chronologie des étapes clés (repliable) |
| `#experience` | Expériences professionnelles détaillées |
| `#competences` | Compétences réparties en 4 familles |
| `#formation` | Diplôme d'ingénieur et cycle préparatoire |
| `#langues` | Langues et certifications, une ligne par langue |
| `#a-propos` | Texte de présentation en 3 parties |
| `#contact` | Bloc « CV », liens et coordonnées |

Les trois projets mis en avant suivent l'ordre du CV : `Enhance-This`, `ComputeLLM`, `I-LLM`.
Les dix autres sont repliés derrière le bouton « Afficher les 10 autres projets » ; le libellé
est écrit **deux fois**, dans `index.html` et dans `script.js` (appel à `wireToggle`) — toute
modification du nombre doit être répercutée aux deux endroits.

## Bloc « CV »

Le pied de page s'ouvre sur un bloc intitulé « CV », qui **présente** les documents au lieu de
pointer directement dessus : **deux fiches numérotées côte à côte** — `01 / Parcours` vers
`images/CV.pdf`, `02 / Recommandation` vers `images/Lettre-de-recommandation.pdf`. Chacune
porte un rang, un titre, une phrase de description et un bouton. C'est la structure de la page
`/resume` de la référence, ramenée ici sur une page unique. Le bloc se pose **à plat sur le
fond général**, comme le reste du site : le pied de page n'a pas de dalle à lui, seul un filet
supérieur marque la séparation.

Les deux fiches tiennent sur **une seule ligne** (`grid-template-columns: repeat(2, …)`,
`gap: 48px`) et ne passent l'une sous l'autre qu'en dessous de 900 px. Pour en ajouter une
troisième, dupliquez le `<li class="resume-item">` : la numérotation est écrite à la main, mais
la grille suit d'elle-même.

## Parti pris de design

- **Mise en page fluide, sans largeur maximale** : le contenu occupe une part constante de
  la fenêtre grâce à une gouttière exprimée en `vw` (6 % sur mobile, puis 8,5 · 12 · 15 ·
  18 · 22 · 24 · 28 % par paliers). À 1440 px, le contenu mesure ainsi 1008 px. La gouttière
  de droite retire la largeur de la barre de défilement, de sorte que la marge optique reste
  symétrique d'une plateforme à l'autre.
- **Échelle typographique fluide** : corps de texte à 16 px, porté à 17 px au-delà de
  1200 px, 18 px au-delà de 1600 px et 20 px au-delà de 2400 px ; graisse 300 et interligne
  1,6 pour un rendu léger et aéré. Titre du hero à 24 / 36 / 42 px selon la largeur.
- **Navbar sans nom de marque** : grille `1fr auto`, liens répartis en `space-between` sur
  toute la colonne — c'est là l'origine de l'espacement aéré, et non un `gap` fixe. Icônes
  sociales à droite. Le lien de la section active est signalé par un **point bleu de 8 px**,
  élément unique que le JavaScript translate d'un lien à l'autre : le point **glisse** au lieu
  de sauter. Il ne marque pas seulement la rubrique visible — il **suit aussi le lien
  survolé**, et regagne la rubrique active dès que le curseur quitte la liste. Son abscisse
  vient de la cible, sa hauteur du lien actif, si bien qu'il coule latéralement sans jamais
  changer de ligne. Le clavier bénéficie du même suivi, et un contact tactile est ignoré
  (un doigt ne survole pas). Sans JavaScript, un point statique s'affiche sous le lien actif.
- **Survols sobres** : les liens de navigation passent à la couleur d'accent en 0,11 s, sans
  fond ; les boutons tombent à 80 % d'opacité. Pas d'effet de translation. Le hamburger suit
  la même règle — ses barres étant peintes en `currentColor`, elles virent à l'accent avec lui.
- **Boutons en majuscules**, petites capitales espacées, sur fond gris neutre (`--button`).
- **Projets en panneaux portrait 3:4** teintés : trois colonnes sur desktop, deux jusqu'à
  620 px, puis disposition horizontale (vignette à gauche, texte à droite) sur téléphone.
  Les captures ayant un fond blanc opaque ou transparent, elles sont posées sur une carte
  blanche qui uniformise les deux cas.
- **Une hiérarchie de traits, pas un soulignement unique** : les **titres de projets** sont
  gras et soulignés d'un trait de **2 px** ; les **noms d'organisation** — employeurs et école
  — portent un trait de **1 px**. Le titre d'un projet se repère ainsi d'un coup d'œil, avant
  la ligne de contexte qui le suit. Dans les deux cas le trait prend la couleur du texte
  (`currentColor`) et se décale de `0.18em`, donc il suit aussi le survol.
- **Hero en deux colonnes égales** (`1fr 1fr`, écart `--hero-gap`) : le texte se centre
  verticalement face au portrait, qui conserve un ratio 510/457.
- **Mobile** : hamburger qui **s'anime en croix** à l'ouverture, panneau plein écran aux
  liens centrés horizontalement et verticalement, et portrait placé *sous* le texte.

## Fonctionnalités

- **Thème clair / sombre** — bascule dans la barre de navigation, mémorisée dans le
  navigateur, avec détection de la préférence système au premier chargement. Le changement
  est **dévoilé progressivement** : un cercle naît au centre du bouton et s'élargit jusqu'à
  couvrir l'écran, découvrant le nouveau thème au passage. C'est l'API *View Transitions*
  qui fige l'ancienne image pendant que le `clip-path` du nouveau calque s'ouvre ; le rayon
  est calculé pour atteindre le coin le plus éloigné du bouton, et la durée est bornée entre
  380 et 680 ms pour rester vive sur petit comme sur grand écran. Sans l'API, ou si
  `prefers-reduced-motion` est actif, la bascule redevient instantanée.
- **Responsive** — bascule vers le menu plein écran et empilement du hero à 900 px,
  ajustements à 1040, 768, 720 et 620 px, puis paliers de gouttière à 769, 992, 1200, 1600,
  2000, 2400 et 3200 px.
- **Navigation active** — pilotée par `IntersectionObserver` : le point **glisse** sous le
  lien de la section visible *et* suit le lien survolé (sur mobile, le lien actif est
  souligné).
- **Apparition au défilement** — désactivée si `prefers-reduced-motion` est actif.
- **Compteur de visites** — dans le coin du pied de page, sous la signature, comme sur la
  référence. Le site étant statique, il n'a pas d'API à lui : le comptage passe par un
  service tiers gratuit et sans compte (`abacus.jasoncameron.dev`), dont l'adresse, l'espace
  de noms et la clé sont trois constantes en tête de section dans `script.js`. Une visite
  n'est comptée **qu'une fois par session** — recharger la page ne gonfle pas le total. Si le
  service ne répond pas, le compteur **reste masqué** : faute de chiffre vérifié, mieux vaut
  rien qu'un nombre inventé. Il compte les **visites**, non les visiteurs : un compteur côté
  navigateur ne sait pas distinguer les personnes, là où la référence s'appuie sur une API
  serveur. Pour des visiteurs uniques et un vrai tableau de bord, il faut un service dédié
  (GoatCounter, Umami, Plausible), qui demandera un compte.
- **Accessibilité** — lien d'évitement, `aria-expanded` sur les boutons, focus visible,
  structure sémantique, `aria-current` sur la navigation, gel du défilement quand le
  menu mobile est ouvert.
- **iPhone** — `viewport-fit=cover` et marges `env(safe-area-inset-*)` pour l'encoche et
  la barre d'accueil.
- **SEO** — métadonnées Open Graph, `canonical` et données structurées JSON-LD (schéma
  `Person`).

## Développement local

```bash
cd Site
python3 -m http.server 8899
# puis ouvrir http://localhost:8899/
```

## Déploiement sur GitHub Pages

Le site est publié depuis le dépôt [`Romaindujardin/cv`](https://github.com/Romaindujardin/cv),
sur la branche **`main`**, qui ne contient que le site statique. Ce dépôt porte par ailleurs
deux autres branches — `React/TypeScript` (sa branche par défaut) et `master` — qui contiennent
l'ancienne version du portfolio et ne sont pas touchées par les mises à jour du site.

```bash
cd Site
git add .
git commit -m "…"
git push origin main
```

Le premier envoi s'est fait ainsi :

```bash
cd Site
git init
git add .
git commit -m "Nouveau site personnel"
git branch -M main
git remote add origin https://github.com/Romaindujardin/cv.git
git push -u origin main
```

L'authentification passe par le trousseau macOS (`credential.helper = osxkeychain`). Aucune clé
SSH n'est configurée sur cette machine : les URL `git@github.com:…` échouent, il faut utiliser
la forme `https://`.

Pour publier, dans *Settings → Pages → Source : Deploy from a branch → `main` / (root)*. Tant
que la source reste sur `React/TypeScript`, la poussée sur `main` ne change rien au site en
ligne.

Tous les chemins d'`index.html` sont **relatifs**, à deux exceptions près qui sont
intentionnelles : le `canonical` et le lien du pied de page, qui visent tous deux
`https://romaindujardin.github.io/cv/`. Le site fonctionne donc aussi bien à la racine d'un
domaine que dans un sous-répertoire.

## Mise à jour du contenu

- **Textes et listes** : directement dans `index.html`, chaque section est commentée.
- **Couleurs et typographie** : variables CSS dans `:root` en haut de `styles.css`
  (les valeurs du thème sombre sont dans le bloc `html[data-theme="dark"]`).
- **Projets repliables** : les cartes supplémentaires sont dans
  `<div id="projets-restants">`. Pour en ajouter, dupliquez une balise
  `<article class="project-tile">` puis mettez à jour le libellé du bouton aux **deux**
  endroits où il est écrit : le `<span>` dans `index.html` et l'appel à `wireToggle` dans
  `script.js`.
- **Documents du bloc CV** : remplacez `images/CV.pdf` et
  `images/Lettre-de-recommandation.pdf`. Le second est une version **caviardée** : le numéro
  de téléphone et l'adresse électronique d'un tiers y sont floutés, faute de quoi le document
  publierait les coordonnées personnelles de quelqu'un d'autre.
- **Compteur de visites** : l'adresse du service, l'espace de noms et la clé sont les
  constantes `COMPTEUR_SERVICE`, `COMPTEUR_ESPACE` et `COMPTEUR_CLE`, en section 8 de
  `script.js`. Le chiffre appartient au couple espace + clé, pas au site : changer l'un des
  deux repart de zéro.
- **Logos d'organisations** : déposez le fichier dans `images/logos/`, puis remplacez la
  `<img>` correspondante dans `index.html`. Chaque logo occupe un **carré de côté fixe**
  (48 px, dans l'expérience comme dans la formation ; 42 px sur petit écran) et y est centré
  en `object-fit: contain` : quelle que soit la forme du fichier — Junia est carré, Safran
  presque cinq fois plus large que haut — l'empreinte visuelle reste la même et la colonne
  s'aligne. Les logos s'appuient sur une **plaque blanche** qui uniformise les deux thèmes :
  trois des fichiers ont un fond blanc opaque, et les marques sombres seraient illisibles sur
  le thème sombre sans elle. Les logos qui **portent déjà leur propre fond opaque** — le carré
  violet de Junia — reçoivent la classe `is-opaque` sur leur conteneur : ils se passent de la
  plaque, qui donnerait sinon un carré dans un carré.
- **Rôles et dates** : une expérience ou une formation se compose d'un nom d'organisation
  souligné, d'une ligne de contexte, puis d'une liste `ol.experience-roles` où **chaque
  étape porte son propre intitulé et ses propres dates**. La date se pose à droite, sur la
  même ligne que l'intitulé, et la description occupe toute la largeur en dessous. Ajouter
  une étape — un second poste dans la même entreprise, une seconde année d'études — se fait
  en dupliquant un `<li>`. La classe `has-progression` ajoute le point et le trait qui
  relient les étapes ; les deux sections partagent ces règles, de sorte qu'une expérience et
  une formation ne se distinguent jamais l'une de l'autre.

## Notes

- Le design s'inspire de la structure d'un portfolio académique (site de Rishi Ahuja) :
  hero avec portrait, grille de projets, chronologie, expériences, compétences, à propos,
  pied de page en colonnes. Le code (HTML, CSS, JS) a été écrit intégralement pour ce
  site ; aucune ressource graphique ni feuille de style tierce n'a été reprise.
- Les visuels des projets proviennent pour la plupart du dépôt `cv (code)`, l'ancienne version
  du portfolio. Une exception : `images/projets/srgan_schema.svg`, qui a été **dessiné pour ce
  site** en SVG — il reprend la palette et le trait du diagramme Bi-LSTM déjà employé pour la
  carte `NLP-Classification`, afin que les deux schémas de réseaux se répondent. Chaque nœud y
  correspond à un élément vérifié dans les carnets du dépôt `Enhance-This` : les 16 blocs
  résiduels, la tête `PixelShuffle(4)`, le raccourci résiduel, et un VGG-19 dont les poids sont
  effectivement gelés (`requires_grad = False`, `.eval()`).
- `images/uqar.svg` n'est **plus référencé** : la carte `UQAR-chatbot` a été remplacée par
  `Enhance-This`, son dépôt GitHub étant introuvable. Le fichier est conservé, l'expérience
  UQAR restant par ailleurs décrite dans la section `#experience`.
- `images/projets/srgan_result.png` n'est plus référencé non plus : cette planche de
  comparaison servait de couverture au projet, et son image de démonstration — une photographie
  de personne publique, téléversée à la main dans Colab — ne convenait ni juridiquement ni
  visuellement. Elle est conservée sur disque.
- Les logos des organisations proviennent de Wikimedia Commons (Safran, Orange, UQAR), du
  favicon officiel de JUNIA, et des fichiers fournis par Romain Dujardin (CERP, Kamio,
  R2S, Beaulieu International Group). Ils servent uniquement à identifier les employeurs
  et l'école cités, et restent la propriété de leurs titulaires.
