import React, { useRef, useEffect, useState } from "react";
import "./WheelGallery.css";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  images?: string[];
  link: string;
  isVideo?: boolean;
  centerImage?: boolean;
  isWebcam?: boolean;
  tags?: string[];
  mediaBg?: string;
}

// Projet vedette affiché en haut (fixe) - avec webcam pour le jeu
// const FEATURED_PROJECT: ProjectItem = {
//   id: "featured",
//   title: "Pierre Feuille Ciseaux",
//   description:
//     "Jeu interactif utilisant la reconnaissance de gestes via webcam. Jouez contre l'IA en temps réel !",
//   link: "#",
//   isWebcam: true,
//   tags: ["Webcam", "IA", "Temps réel"],
// };

// Projets de la galerie (14 cartes triées par pertinence et impact)
const PROJECTS: ProjectItem[] = [
  {
    id: "1",
    title: "UQAR-chatbot",
    description:
      "Plateforme éducative agentique locale déployée sur cluster HPC (UQAR). Génération d'exercices adaptatifs selon le niveau de chaque étudiant, révision sur cours (RAG) et retours personnalisés aux enseignants.",
    image: "./img/uqar.svg",
    centerImage: true,
    link: "https://github.com/Romaindujardin/UQAR-chatbot",
    tags: ["IA Agentique", "FastAPI / Next.js", "RAG / ChromaDB", "LLaMA 3.1 (Ollama)", "HPC Apptainer"],
  },
  {
    id: "2",
    title: "ComputeLLM",
    description:
      "Suite de benchmark multiplateforme pour l'inférence locale de LLM (llama.cpp/Metal/CUDA). Mesure des GFLOPS, bande passante mémoire, latence token-to-token et impact des quantifications.",
    image: "./img/computellm.png",
    mediaBg: "#2f323a",
    link: "https://github.com/Romaindujardin/ComputeLLM",
    tags: ["LLM Inference", "llama.cpp", "Hardware Benchmark", "CUDA / Metal", "Python"],
  },
  {
    id: "3",
    title: "I-LLM",
    description:
      "Chatbot d'accessibilité (Streamlit) facilitant la recherche d'ERP et parkings PMR. RAG combinant Gemini, un modèle NLP DistilCamembert fine-tuné et l'API AccesLibre.",
    image: "./img/I-LLM.png",
    link: "https://github.com/Project-Group-AI/I-LLM",
    centerImage: true,
    tags: ["Python", "Gemini API", "RAG / NLP", "Streamlit"],
  },
  {
    id: "4",
    title: "Enhance-This",
    description:
      "Modèle de super-résolution d'images par réseaux antagonistes génératifs (SRGAN). Architecture PyTorch avec phase de warmup, loss perceptuelle VGG et optimisation du compromis PSNR / textures.",
    image: "./img/srgan_result.png",
    link: "https://github.com/Romaindujardin/Enhance-This",
    tags: ["Deep Learning", "PyTorch", "SRGAN", "Computer Vision", "Perceptual Loss"],
  },
  {
    id: "5",
    title: "Reinforcement-Learning-Example",
    description:
      "Suite d'environnements d'apprentissage par renforcement (Gymnasium & Unity ML-Agents). Entraînement d'agents autonomes (PPO, DQN) sur jeux de course 2D, labyrinthes et Snake 3D.",
    images: [
      "./img/rl_racer1.gif",
      "./img/rl_maze1.gif",
      "./img/rl_snake.gif",
      "./img/rl_racer2.gif",
      "./img/rl_maze2.gif",
      "./img/rl_racer3.gif",
    ],
    link: "https://github.com/Romaindujardin/Reinforcement-Learning-Example",
    tags: ["Reinforcement Learning", "Gymnasium", "Stable-Baselines3", "Unity ML-Agents", "PPO / DQN"],
  },
  {
    id: "6",
    title: "Fridge-pro",
    description:
      "Application full-stack de gestion intelligente de frigo et anti-gaspillage. Suivi des péremptions, suggestions et génération de recettes IA adaptées aux ingrédients, et listes de courses.",
    image: "./img/projet_en_cours.svg",
    link: "https://github.com/Romaindujardin/Fridge-pro",
    tags: ["React / TypeScript", "Node.js", "Prisma / PostgreSQL", "Terraform / Azure", "Gemini AI"],
  },
  {
    id: "7",
    title: "Projet SPOT",
    description:
      "Système de vision par ordinateur pour l'émargement automatique en temps réel. Pipeline OpenCV complète : détection Haar Cascade, prétraitement CLAHE, modèle LBPH et calibration live.",
    image: "./img/SPOT.mp4",
    link: "https://github.com/Romaindujardin/SPOT",
    isVideo: true,
    tags: ["Computer Vision", "OpenCV", "LBPH", "CLAHE", "Python"],
  },
  {
    id: "8",
    title: "romAIn",
    description:
      "Assistant IA personnel et multimodal (voix/texte) bilingue FR/EN. Architecture RAG sur FAISS avec Whisper (ASR), Mistral-7B et synthèse vocale MMS-TTS sous Streamlit.",
    image: "./img/romainchatbot.png",
    link: "https://github.com/Romaindujardin/romAIn",
    tags: ["RAG Multimodal", "Mistral AI", "Whisper", "FAISS", "Python"],
  },
  {
    id: "9",
    title: "Portfolio-Dashboard",
    description:
      "Dashboard de gestion de patrimoine et suivi d'actifs en temps réel (banque bourso-cli, PEA/PEE, crypto & bourse). Projections financières à long terme et conseils d'arbitrage via IA.",
    image: "./img/projet_en_cours.svg",
    link: "https://github.com/Romaindujardin/Portfolio-Dashboard",
    tags: ["React / TypeScript", "Bourso CLI", "SQLite", "Yahoo Finance", "Gemini AI"],
  },
  {
    id: "10",
    title: "MUSEUM-VR",
    description:
      "Expérience immersive de musée en réalité virtuelle sous Unity (C#). Réinvention de la visite avec traversée de toiles 2D vers des espaces 3D interactifs et tableaux générés par IA.",
    images: [
      "./img/vr_portal.gif",
      "./img/vr_puzzle.gif",
      "./img/vr_ai1.gif",
    ],
    link: "https://github.com/Romaindujardin/MUSEUM-VR",
    tags: ["Unity VR", "XR Toolkit", "3D Interactif", "Stable Diffusion", "C#"],
  },
  {
    id: "11",
    title: "Project F.R.A.N.K",
    description:
      "Jeu FPS 3D d'horreur et d'énigmes sous Unity (C#). Intègre un système d'inventaire et une IA ennemie adaptative (NavMesh) traquant le joueur selon ses déplacements.",
    image: "./img/ProjectFRANK.mp4",
    link: "https://github.com/Project-Group-3D/Project-F.R.A.N.K",
    isVideo: true,
    tags: ["Unity 3D", "C#", "NavMesh", "IA Ennemie"],
  },
  {
    id: "12",
    title: "NLP-Classification",
    description:
      "Pipeline NLP de classification multi-label de commentaires toxiques (Kaggle). Évolution d'une baseline TF-IDF vers une architecture Deep Learning Bi-LSTM sous TensorFlow (F1 micro: 0.96).",
    image: "./img/nlp_bilstm_architecture.png",
    centerImage: true,
    link: "https://github.com/Romaindujardin/NLP-Classification",
    tags: ["Deep Learning", "TensorFlow", "Bi-LSTM", "NLP", "Kaggle"],
  },
  {
    id: "13",
    title: "DriveMe",
    description:
      "Plateforme web de stockage cloud type Google Drive développée avec Django. Gestion de fichiers/dossiers, prévisualisation, quotas de stockage et authentification Google OAuth.",
    image: "./img/DriveMe.gif",
    link: "https://github.com/Romaindujardin/DriveMe",
    tags: ["Django", "Python", "SQLite", "Google OAuth"],
  },
  {
    id: "14",
    title: "Leboncoin-finder",
    description:
      "Outil CLI de veille continue et scraping multi-villes sur LeBonCoin. Filtrage avancé (mots exclus/favoris), dédoublonnage intelligent et extraction structurée en temps réel.",
    image: "./img/leboncoin_terminal.svg",
    link: "https://github.com/Romaindujardin/Leboncoin-finder",
    tags: ["Python", "Web Scraping", "CLI Tool", "Data Pipeline", "Monitoring"],
  },
];

// Composant Webcam
const WebcamFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
        audio: false,
      });
      streamRef.current = stream;
      setIsPlaying(true);
    } catch (err) {
      console.error("Erreur webcam:", err);
      setHasError(true);
    }
  };

  // Assigner le stream à la vidéo une fois qu'elle est rendue
  useEffect(() => {
    if (isPlaying && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  if (hasError) {
    return (
      <div className="rdWebcamPlaceholder">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <span>Webcam non disponible</span>
      </div>
    );
  }

  if (!isPlaying) {
    return (
      <div className="rdWebcamStart">
        <button className="rdWebcamPlayBtn" onClick={startWebcam}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span>Jouer</span>
        </button>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      className="rdWebcamVideo"
    />
  );
};

// Composant Slideshow pour faire défiler plusieurs GIFs / images en boucle
const MediaSlideshow: React.FC<{ images: string[]; alt: string }> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="rdWheelCardSlideshow">
      {images.map((img, idx) => (
        <img
          key={img}
          src={img}
          alt={`${alt} ${idx + 1}`}
          loading="lazy"
          className={`rdWheelCardSlide ${idx === currentIndex ? "rdWheelCardSlideActive" : ""}`}
        />
      ))}
      <div className="rdWheelCardSlideDots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`rdWheelCardSlideDot ${idx === currentIndex ? "rdWheelCardSlideDotActive" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

const WheelGallery: React.FC = () => {
  const galleryRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);

  const handleProjectClick = (link: string) => {
    if (link === "#") return; // Ne pas ouvrir pour le projet webcam
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const scrollLeft = () => {
    if (!galleryRef.current || isScrollingRef.current) return;
    isScrollingRef.current = true;

    const gallery = galleryRef.current;
    gallery.classList.add("rdGalleryScrolling");
    const cardWidth = gallery.querySelector(".rdGalleryCard")?.clientWidth || 0;
    const gap = 20;
    const scrollAmount = cardWidth + gap;

    const atStart = gallery.scrollLeft <= 2;
    if (atStart) {
      // Retour à la fin
      gallery.scrollTo({ left: gallery.scrollWidth, behavior: "smooth" });
    } else {
      gallery.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
      gallery.classList.remove("rdGalleryScrolling");
    }, 400);
  };

  const scrollRight = () => {
    if (!galleryRef.current || isScrollingRef.current) return;
    isScrollingRef.current = true;

    const gallery = galleryRef.current;
    gallery.classList.add("rdGalleryScrolling");
    const cardWidth = gallery.querySelector(".rdGalleryCard")?.clientWidth || 0;
    const gap = 20;
    const scrollAmount = cardWidth + gap;

    const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
    const atEnd = gallery.scrollLeft >= maxScrollLeft - 2;
    if (atEnd) {
      // Retour au début
      gallery.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      gallery.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
      gallery.classList.remove("rdGalleryScrolling");
    }, 400);
  };

  const renderCard = (project: ProjectItem, isFeatured = false) => (
    <div
      className={`rdGalleryCard ${isFeatured ? "rdWheelCardFeatured" : ""} ${project.isWebcam ? "rdWheelCardWebcam" : ""}`}
      key={project.id}
      onClick={() => handleProjectClick(project.link)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleProjectClick(project.link);
        }
      }}
    >
      <div
        className={`rdWheelCardMedia ${project.centerImage ? "rdWheelCardMediaCenter" : ""} ${!project.image && !project.images && !project.isWebcam ? "rdWheelCardMediaEmpty" : ""}`}
        style={project.mediaBg ? { backgroundColor: project.mediaBg } : undefined}
      >
        {project.isWebcam ? (
          <WebcamFeed />
        ) : project.images && project.images.length > 0 ? (
          <MediaSlideshow images={project.images} alt={project.title} />
        ) : project.image ? (
          project.isVideo ? (
            <video
              src={project.image}
              muted
              loop
              playsInline
              autoPlay
            />
          ) : (
            <img src={project.image} alt={project.title} loading="lazy" />
          )
        ) : (
          <div className="rdWheelCardPlaceholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </div>
        )}
      </div>
      <div className="rdWheelCardContent">
        <h3 className="rdWheelCardTitle">{project.title}</h3>
        <p className="rdWheelCardDescription">{project.description}</p>
      </div>
      {project.tags && project.tags.length > 0 && (
        <div className="rdWheelCardTags">
          {project.tags.map((tag, index) => (
            <span key={index} className="rdWheelCardTag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Carte vedette fixe - occupe un vrai espace */}
      <div className="rdFeaturedContainer">
        <h1 className="rdFeaturedTitle">
          Mes Projets
          <svg
            stroke="#62B2FF"
            fill="none"
            strokeWidth="1"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Location_Arrow_1">
              <path d="M14.472,20.937a1.438,1.438,0,0,1-1.3-.812L10.3,14.343a1.418,1.418,0,0,0-.642-.641L3.874,10.831A1.462,1.462,0,0,1,4.06,8.136l14.952-5a1.46,1.46,0,0,1,1.849,1.847l-5,14.952a1.439,1.439,0,0,1-1.284.994C14.543,20.936,14.507,20.937,14.472,20.937ZM19.479,4.063a.488.488,0,0,0-.149.024h0l-14.952,5a.46.46,0,0,0-.058.849L10.1,12.805A2.444,2.444,0,0,1,11.2,13.9l2.87,5.782a.443.443,0,0,0,.445.255.45.45,0,0,0,.4-.312l5-14.953a.462.462,0,0,0-.433-.607Z"></path>
            </g>
          </svg>
        </h1>
        {/* {renderCard(FEATURED_PROJECT, true)} */}
      </div>

      {/* Section de la galerie horizontale */}
      <section className="rdGallerySection" aria-label="Projets">
        <div className="rdGalleryContainer">
          <button
            className="rdGalleryNavButton rdGalleryNavLeft"
            onClick={scrollLeft}
            aria-label="Projet précédent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div ref={galleryRef} className="rdGallery" role="region" aria-label="Galerie de projets">
            {PROJECTS.map((project) => renderCard(project, false))}
          </div>

          <button
            className="rdGalleryNavButton rdGalleryNavRight"
            onClick={scrollRight}
            aria-label="Projet suivant"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
};

export default WheelGallery;
