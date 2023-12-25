import styled from "@emotion/styled";
import { CloudUploadOutlined } from "@mui/icons-material";
import {
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Button as Btn,
  Typography,
} from "@mui/material";
import { Button, Textarea } from "@mui/joy";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase files/firebase";
import React, { useState } from "react";

const ProjectSection = ({
  addLines,
  deleteLines,
  setProject,
  project,
  setProjectsController,
  projectsController,
  handleClose,
  open,
  addProject,

  data,
}) => {
  const textFieldSX = {
    width: "100%",
    marginY: "10px",
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
  const [error, setError] = useState("");

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

        setProject({ ...project, image_url: url });
        setLoading(false);
      });
    });
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ padding: "10px" }}>
      <DialogContent>
        <Box
        // sx={{
        //   width: "100%",
        //   border: "3px solid black",
        //   borderRadius: "20px",
        //   padding: "10px",
        // }}
        >
          <TextField
            placeholder="project name"
            sx={textFieldSX}
            onChange={(e) => {
              setProject({ ...project, title: e.target.value });
              setError("");
            }}
            error={error === "title" && true}
            helperText={error === "title" && "Please enter a project title"}
          />

          <Textarea
            minRows={5}
            placeholder="project description"
            sx={textFieldSX}
            onChange={(e) => {
              setProject({ ...project, description: e.target.value });
              setError("");
            }}
            error={error === "description" && true}
            helperText={
              error === "description" &&
              "Please enter description for the project"
            }
            variant="outlined"
          />

          <TextField
            placeholder="project github link"
            sx={textFieldSX}
            onChange={(e) => {
              setProject({ ...project, github_repo_link: e.target.value });
              setError("");
            }}
            error={error === "github_repo_link" && true}
            helperText={
              error === "github_repo_link" &&
              "Please paste github repository link of the project"
            }
          />
          <TextField
            placeholder="project live link"
            sx={textFieldSX}
            onChange={(e) => {
              setProject({ ...project, github_live_link: e.target.value });
              setError("");
            }}
            error={error === "github_live_link" && true}
            helperText={
              error === "github_live_link" &&
              "Please paste live link of the project"
            }
          />
          <TextField
            placeholder="Enter technologies you used to develop this project..."
            onChange={(e) => {
              setProjectsController(e.target.value);
              setError("");
            }}
            onKeyDown={(e) =>
              addLines(e, "tech_stack", projectsController, true)
            }
            value={projectsController}
            sx={textFieldSX}
            error={error === "tech_stack" && true}
            helperText={
              error === "tech_stack" &&
              "Please enter atleast one technology name and press Enter Key"
            }
          />
          <ul>
            {project["tech_stack"].map((data) => {
              return (
                <Chip
                  sx={{ marginX: "3px", marginY: "5px" }}
                  label={data["value"]}
                  key={data["key"]}
                  onDelete={(e) => deleteLines(data["key"], "tech_stack", true)}
                />
              );
            })}
          </ul>
          {/* {loading && (
            <Button loading sx={{ width: "100%" }} variant="plain"></Button>
          )} */}
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

          {project["image_url"] !== "" && (
            <img
              src={project["image_url"]}
              alt="nope"
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}
          {error === "image_url" && (
            <Typography variant="body1" color="red">
              Please Upload a image/thumbnail
            </Typography>
          )}
          <Btn
            component="label"
            variant="contained"
            startIcon={<CloudUploadOutlined />}
            sx={{ ...textFieldSX, width: "100%" }}
            onClick={(e) => setError("")}
            onChange={(e) => {
              setError("");
              uploadImage(e.target.files[0]);
            }}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Btn>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={(e) => {
            handleClose();
            setError(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (project["title"] === "") {
              setError("title");
            } else if (project["description"] === "") {
              setError("description");
            } else if (project["github_repo_link"] === "") {
              setError("github_repo_link");
            } else if (project["github_live_link"] === "") {
              setError("github_live_link");
            } else if (project["tech_stack"].length === 0) {
              setError("tech_stack");
            } else if (project["image_url"] === "") {
              setError("image_url");
            } else {
              setError("");
              addProject();
              handleClose();
              setProject({
                title: "",
                description: "",
                github_live_link: "",
                github_repo_link: "",
                tech_stack: [],
                image_url: "",
              });
              setProjectsController([]);
            }
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectSection;
