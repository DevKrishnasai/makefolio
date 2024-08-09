import React from "react";
import { FaGithub } from "react-icons/fa";
import {
  Card,
  CardLeft,
  CardRight,
  TechCardContainer,
  TechCard,
  BtnGroup,
} from "./ProjectCardElements";
import ScrollAnimation from "react-animate-on-scroll";
function ProjectCard({ data }) {
  return (
    <>
      {data["projects"].map((list, index) =>
        index % 2 ? (
          <ScrollAnimation
            animatePreScroll
            animateIn="fadeInLeft"
            key={index}
            animateOnce
          >
            <Card>
              <CardLeft>
                <img src={list["image_url"]} alt={list["title"]} />
              </CardLeft>
              <CardRight>
                <h4>{list["title"]}</h4>
                <p>{list["description"]}</p>
                <TechCardContainer>
                  {list["tech_stack"].map((tech, index) => (
                    <TechCard key={index}>{tech["value"]}</TechCard>
                  ))}
                </TechCardContainer>
                <BtnGroup>
                  {}
                  {list["github_repo_link"].length > 1 && (
                    <a
                      className="btn SecondaryBtn btn-shadow"
                      href={list["github_repo_link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaGithub style={{ marginRight: "4px" }} />
                      <span>Github</span>
                    </a>
                  )}
                  {list["github_live_link"].length > 1 && (
                    <a
                      className="btn PrimaryBtn btn-shadow"
                      href={list["github_live_link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginRight: "10px" }}
                    >
                      Live ➜
                    </a>
                  )}
                </BtnGroup>
              </CardRight>
            </Card>
          </ScrollAnimation>
        ) : (
          <ScrollAnimation
            animatePreScroll
            animateIn="fadeInRight"
            key={index}
            animateOnce
          >
            <Card>
              <CardLeft>
                <img src={list["image_url"]} alt={list["title"]} />
              </CardLeft>
              <CardRight>
                <h4>{list["title"]}</h4>
                <p>{list["description"]}</p>
                <TechCardContainer>
                  {list["tech_stack"].map((tech, index) => (
                    <TechCard key={index}>{tech["value"]}</TechCard>
                  ))}
                </TechCardContainer>
                <BtnGroup>
                  {list["github_repo_link"].length > 1 && (
                    <a
                      className="btn btn-shadow"
                      href={list["github_repo_link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FaGithub style={{ marginRight: "4px" }} />
                      <span>Github</span>
                    </a>
                  )}
                  {list["github_live_link"].length > 1 && (
                    <a
                      className="btn  btn-shadow"
                      href={list["github_live_link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginRight: "10px" }}
                    >
                      Live ➜
                    </a>
                  )}
                </BtnGroup>
              </CardRight>
            </Card>
          </ScrollAnimation>
        )
      )}
    </>
  );
}

export default ProjectCard;
