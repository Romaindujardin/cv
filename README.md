# CV Numérique - Version TypeScript/React

Ce projet est une version TypeScript/React de votre CV numérique original. Il conserve exactement le même design et les mêmes fonctionnalités que la version HTML/CSS, mais avec une architecture moderne basée sur React et TypeScript.

## 🚀 Fonctionnalités

- **Design identique** : Même apparence visuelle que la version originale
- **Animations fluides** : Canvas avec particules interactives
- **Responsive** : Adaptation parfaite sur tous les écrans
- **Navigation** : Menu de navigation avec overlay mobile
- **Sections** : À propos, Timeline, Projets, Compétences, Contact
- **Interactions** : Effets de hover et animations

## 🛠️ Technologies utilisées

- **React 18** : Framework principal
- **TypeScript** : Typage statique pour une meilleure maintenabilité
- **Webpack 5** : Bundling et développement
- **CSS Modules** : Styles modulaires
- **Canvas API** : Animations de particules

## 📦 Installation

1. **Cloner le projet** :

```bash
git clone <votre-repo>
cd cv
```

2. **Installer les dépendances** :

```bash
npm install
```

3. **Lancer le serveur de développement** :

```bash
npm start
```

4. **Construire pour la production** :

```bash
npm run build
```

## 🏗️ Structure du projet

```
src/
├── components/          # Composants React
│   ├── Loader.tsx      # Écran de chargement
│   ├── Navbar.tsx      # Navigation
│   ├── Hero.tsx        # Section "À propos"
│   ├── Timeline.tsx    # Timeline des expériences
│   ├── Projects.tsx    # Section projets
│   ├── Skills.tsx      # Section compétences
│   ├── Contact.tsx     # Section contact
│   └── ParticleCanvas.tsx # Canvas avec particules
├── types/              # Types TypeScript
│   └── index.ts        # Interfaces partagées
├── styles/             # Styles globaux
│   └── global.css      # CSS principal
├── App.tsx             # Composant principal
└── index.tsx           # Point d'entrée
```

## 🔧 Configuration

### Webpack

- **webpack.common.js** : Configuration commune
- **webpack.config.dev.js** : Configuration développement
- **webpack.config.prod.js** : Configuration production

### TypeScript

- **tsconfig.json** : Configuration TypeScript
- Support complet de React et JSX

## 🎨 Personnalisation

### Modifier le contenu

- **Hero.tsx** : Modifier la section "À propos"
- **Timeline.tsx** : Ajouter/modifier les expériences
- **Projects.tsx** : Gérer les projets
- **Skills.tsx** : Modifier les compétences
- **Contact.tsx** : Mettre à jour les contacts

### Modifier le style

- Chaque composant a son fichier CSS associé
- **global.css** : Styles globaux
- Variables CSS pour les couleurs des particules

### Modifier les animations

- **ParticleCanvas.tsx** : Logique des particules
- **ParticleCanvas.css** : Styles du canvas

## 📱 Responsive

Le design est entièrement responsive avec :

- Breakpoints pour mobile, tablette et desktop
- Navigation adaptative avec overlay mobile
- Cartes de projets qui s'adaptent à la taille d'écran
- Timeline responsive

## 🚀 Déploiement

1. **Construire le projet** :

```bash
npm run build
```

2. **Déployer le dossier `dist/`** sur votre hébergeur

## 🔄 Migration depuis la version HTML/CSS

Cette version TypeScript est une conversion directe de votre CV original. Tous les éléments visuels et fonctionnels ont été préservés :

- ✅ Même design et layout
- ✅ Même animations et effets
- ✅ Même contenu et sections
- ✅ Même responsive design
- ✅ Même interactions utilisateur

## 🛠️ Développement

### Scripts disponibles

- `npm start` : Lance le serveur de développement
- `npm run build` : Construit pour la production
- `npm run dev` : Mode développement sans ouverture automatique
- `npm run type-check` : Vérification des types TypeScript

### Hot Reload

Le serveur de développement inclut le hot reload pour un développement fluide.

## 📄 Licence

MIT License - Libre d'utilisation et de modification.

---

**Note** : Cette version TypeScript offre une meilleure maintenabilité, une détection d'erreurs plus précoce et une architecture plus moderne tout en conservant exactement le même rendu visuel que votre CV original.
