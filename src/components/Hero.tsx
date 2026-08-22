import React, { useRef } from "react";
import "./Hero.css";

const handleMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
  const img = e.currentTarget;
  const rect = img.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  // Accentuer l'effet : angle max 30° et zone centrale plus sensible
  const normX = Math.max(-1, Math.min(1, (x - centerX) / (centerX * 0.7)));
  const normY = Math.max(-1, Math.min(1, (y - centerY) / (centerY * 0.7)));
  const rotateX = normY * 30;
  const rotateY = normX * 30;
  img.style.transform = `scale(2.5) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleMouseLeave = (
  e: React.MouseEvent<HTMLImageElement, MouseEvent>
) => {
  const img = e.currentTarget;
  img.style.transform = "";
};

const Hero: React.FC = () => {
  return (
    <section id="section1" className="hero-section">
      <h1 style={{ color: "white", marginLeft: "5%" }}>
        A propos de moi
        <svg
          stroke="#62B2FF"
          fill=""
          strokeWidth="1"
          viewBox="0 0 24 24"
          className="hover:text-purple-500"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Location_Arrow_1">
            <path d="M14.472,20.937a1.438,1.438,0,0,1-1.3-.812L10.3,14.343a1.418,1.418,0,0,0-.642-.641L3.874,10.831A1.462,1.462,0,0,1,4.06,8.136l14.952-5a1.46,1.46,0,0,1,1.849,1.847l-5,14.952a1.439,1.439,0,0,1-1.284.994C14.543,20.936,14.507,20.937,14.472,20.937ZM19.479,4.063a.488.488,0,0,0-.149.024h0l-14.952,5a.46.46,0,0,0-.058.849L10.1,12.805A2.444,2.444,0,0,1,11.2,13.9l2.87,5.782a.443.443,0,0,0,.445.255.45.45,0,0,0,.4-.312l5-14.953a.462.462,0,0,0-.433-.607Z"></path>
          </g>
        </svg>
      </h1>
      <div
        className="hero-introduction"
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "1.5em",
          margin: "5em 10%",
          padding: "0 5%",
          lineHeight: "1.8",
        }}
      >
        <p>
          Bonjour, je m'appelle{" "}
          <strong
            className="hero-highlight"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#62B2FF",
            }}
          >
            Romain
          </strong>{" "}
          <span className="image-container">
            <img
              className="hover-zoom tilt-image"
              style={{ borderRadius: "15px" }}
              height="60"
              width="60"
              src="./img/romain.png"
              alt="Romain"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </span>
          .
        </p>
        <p>
          Je suis{" "}
          <strong
            className="hero-highlight"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#62B2FF",
            }}
          >
            ingénieur IA
          </strong>
          , diplômé de <strong>JUNIA ISEN</strong>{" "}
          <span className="image-container">
            <img
              className="hover-zoom tilt-image"
              style={{ borderRadius: "15px" }}
              height="50"
              width="100"
              src="./img/images.jpeg"
              alt="JUNIA ISEN"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </span>
          , avec une spécialisation en{" "}
          <strong
            className="hero-highlight"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#62B2FF",
            }}
          >
            Computer Vision
          </strong>
          ,{" "}
          <strong
            className="hero-highlight"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#62B2FF",
            }}
          >
            IA générative
          </strong>{" "}
          et{" "}
          <strong
            className="hero-highlight"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#62B2FF",
            }}
          >
            systèmes agentiques
          </strong>
          .
        </p>
        <p>
          Au cours de mes expériences en R&D industrielle et en recherche
          appliquée, notamment chez <strong>Safran Ceramics</strong>{" "}
          <span className="image-container">
            <img
              className="hover-zoom tilt-image"
              style={{ borderRadius: "15px" }}
              height="50"
              width="100"
              src="./img/safran.jpg"
              alt="Safran Ceramics"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </span>{" "}
          et à <strong>l’UQAR</strong>{" "}
          <span className="image-container">
            <img
              className="hover-zoom tilt-image"
              style={{
                borderRadius: "15px",
                backgroundColor: "#ffffff",
                padding: "6px 8px",
                objectFit: "contain",
              }}
              height="50"
              width="100"
              src="./img/uqar.svg"
              alt="UQAR"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          </span>
          , j’ai conçu et développé des solutions d’IA allant de la conception
          des modèles jusqu’à leur{" "}
          <strong>industrialisation et leur déploiement</strong>.
        </p>
        <p>
          Je recherche aujourd’hui un{" "}
          <strong
            className="hero-highlight"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#62B2FF",
            }}
          >
            CDI en Intelligence Artificielle
          </strong>
          , avec un intérêt particulier pour les problématiques de{" "}
          <strong
            className="hero-highlight"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#62B2FF",
            }}
          >
            Computer Vision, GenAI et MLOps
          </strong>
          .
        </p>
      </div>
    </section>
  );
};

export default Hero;
