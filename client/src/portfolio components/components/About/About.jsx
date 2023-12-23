import React from "react";
import { stackList, about, tools } from "../../data/ProjectData";
import { Technologies, Tech, ContactWrapper, TechImg } from "./AboutElements";
import { TechCard } from "../Projects/ProjectCard/ProjectCardElements";
import ScrollAnimation from "react-animate-on-scroll";

function About({ data }) {
  const style = {
    height: "10px",
    border: "0",
    boxShadow: "0 10px 10px -10px #8c8c8c inset",
  };
  return (
    <ContactWrapper id="about">
      <div className="Container">
        <ScrollAnimation delay={200} animateIn="fadeIn" animateOnce>
          <div className="SectionTitle">
            About Me
            <hr style={style} />
          </div>
        </ScrollAnimation>
        <div className="BigCard">
          <div
            className="AboutBio"
            style={{ textAlign: "left", width: "100%" }}
          >
            <ScrollAnimation animateIn="fadeInLeft" animateOnce>
              <div dangerouslySetInnerHTML={{ __html: data["about"] }} />
            </ScrollAnimation>
            <br />
            <ScrollAnimation animateIn="bounceInRight" animateOnce>
              <h3
                style={{
                  fontWeight: "700",
                }}
              >
                Technologies I'm Familiar With ➜
              </h3>
            </ScrollAnimation>
            <br />
            <Technologies>
              {data["techs"].map((stack, index) => (
                <ScrollAnimation
                  animateIn="bounceInLeft"
                  animateOnce
                  key={stack.key}
                >
                  <Tech className="tech">
                    {/* <TechImg src={stack.img} alt={stack.name} /> */}
                    <TechCard>{stack.value}</TechCard>
                  </Tech>
                </ScrollAnimation>
              ))}
            </Technologies>
            <br />
            <ScrollAnimation animateIn="bounceInRight" animateOnce>
              <h3 style={{ fontWeight: "700" }}>Tools I'm Familiar With ➜</h3>
            </ScrollAnimation>
            <br />
            <Technologies>
              {data["tools"].map((tool, index) => (
                <ScrollAnimation
                  animateIn="bounceInLeft"
                  animateOnce
                  key={tool.key}
                >
                  <Tech key={index} className="tech">
                    {/* <TechImg src={stack.img} alt={stack.name} /> */}
                    <TechCard>{tool.value}</TechCard>
                  </Tech>
                </ScrollAnimation>
              ))}
            </Technologies>
          </div>
        </div>
      </div>
    </ContactWrapper>
  );
}

export default About;
