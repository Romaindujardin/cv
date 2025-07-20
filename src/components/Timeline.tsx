import React from "react";
import "./Timeline.css";

interface TimelineItem {
  id: string;
  title: string;
  period: string;
  description: string;
  direction: "l" | "r" | "lb" | "rb";
}

const timelineData: TimelineItem[] = [
  {
    id: "1",
    title: "Junia - ISEN",
    period: "2020 - Présent",
    description:
      "Étudiant en 4ème année d'école d'ingénieur en IA, je conçois des solutions innovantes pour relever les défis technologiques.",
    direction: "r",
  },
  {
    id: "2",
    title: "Livreur Pharmaceutique",
    period: "Septembre 2024 - Présent",
    description:
      "Responsable de la livraison rapide et sécurisée de médicaments, garantissant le bien-être des patients grâce à un service fiable et professionnel.",
    direction: "lb",
  },
  {
    id: "3",
    title: "Commis Foodtruck",
    period: "Juin 2024 - Août 2024",
    description:
      "Commis dans un foodtruck, j'ai optimisé le service client et contribué à un environnement de travail efficace et dynamique.",
    direction: "rb",
  },
  {
    id: "4",
    title: "Assistant Comptable",
    period: "Juin 2022 - Août 2022",
    description:
      "Assistant comptable, j'ai assuré la saisie de données et la facturation, tout en renforçant l'esprit d'équipe.",
    direction: "lb",
  },
  {
    id: "5",
    title: "Opérateur de machine",
    period: "Juin 2021 - Juillet 2021",
    description:
      "Opérateur de machine, j'ai résolu des problèmes techniques et assuré le bon fonctionnement de l'équipement dans un environnement dynamique.",
    direction: "rb",
  },
  {
    id: "6",
    title: "Assistant Comptable",
    period: "Juillet 2020 - Septembre 2020",
    description:
      "Assistant comptable, j'ai géré la saisie de données et la facturation tout en favorisant une collaboration efficace au sein de l'équipe.",
    direction: "lb",
  },
  {
    id: "7",
    title: "Stage Orange",
    period: "2017",
    description:
      "Stage d'observation chez Orange, où j'ai acquis une vision concrète des innovations technologiques et des pratiques de l'industrie.",
    direction: "r",
  },
];

const Timeline: React.FC = () => {
  return (
    <section id="section2" className="timeline-section">
      <h1 style={{ color: "white", marginLeft: "5%" }}>
        Timeline
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
      <div className="all">
        <ul className="timeline">
          {timelineData.map((item, index) => (
            <li key={item.id} className={index === 0 ? "current-item" : ""}>
              <div className={`direction-${item.direction}`}>
                <div className="flag-wrapper">
                  <span className="flag">{item.title}</span>
                  <span className="time-wrapper">
                    <span className="time">{item.period}</span>
                  </span>
                </div>
                <div className="desc">{item.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Timeline;
