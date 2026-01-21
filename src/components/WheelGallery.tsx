import React, { useRef, useEffect, useState } from "react";
import "./WheelGallery.css";

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link: string;
  isVideo?: boolean;
  centerImage?: boolean;
  isWebcam?: boolean;
  tags?: string[];
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

// Projets de la galerie (5 cartes)
const PROJECTS: ProjectItem[] = [
  {
    id: "1",
    title: "Project F.R.A.N.K",
    description:
      "Projet 3D d'un jeu d'horreur développé sous Unity, avec un système d'IA pour le monstre qui traque activement le joueur.",
    image: "./img/ProjectFRANK.mp4",
    link: "https://github.com/Project-Group-3D/Project-F.R.A.N.K",
    isVideo: true,
    tags: ["Unity", "3D", "IA", "Jeu"],
  },
  {
    id: "2",
    title: "I-LLM",
    description:
      "Développement d'un LLM inclusif permettant de répondre à des besoins plus précis et en temps réel.",
    image: "./img/I-LLM.png",
    link: "https://github.com/Project-Group-AI/I-LLM",
    centerImage: true,
    tags: ["LLM", "IA", "Temps réel"],
  },
  {
    id: "3",
    title: "DriveMe",
    description:
      "Système de drive local complet sous Django avec base de données, gestion de comptes et d'espace fichiers.",
    image: "./img/DriveMe.gif",
    link: "https://github.com/Romaindujardin/DriveMe",
    tags: ["Django", "Python", "Base de données"],
  },
  {
    id: "4",
    title: "romAIn",
    description:
      "Chatbot personnalisé capable de répondre à des questions professionnelles comme si c'était moi.",
    image: "./img/romainchatbot.png",
    link: "https://github.com/Romaindujardin/romAIn",
    tags: ["Chatbot", "IA", "NLP"],
  },
  {
    id: "5",
    title: "Projet SPOT",
    description:
      "Projet de reconnaissance et d'analyse faciale pour automatiser l'appel en cours.",
    image: "./img/SPOT.mp4",
    link: "https://github.com/Romaindujardin/SPOT",
    tags: ["Reconnaissance faciale", "IA", "Automatisation"],
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
      <div className={`rdWheelCardMedia ${project.centerImage ? "rdWheelCardMediaCenter" : ""} ${!project.image && !project.isWebcam ? "rdWheelCardMediaEmpty" : ""}`}>
        {project.isWebcam ? (
          <WebcamFeed />
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
