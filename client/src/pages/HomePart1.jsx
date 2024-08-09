import {
  AccountCircle,
  AddPhotoAlternate,
  AddToDrive,
  ConstructionRounded,
  EmailRounded,
  GitHub,
  Instagram,
  LinkedIn,
  LogoDevRounded,
  TagSharp,
  TerminalRounded,
} from "@mui/icons-material";
import { Textarea } from "@mui/joy";
import {
  Chip,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

const HomePart1 = ({
  addLines,
  deleteLines,
  data,
  setData,
  tagsController,
  setTagsController,
  toolsController,
  setToolsController,
  techsController,
  setTechsController,
  error,
  setError,
  textBoxSX,
  checkForm,
  uploadImage,
  loading,
  VisuallyHiddenInput,
}) => {
  const [next, setNext] = React.useState(1);

  const checkSubForm = () => {
    if (next === 1) {
      if (data["logoName"] === "") {
        setError("logoName");
      } else if (data["fullName"] === "") {
        setError("fullName");
      } else if (data["email"] === "" || !data["email"].includes("@")) {
        setError("email");
      } else {
        setNext(next + 1);
      }
    } else if (next === 2) {
      if (data["about"] === "") {
        setError("about");
      } else if (data["tags"].length === 0) {
        setError("tags");
      } else {
        setNext(next + 1);
      }
    } else if (next === 3) {
      if (data["techs"].length === 0) {
        setError("techs");
      } else {
        setNext(next + 1);
      }
    } else if (next === 4) {
      if (data["tools"].length === 0) {
        setError("tools");
      } else {
        setNext(next + 1);
      }
    } else {
      if (data["resume_url"] === "") {
        setError("resume_url");
      } else if (data["links"]["github"].length === 0) {
        setError("github");
      } else if (data["links"]["linkedin"].length === 0) {
        setError("linkedin");
      } else if (data["links"]["instagram"].length === 0) {
        setError("instagram");
      } else if (data["hero_url"] === "") {
        setError("hero_url");
      } else {
        setNext(next + 1);
      }
    }
  };
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          width: {
            xs: "90vw",
            lg: "40vw",
          },
          my: "20px",
          display: {
            xs: "none",
            sm: "none",
            lg: "flex",
          },
        }}
      >
        {/* <AspectRatio maxHeight={58} minHeight={40} sx={{ borderRadius: "8px" }}>
          <Skeleton variant="rectangular" />
        </AspectRatio> */}
        <Stack
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            gap: {
              lg: "10px",
            },
          }}
        >
          <TextField
            type="text"
            label="logo (ex: Krishna)"
            sx={{
              ...textBoxSX,

              width: {
                xs: "100%",
                lg: "50%",
              },
            }}
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
            value={data["logoName"]}
          />
          <TextField
            type="text"
            label="Enter full name"
            sx={{
              ...textBoxSX,
              width: {
                xs: "100%",
                lg: "50%",
              },
            }}
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
            helperText={error === "fullName" && "Please enter full name"}
            value={data["fullName"]}
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
          value={data["email"]}
        />
        <TextField
          label="Enter tags (e.g. I'm React Developer )(You can add many tags) "
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
            "Please enter atleast one tag and press Enter Key to add to the list"
          }
        />
        {data["tags"].length === 0 && (
          <span className="small-text">
            Note : You can add many tags by pressing 'Enter Key' after each tag
            ( This will be in the typing effect in the portfolio)
          </span>
        )}
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
          placeholder="Enter about yourself....(Here you can also highlight some texts by wrapping them in <b></b> and you can use other html tags to decorate text ex: b,i,small... tags)"
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
          value={data["about"]}
        />
        {data["about"].length === 0 && (
          <span className="small-text">
            Note : You can use html tags to decorate the text like b,i,small...
          </span>
        )}
        <div dangerouslySetInnerHTML={{ __html: data["about"] }} />
        <TextField
          label="Enter technologies (e.g. HTML)"
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
        {data["techs"].length === 0 && (
          <span className="small-text">
            Note : You can add many techs by pressing 'Enter Key' after each
            tech
          </span>
        )}
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
          label="Enter tools (e.g. VS Code)"
          onChange={(e) => {
            setToolsController(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => addLines(e, "tools", toolsController)}
          value={toolsController}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
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
        {data["tools"].length === 0 && (
          <span className="small-text">
            Note : You can add many tools by pressing 'Enter Key' after each
            tool
          </span>
        )}

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
          label="Paste your resume drive link"
          sx={{ ...textBoxSX, width: "100%" }}
          onChange={(e) => {
            setData({ ...data, resume_url: e.target.value });
            setError("");
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <AddToDrive />
              </InputAdornment>
            ),
          }}
          error={error === "resume_url" && true}
          helperText={
            error === "resume_url" && "Please enter a valid drive link"
          }
          value={data["resume_url"]}
        />
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
          helperText={
            error === "github" &&
            "Please paste the github link else paste github.com or keep #"
          }
          value={data["links"]["github"]}
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
            error === "linkedin" &&
            "Please paste the linkedin link else paste linkedin.com or keep #"
          }
          value={data["links"]["linkedin"]}
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
            error === "instagram" &&
            "Please paste the instagram link else paste instagram.com or keep #"
          }
          value={data["links"]["instagram"]}
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
          <Typography sx={{ textAlign: "center" }} variant="body1" color="red">
            Please Upload your photo
          </Typography>
        )}
        <Button
          component="label"
          variant="contained"
          startIcon={<AddPhotoAlternate />}
          // sx={{ ...textFieldSX, width: "100%" }}
          onClick={(e) => setError("")}
          onChange={(e) => {
            setError("");
            setData({ ...data, hero_url: "" });
            uploadImage(e.target.files[0]);
          }}
          sx={{ mt: "10px" }}
          color="warning"
        >
          Upload Photo
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button
          sx={{ my: "10px" }}
          variant="contained"
          onClick={() => checkForm()}
          type="submit"
        >
          Next Page
        </Button>
        {/* Snakbars like notifications */}
      </Stack>
      <Stack
        sx={{
          width: {
            xs: "90vw",
            lg: "40vw",
          },
          my: "20px",
          display: {
            xs: "flex",
            sm: "flex",
            lg: "none",
          },
        }}
      >
        {next === 1 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                },
                gap: {
                  lg: "10px",
                },
              }}
            >
              <TextField
                type="text"
                label="Enter logo name"
                sx={{
                  ...textBoxSX,

                  width: {
                    xs: "100%",
                    lg: "50%",
                  },
                }}
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
                value={data["logoName"]}
              />
              <TextField
                type="text"
                label="Enter full name"
                sx={{
                  ...textBoxSX,
                  width: {
                    xs: "100%",
                    lg: "50%",
                  },
                }}
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
                helperText={error === "fullName" && "Please enter full name"}
                value={data["fullName"]}
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
              value={data["email"]}
            />
          </div>
        )}
        {next === 2 && (
          <>
            <Textarea
              minRows={5}
              placeholder="Enter about yourself....(Here you can also highlight some texts by wrapping them in <b></b> and you can use other html tags to decorate text ex: b,i,small... tags)"
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
              value={data["about"]}
            />
            {data["about"].length === 0 && (
              <span className="small-text">
                Note : You can use html tags to decorate the text like
                b,i,small...
              </span>
            )}
            <div dangerouslySetInnerHTML={{ __html: data["about"] }} />
            <TextField
              label="Enter tags (ex: React Developer )(You can add many tags)"
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
            {data["tags"].length === 0 && (
              <span className="small-text">
                Note : You can add many tags by pressing 'Enter Key' after each
                tag (This will be in the typing effect in the portfolio)
              </span>
            )}
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
          </>
        )}
        {next === 3 && (
          <>
            <TextField
              label="Enter technologies (Like HTML,CSS,JS.... make sure to instert one by one)"
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
          </>
        )}
        {next === 4 && (
          <>
            <TextField
              sx={{ ...textBoxSX, width: "100%" }}
              label="Enter tools (Like VS Code, Android Studio, Postman....)"
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
            {data["tools"].length === 0 && (
              <span className="small-text">
                Note : You can add many tools by pressing 'Enter Key' after each
                tool
              </span>
            )}
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
          </>
        )}
        {next === 5 && (
          <>
            <TextField
              label="Paste your resume drive link"
              sx={{ ...textBoxSX, width: "100%" }}
              onChange={(e) => {
                setData({ ...data, resume_url: e.target.value });
                setError("");
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AddToDrive />
                  </InputAdornment>
                ),
              }}
              error={error === "resume_url" && true}
              helperText={
                error === "resume_url" && "Please enter a valid drive link"
              }
              value={data["resume_url"]}
            />
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
              helperText={
                error === "github" && "Please paste the github link or keep #"
              }
              value={data["links"]["github"]}
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
                error === "linkedin" &&
                "Please paste the linkedin link or keep #"
              }
              value={data["links"]["linkedin"]}
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
                error === "instagram" &&
                "Please paste the instagram link or keep #"
              }
              value={data["links"]["instagram"]}
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
              startIcon={<AddPhotoAlternate />}
              // sx={{ ...textFieldSX, width: "100%" }}
              onClick={(e) => setError("")}
              onChange={(e) => {
                setError("");
                setData({ ...data, hero_url: "" });
                uploadImage(e.target.files[0]);
              }}
              sx={{ mt: "10px" }}
              color="warning"
            >
              Upload Photo
              <VisuallyHiddenInput type="file" />
            </Button>
            <Button
              sx={{ my: "10px" }}
              variant="contained"
              onClick={() => checkForm()}
              type="submit"
            >
              Next Page
            </Button>
          </>
        )}
        {next !== 5 && (
          <Button
            onClick={(e) => {
              //   setNext(next + 1);
              checkSubForm();
            }}
            variant="contained"
            sx={{ my: "10px" }}
          >
            Next
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default HomePart1;
