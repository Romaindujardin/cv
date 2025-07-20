import React, { useState } from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    closeOverlay();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a
            className="navbar-brand btn-flip"
            style={{ fontSize: "130%" }}
            href="#"
            data-back="Romain DUJARDIN"
            data-front="Romain DUJARDIN"
          ></a>
          <span className="status-indicator"></span>
          <span className="status-text">Disponible</span>

          <button
            className="navbar-toggler ml-auto custom-toggler"
            type="button"
            onClick={toggleOverlay}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="d-flex ml-auto">
              <a
                className="navbar-brand btn-flip"
                style={{ fontSize: "130%" }}
                href="#section1"
                data-back="About ME"
                data-front="About ME"
                onClick={() => scrollToSection("section1")}
              ></a>
              <a
                className="navbar-brand btn-flip"
                style={{ fontSize: "130%" }}
                href="#section3"
                data-back="Projets"
                data-front="Projets"
                onClick={() => scrollToSection("section3")}
              ></a>
              <a
                className="navbar-brand btn-flip"
                style={{ fontSize: "130%" }}
                href="#section5"
                data-back="Contacts"
                data-front="Contacts"
                onClick={() => scrollToSection("section5")}
              ></a>
            </form>
          </div>
        </div>
      </nav>

      {isOverlayOpen && (
        <div className="overlay" style={{ display: "flex" }}>
          <div className="overlay-content">
            <a
              className="navbar-brand btn-flip overlay-link"
              style={{ fontSize: "130%" }}
              href="#section1"
              data-back="About ME"
              data-front="About ME"
              onClick={() => scrollToSection("section1")}
            ></a>
            <a
              className="navbar-brand btn-flip overlay-link"
              style={{ fontSize: "130%" }}
              href="#section3"
              data-back="Projets"
              data-front="Projets"
              onClick={() => scrollToSection("section3")}
            ></a>
            <a
              className="navbar-brand btn-flip overlay-link"
              style={{ fontSize: "130%" }}
              href="#section5"
              data-back="Contacts"
              data-front="Contacts"
              onClick={() => scrollToSection("section5")}
            ></a>
            <button
              className="btn btn-primary close-overlay"
              onClick={closeOverlay}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
