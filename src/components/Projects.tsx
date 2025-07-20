import React from "react";
import { Project } from "../types";
import "./Projects.css";

const projectsData: Project[] = [
  {
    id: "1",
    title: "Project F.R.A.N.K",
    description:
      "Projet 3D d'un jeu d'horreur développé sous Unity, où j'ai pu combiner mes compétences en IA avec l'intégration de la 3D. Dans ce projet, j'ai notamment intégré un système d'IA pour le monstre, qui traque activement le joueur et d'autre outil presant sur la video",
    image: "./img/ProjectFRANK.mp4",
    link: "https://github.com/Project-Group-3D/Project-F.R.A.N.K",
    isVideo: true,
  },
  {
    id: "2",
    title: "I-LLM",
    description:
      "Développement d'un LLM inclusif qui permets de repondre a des besoins plus precis et en temps réel.",
    image: "./img/I-LLM.png",
    link: "https://github.com/Project-Group-AI/I-LLM",
  },
  {
    id: "3",
    title: "DriveMe",
    description:
      "Développement d'un systeme de drive local complet sous Django, avec base de données, permettant aux utilisateurs de créer un compte, mettre en ligne des fichiers et gérer son espace",
    image: "./img/DriveMe.gif",
    link: "https://github.com/Romaindujardin/DriveMe",
  },
  {
    id: "4",
    title: "romAIn",
    description:
      "Chatbot personnalisé capable de répondre à des questions professionnelles comme si c'était moi.",
    image: "./img/romainchatbot.png",
    link: "https://github.com/Romaindujardin/romAIn",
  },
];

const Projects: React.FC = () => {
  const handleProjectClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <section id="section3" className="projects-section">
      <h1 style={{ color: "white", marginLeft: "5%" }}>
        Mes Projets
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
        className="project"
        style={{ boxSizing: "border-box", marginTop: "6%", marginBottom: "6%" }}
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="card"
            onClick={() => handleProjectClick(project.link)}
            style={{ cursor: "pointer" }}
          >
            <div className="imagec">
              {project.isVideo ? (
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                >
                  <source src={project.image} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit:
                      project.title === "DriveMe" ? "contain" : "cover",
                    backgroundColor:
                      project.title === "DriveMe" ? "#222222" : "transparent",
                  }}
                />
              )}
            </div>
            <div className="inner">
              <h1>{project.title}</h1>
              <p>{project.description}</p>
            </div>
            <div className="blob"></div>
            <div className="fakeblob"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
