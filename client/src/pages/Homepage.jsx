import { Alert, Box, Snackbar } from "@mui/material";
import React, { useState } from "react";
import RemainingDetailsPage from "./RemainingDetailsPage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase files/firebase";
import styled from "styled-components";
import HomePart1 from "./HomePart1";

const Homepage = ({ user, setUser }) => {
  //useState hooks to handle state changes
  const [page, setPage] = useState("home");
  const [counter, setCounter] = useState(1);
  const [tagsController, setTagsController] = useState("");
  const [techsController, setTechsController] = useState("");
  const [toolsController, setToolsController] = useState("");

  //These are used to control project section
  const [projectsController, setProjectsController] = useState([]);
  const [project, setProject] = useState({
    title: "",
    description: "",
    github_live_link: "",
    github_repo_link: "",
    tech_stack: [],
    image_url: "",
  });

  //main data
  const [data, setData] = useState({
    logoName: "",
    fullName: "",
    email: "",
    about: "",
    tags: [],
    techs: [],
    tools: [],
    projects: [],
    links: {
      github: "",
      linkedin: "",
      instagram: "",
    },
    portfolioId: user["portfolioId"],
    hero_url: "",
  });

  //styles
  const textBoxSX = {
    marginY: "10px",
  };

  //data deletions and adding functions
  const deleteLines = (key, str, other = false) => {
    if (other) {
      handleClickDelete();
      const tempData = project[str].filter((doc) => doc["key"] !== key);
      setProject({ ...project, [str]: tempData });
    } else {
      handleClickDelete();
      const tempData = data[str].filter((doc) => doc["key"] !== key);
      setData({ ...data, [str]: tempData });
    }
  };

  const addLines = (e, str, controller, other = false) => {
    if (e.key === "Enter" && controller !== "") {
      if (other) {
        handleClickAdd();
        const sample = [...project[str], { key: counter, value: controller }];
        const x = { ...project, [str]: sample };
        setProject(x);
        setCounter(counter + 1);
        setProjectsController("");
      } else {
        handleClickAdd();
        const sample = [...data[str], { key: counter, value: controller }];
        const x = { ...data, [str]: sample };
        setData(x);
        setTagsController("");
        setTechsController("");
        setToolsController("");
        setCounter(counter + 1);
      }
      setError("");
    }
  };

  //project adding function
  const addProject = () => {
    let temp = [...data["projects"], project];

    setData({ ...data, projects: temp });
    setProjectsController([]);
    handleClickAdd();
  };

  const deleteProject = (title) => {
    let temp = data["projects"].filter((doc) => doc["title"] !== title);
    setData({ ...data, projects: temp });
    setProjectsController([]);
    handleClickDelete();
  };

  //snackbar stuff
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState(false);
  const handleClickAdd = () => {
    setAdd(true);
  };
  const handleClickDelete = () => {
    setRemove(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAdd(false);
    setRemove(false);
  };

  const [error, setError] = useState(false);
  const checkForm = async () => {
    if (data["logoName"] === "") {
      setError("logoName");
    } else if (data["fullName"] === "") {
      setError("fullName");
    } else if (data["email"] === "" || !data["email"].includes("@")) {
      setError("email");
    } else if (data["tags"].length === 0) {
      setError("tags");
    } else if (data["about"] === "") {
      setError("about");
    } else if (data["techs"].length === 0) {
      setError("techs");
    } else if (data["tools"].length === 0) {
      setError("tools");
    } else if (data["links"]["github"] === "") {
      setError("github");
    } else if (data["links"]["linkedin"] === "") {
      setError("linkedin");
    } else if (data["links"]["instagram"] === "") {
      setError("instagram");
    } else if (data["hero_url"] === "") {
      setError("hero_url");
    } else {
      setError("");
      setPage("middle");
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [loading, setLoading] = useState(false);

  const uploadImage = (file) => {
    setError(false);
    setLoading(true);
    if (file == null) return;
    const imageRef = ref(storage, `${data["fullName"]}/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setData({ ...data, hero_url: url });
        setLoading(false);
      });
    });
  };

  //main code
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {page === "home" && (
        <HomePart1
          data={data}
          setData={setData}
          error={error}
          setError={setError}
          textBoxSX={textBoxSX}
          setTagsController={setTagsController}
          tagsController={tagsController}
          addLines={addLines}
          deleteLines={deleteLines}
          setTechsController={setTechsController}
          techsController={techsController}
          setToolsController={setToolsController}
          toolsController={toolsController}
          VisuallyHiddenInput={VisuallyHiddenInput}
          checkForm={checkForm}
          uploadImage={uploadImage}
          loading={loading}
        />
      )}

      {page === "middle" && (
        <RemainingDetailsPage
          setProject={setProject}
          project={project}
          addLines={addLines}
          deleteLines={deleteLines}
          projectsController={projectsController}
          setProjectsController={setProjectsController}
          addProject={addProject}
          deleteProject={deleteProject}
          data={data}
          handleClickAdd={handleClickAdd}
          handleClickDelete={handleClickDelete}
          user={user}
        />
      )}

      <Snackbar
        open={add}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{
            width: "100%",
            borderRadius: "40px",
          }}
          color="success"
          variant="filled"
        >
          Added
        </Alert>
      </Snackbar>
      <Snackbar
        open={remove}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Alert
          onClose={handleClose}
          // severity="success"
          sx={{
            width: "100%",
            backgroundColor: "red",
            borderRadius: "40px",
          }}
          color="error"
          variant="filled"
        >
          Deleted
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Homepage;
