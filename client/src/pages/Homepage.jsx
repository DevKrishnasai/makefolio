import {
  Alert,
  Box,
  Button,
  Chip,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

import {
  AccountCircle,
  LogoDevRounded,
  TagSharp,
  TerminalRounded,
  EmailRounded,
  GitHub,
  LinkedIn,
  Instagram,
  ConstructionRounded,
  CloudUploadOutlined,
} from "@mui/icons-material";
import RemainingDetailsPage from "./RemainingDetailsPage";
import { Textarea } from "@mui/joy";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase files/firebase";
import styled from "styled-components";

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
    if (e.key === "Enter") {
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
    console.log(data);
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
      console.log(data);
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
    console.log("in uploadImage");
    if (file == null) return;
    console.log("i'm uploading image");
    const imageRef = ref(storage, `${data["fullName"]}/${file.name}`);
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("Download URL:", url);

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
        my: "30px",
      }}
    >
      {console.log("bro user", user)}
      {/* <Typography
        variant="h3"
        sx={{ fontWeight: 700, fontFamily: "sans-serif" }}
      >
        Form
      </Typography> */}
      {page === "home" && (
        <Stack sx={{ width: "600px" }}>
          {/* <AspectRatio maxHeight={58} minHeight={40} sx={{ borderRadius: "8px" }}>
          <Skeleton variant="rectangular" />
        </AspectRatio> */}
          <Stack direction="row" spacing="10px">
            <TextField
              type="text"
              label="Enter logo name"
              sx={{ ...textBoxSX, width: "50%" }}
              onChange={(e) => {
                setData({ ...data, logoName: e.target.value });
                setError("");
              }}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <LogoDevRounded />
                  </InputAdornment>
                ),
              }}
              error={error === "logoName" && true}
              helperText={error === "logoName" && "Please enter a logo name"}
            />
            <TextField
              type="text"
              label="Enter full name"
              sx={{ ...textBoxSX, width: "50%" }}
              onChange={(e) => {
                setData({ ...data, fullName: e.target.value });
                setError("");
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              error={error === "fullName" && true}
              helperText={error === "fullName" && "Please enter a full name"}
            />
          </Stack>
          <TextField
            type="email"
            label="Enter email"
            sx={{ ...textBoxSX, width: "100%" }}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
              setError("");
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <EmailRounded />
                </InputAdornment>
              ),
            }}
            error={error === "email" && true}
            helperText={
              error === "email" && "Please enter a formated email address "
            }
          />
          <TextField
            label="Enter tags"
            onChange={(e) => {
              setTagsController(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => addLines(e, "tags", tagsController)}
            value={tagsController}
            sx={textBoxSX}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <TagSharp />
                </InputAdornment>
              ),
            }}
            error={error === "tags" && true}
            helperText={
              error === "tags" &&
              "Please enter atleast one tag and press Enter Key"
            }
          />
          <ul>
            {data["tags"].map((data) => {
              return (
                <Chip
                  sx={{ marginX: "3px", marginY: "5px" }}
                  label={data["value"]}
                  key={data["key"]}
                  onDelete={(e) => deleteLines(data["key"], "tags")}
                />
              );
            })}
          </ul>
          <Textarea
            minRows={5}
            placeholder="Enter about yourself...."
            sx={textBoxSX}
            onClick={(e) => {
              error === "about" && setError("");
            }}
            onChange={(e) => setData({ ...data, about: e.target.value })}
            variant="outlined"
            error={error === "about" && true}
            defaultValue={
              error === "about" ? "Please enter few lines about yourself" : ""
            }
          />
          <TextField
            label="Enter technologies you are familiar with..."
            onChange={(e) => {
              setTechsController(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => addLines(e, "techs", techsController)}
            value={techsController}
            sx={textBoxSX}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <TerminalRounded />
                </InputAdornment>
              ),
            }}
            error={error === "techs" && true}
            helperText={
              error === "techs" &&
              "Please enter atleast one tech and press Enter Key"
            }
          />
          <ul>
            {data["techs"].map((data) => {
              return (
                <Chip
                  sx={{ marginX: "3px", marginY: "5px" }}
                  label={data["value"]}
                  key={data["key"]}
                  onDelete={(e) => deleteLines(data["key"], "techs")}
                />
              );
            })}
          </ul>
          <TextField
            sx={{ ...textBoxSX, width: "100%" }}
            label="Enter tools you are familiar with..."
            onChange={(e) => {
              setToolsController(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => addLines(e, "tools", toolsController)}
            value={toolsController}
            // sx={textBoxSX}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  {/* <Hint hint="Press 'Enter Key' to insert multiple Tool Names" /> */}
                  <ConstructionRounded />
                </InputAdornment>
              ),
            }}
            error={error === "tools" && true}
            helperText={
              error === "tools" &&
              "Please enter atleast one tool and press Enter Key"
            }
          />

          <ul>
            {data["tools"].map((data) => {
              return (
                <Chip
                  sx={{ marginX: "3px", marginY: "5px" }}
                  label={data["value"]}
                  key={data["key"]}
                  onDelete={(e) => deleteLines(data["key"], "tools")}
                />
              );
            })}
          </ul>
          <TextField
            label="Github Link"
            sx={{ ...textBoxSX }}
            onChange={(e) => {
              setData({
                ...data,
                links: { ...data["links"], github: e.target.value },
              });
              setError("");
            }}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <GitHub />
                </InputAdornment>
              ),
            }}
            error={error === "github" && true}
            helperText={error === "github" && "Please paste the github link"}
          />
          <TextField
            label="Linkedin Link"
            sx={{ ...textBoxSX }}
            onChange={(e) => {
              setData({
                ...data,
                links: { ...data["links"], linkedin: e.target.value },
              });
              setError("");
            }}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <LinkedIn />
                </InputAdornment>
              ),
            }}
            error={error === "linkedin" && true}
            helperText={
              error === "linkedin" && "Please paste the linkedin link"
            }
          />
          <TextField
            label="Instagram Link"
            sx={{ ...textBoxSX }}
            onChange={(e) => {
              setData({
                ...data,
                links: { ...data["links"], instagram: e.target.value },
              });
              setError("");
            }}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Instagram />
                </InputAdornment>
              ),
            }}
            error={error === "instagram" && true}
            helperText={
              error === "instagram" && "Please paste the instagram link"
            }
          />
          {loading && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div class="wrapper">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
                <div class="shadow"></div>
              </div>
            </div>
          )}
          {data["hero_url"] !== "" && (
            <img
              src={data["hero_url"]}
              alt="nope"
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}
          {error === "hero_url" && (
            <Typography
              sx={{ textAlign: "center" }}
              variant="body1"
              color="red"
            >
              Please Upload your photo
            </Typography>
          )}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadOutlined />}
            // sx={{ ...textFieldSX, width: "100%" }}
            onClick={(e) => setError("")}
            onChange={(e) => {
              setError("");
              setData({ ...data, hero_url: "" });
              uploadImage(e.target.files[0]);
            }}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
          <Button variant="contained" onClick={() => checkForm()} type="submit">
            Next Page
          </Button>
          {/* Snakbars like notifications */}
        </Stack>
      )}

      {page === "middle" && (
        <Stack sx={{ width: "700px" }}>
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
        </Stack>
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
