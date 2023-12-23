import React from "react";
import ProjectCard from "./ProjectCard/ProjectCard";
import ScrollAnimation from "react-animate-on-scroll";
function Projects({ data }) {
  const style = {
    height: "10px",
    border: "0",
    boxShadow: "0 10px 10px -10px #8c8c8c inset",
  };
  return (
    <>
      <div className="ProjectWrapper" id="projects">
        <div className="Container">
          <ScrollAnimation delay={200} animateIn="fadeIn" animateOnce>
            <div className="SectionTitle">
              Projects
              <hr style={style} />
            </div>
          </ScrollAnimation>
          <ProjectCard data={data} />
        </div>
      </div>
    </>
  );
}

export default Projects;
