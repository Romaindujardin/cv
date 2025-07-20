import React from "react";
import { Skill } from "../types";
import "./Skills.css";

const skillsData: Skill[] = [
  { id: "1", name: "Python", icon: "python-icon" },
  { id: "2", name: "NextJS", icon: "nextjs-icon" },
  { id: "3", name: "TypeScript", icon: "typescript-icon" },
  { id: "4", name: "JS", icon: "js-icon" },
  { id: "5", name: "React", icon: "react-icon" },
  { id: "6", name: "Django", icon: "django-icon" },
  { id: "7", name: "HTML", icon: "html-icon" },
  { id: "8", name: "CSS", icon: "css-icon" },
  { id: "9", name: "NodeJS", icon: "nodejs-icon" },
  { id: "10", name: "C#", icon: "csharp-icon" },
  { id: "11", name: "C++", icon: "cpp-icon" },
  { id: "12", name: "MongoDB", icon: "mongodb-icon" },
];

const Skills: React.FC = () => {
  return (
    <section id="section4" className="skills-section">
      <h1 style={{ color: "white", marginLeft: "5%", marginBottom: "4%" }}>
        Compétences
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
        className="containercomp"
        style={{ marginBottom: "8%", paddingLeft: "15%", paddingRight: "15%" }}
      >
        {skillsData.map((skill) => (
          <div key={skill.id} className="cardcomp">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 50 50"
            >
              {/* SVG content for each skill */}
            </svg>
            <p>{skill.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
