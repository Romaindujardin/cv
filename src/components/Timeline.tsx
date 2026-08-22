import React from "react";
import "./Timeline.css";

interface TimelineItem {
  id: string;
  title: string;
  period: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    title: "Junia - ISEN",
    period: "2020 - 2026",
    description:
      "Formation d’ingénieur spécialisée en Intelligence Artificielle, avec une expertise en Deep Learning, Computer Vision, Machine Learning et IA générative. Projets autour des LLM, RAG, systèmes agentiques et Reinforcement Learning.",
  },
  {
    id: "2",
    title: "Ingénieur traitement & analyse d'images par IA - Safran Ceramics",
    period: "Septembre 2025 - Août 2026",
    description:
      "Développement de solutions de Computer Vision pour l’analyse automatisée d’images microscopiques de matériaux CMC, de la détection et segmentation YOLO à la quantification des phases. Industrialisation et déploiement des outils sur OpenShift, avec Quay et Artifactory. Contribution à des projets de R&T, maintenance prédictive et automatisation des expertises laboratoire.",
  },
  {
    id: "3",
    title: "Etudiant chercheur - UQAR",
    period: "Mai 2025 - Août 2025",
    description:
      "Conception d’une plateforme agentique dédiée à l’usage de l’IA dans l’enseignement, intégrant RAG, génération d’exercices et suivi pédagogique. Développement d’une architecture sécurisée et conteneurisée avec FastAPI, Next.js, PostgreSQL, ChromaDB, JWT, Apptainer et Ollama.",
  },
  {
    id: "4",
    title: "Livreur Pharmaceutique - CERP Rouen",
    period: "Septembre 2024 - Avril 2025",
    description:
      "Responsable de la livraison rapide et sécurisée de médicaments, garantissant le bien-être des patients grâce à un service fiable et professionnel.",
  },
  {
    id: "5",
    title: "Commis Foodtruck - Kamio",
    period: "Juin 2024 - Août 2024",
    description:
      "Commis dans un foodtruck, j'ai optimisé le service client et contribué à un environnement de travail efficace et dynamique.",
  },
  {
    id: "6",
    title: "Assistant Comptable - R2S",
    period: "Juin 2022 - Août 2022",
    description:
      "Assistant comptable, j'ai assuré la saisie de données et la facturation, tout en renforçant l'esprit d'équipe.",
  },
  {
    id: "7",
    title: "Opérateur de machine - Beaulieu",
    period: "Juin 2021 - Juillet 2021",
    description:
      "Opérateur de machine, j'ai résolu des problèmes techniques et assuré le bon fonctionnement de l'équipement dans un environnement dynamique.",
  },
  {
    id: "8",
    title: "Assistant Comptable - R2S",
    period: "Juillet 2020 - Septembre 2020",
    description:
      "Assistant comptable, j'ai géré la saisie de données et la facturation tout en favorisant une collaboration efficace au sein de l'équipe.",
  },
  {
    id: "9",
    title: "Stage - Orange",
    period: "2017",
    description:
      "Stage d'observation chez Orange, où j'ai acquis une vision concrète des innovations technologiques et des pratiques de l'industrie.",
  },
];

const Timeline: React.FC = () => {
  return (
    <section id="section2" className="rdTimelineSection">
      <h1 style={{ color: "white", marginLeft: "5%", marginBottom: "4%" }}>
        Mon parcours
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

      <div className="rdTimelineContainer">
        {timelineData.map((item, idx) => {
          const sideClass =
            idx % 2 === 0 ? "rdTimelineBlockRight" : "rdTimelineBlockLeft";
          const isFirst = idx === 0;
          return (
            <div
              key={item.id}
              className={`rdTimelineBlock ${sideClass} ${
                isFirst ? "rdTimelineCurrent" : ""
              }`}
            >
              <div className="rdTimelineMarker" aria-hidden="true" />
              <div className="rdTimelineContent">
                <h3>{item.title}</h3>
                <span>{item.period}</span>
                <p>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
