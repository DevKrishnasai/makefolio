import React, { useState } from "react";
import ProjectSection from "../components/ProjectSection";
import {
  Button,
  Chip,
  Fab,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Card, CardContent } from "@mui/joy";
import { Add, Delete, GitHub, LinkedIn } from "@mui/icons-material";
import { AspectRatio } from "@mui/joy";

const RemainingDetailsPage = ({
  addLines,
  deleteLines,
  setProject,
  project,
  setProjectsController,
  projectsController,
  addProject,
  data,
  handleClickAdd,
  handleClickDelete,
  deleteProject,
  user,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setProject({
      title: "",
      description: "",
      github_live_link: "",
      github_repo_link: "",
      tech_stack: [],
      image_url: "",
    });
    setProjectsController([]);
    setOpen(false);
  };

  const [error, setError] = useState(false);
  const [page, setPage] = useState("middle");
  const checkDetails = async () => {
    console.log(data);
    setLoading(true);

    if (data["projects"].length === 0) {
      setError(true);
      setPage("middle");
      setLoading(false);
      return; // Exit the function early if there are no projects
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/portfolios/portfoliodata",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (responseData.status === 201) {
        setPage("end");
      }

      setLoading(false);
    } catch (error) {
      console.log("Error: " + error.message);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={
        error === true
          ? {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: {
                xs: "90vh",
                lg: "90vh",
              },
            }
          : page === "end"
          ? {
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }
          : {
              // height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }
      }
    >
      {error && (
        <Typography variant="body1" sx={{ color: "red" }}>
          Please add atleast 1 Project
        </Typography>
      )}
      <ProjectSection
        setProject={setProject}
        project={project}
        addLines={addLines}
        deleteLines={deleteLines}
        projectsController={projectsController}
        setProjectsController={setProjectsController}
        open={open}
        data={data}
        onClose={handleClose}
        addProject={addProject}
        handleClose={handleClose}
        handleClickAdd={handleClickAdd}
        handleClickDelete={handleClickDelete}
        deleteProject={deleteProject}
      />
      {loading ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="wrapper">
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="circle"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
            <div class="shadow"></div>
          </div>
        </div>
      ) : (
        page === "middle" && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: {
                  xs: "400px",
                  lg: "600px",
                },
                marginBottom: "40px",
              }}
            >
              {data["projects"].map((project) => {
                return (
                  <Card
                    sx={{
                      marginY: "10px",
                      width: "100%",
                    }}
                    elevation={2}
                  >
                    <div>
                      <Typography level="title-lg" fontWeight={800}>
                        {project["title"]}
                      </Typography>
                      <IconButton
                        aria-label="bookmark Bahamas Islands"
                        variant="plain"
                        color="neutral"
                        size="sm"
                        sx={{
                          position: "absolute",
                          top: "0.6rem",
                          right: "0.5rem",
                        }}
                        onClick={(e) => deleteProject(project["title"])}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                    <AspectRatio minHeight="100px" maxHeight="300px">
                      <img
                        src={project["image_url"]}
                        loading="lazy"
                        alt="nope"
                        style={{
                          objectFit: "fill",
                        }}
                      />
                    </AspectRatio>
                    <CardContent orientation="horizontal">
                      <div>
                        <Typography
                          fontSize="lg"
                          fontWeight="lg"
                          align="justify"
                        >
                          {project["description"]}
                        </Typography>
                        {
                          <ol>
                            {project["tech_stack"].map((data) => {
                              return (
                                <Chip
                                  sx={{
                                    margin: "4px 4px 6px 0px",
                                    fontWeight: 500,
                                  }}
                                  label={data["value"]}
                                  key={data["key"]}
                                />
                              );
                            })}
                          </ol>
                        }

                        <Typography variant="subtitle2" marginBottom="6px">
                          Live :
                          <a
                            href={project["github_live_link"]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {project["github_live_link"]}
                          </a>
                        </Typography>
                        <Typography variant="subtitle2" marginBottom="6px">
                          Repo :
                          <a
                            href={project["github_repo_link"]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {project["github_repo_link"]}
                          </a>
                        </Typography>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </Box>

            <Box
              sx={{
                position: "fixed",
                bottom: "10px",

                width: {
                  xs: "60%",
                  lg: "600px",
                },
              }}
            >
              <Button
                variant="contained"
                fullWidth
                onClick={(e) => checkDetails()}
              >
                Done
              </Button>
            </Box>
            <Fab
              color="primary"
              aria-label="add"
              onClick={(e) => {
                setError(false);
                handleClickOpen();
              }}
              sx={{
                position: "fixed",
                bottom: {
                  xs: "50px",
                  lg: "40px",
                },
                right: {
                  xs: "20px",
                  lg: "40px",
                },
              }}
            >
              <Add />
            </Fab>
          </>
        )
      )}
      {page === "end" && (
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "center",
            padding: "20px",
            borderRadius: "30px",
            margin: "20px",
            ":hover": {
              cursor: "pointer",
              boxShadow:
                "0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)",
            },
          }}
          elevation={3}
          variant="outlined"
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{ marginBottom: "5px", fontWeight: 600 }}
          >
            Thank You for Using Our Service!
          </Typography>
          <Typography variant="body1" component="p" fontWeight={400}>
            If this service helped you, check out my portfolio and linkedin
            profile for more projects
          </Typography>
          <Typography
            sx={{
              margin: "10px 0px 5px 0px",
              padding: "10px",
              "&:hover": {
                fontSize: "20px",
                color: "white",
                backgroundColor: "black",
                borderRadius: "10px",
              },
            }}
          >
            <a
              href={`https://makfolio.vercel.app/${user["portfolioId"]}`}
              target="_blank"
              rel="noreferrer"
              style={{
                fontWeight: 600,
                fontSize: "20px",
              }}
            >
              {`https://makfolio.vercel.app/${user["portfolioId"]}`}
            </a>
          </Typography>
          <Box>
            <IconButton href="https://github.com/DevKrishnasai" target="_blank">
              <GitHub sx={{ color: "black", fontSize: "36px" }} />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/krishnasaiambati/"
              target="_blank"
            >
              <LinkedIn color="primary" sx={{ fontSize: "38px" }} />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default RemainingDetailsPage;
