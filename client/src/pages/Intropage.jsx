import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Homepage from "./Homepage";
import IdMaker from "../components/IdMaker";

import { Alert, Card, IconButton, Snackbar } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import DialogComp from "../components/DialogComp";

const steps = [
  {
    label: "Accept terms and conditions",
    description: `This is a free web application that allows you to create your own portfolio. This application will ask for your personal information to create portfolio and host it globally.`,
  },
  {
    label: "Create your global portfolio id",
    description:
      "Here create your id that should be unique across all others. Click on check button to check your id is unique or not.",
  },
  {
    label: "Copy up and update your portfolio",
    description: `Copy the portfolio link to your clipboard by clicking on copy icon and proceed.....`,
  },
];

export default function Intropage({ setUser, user, values, setValues }) {
  const [activeStep, setActiveStep] = useState(0);
  const [id, setId] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [page, setPage] = useState(true);

  const handleNext = (index) => {
    if (index === 2) {
      console.log(user);
      setUser(values);

      setPage(false);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const [decline, setDecline] = useState(false);
  const handleBack = (index) => {
    setError("");
    setName("");
    setCopied(false);
    if (index === 0) {
      //setUser to null and logout
      // setUser("");
      setDecline(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const checkId = async () => {
    if (name.length < 4) {
      setError(true);
    } else {
      await fetch("http://localhost:5000/checkId", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ portfolioId: name, email: values["email"] }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === 200) {
            setError(false);
            setId(true);
            setValues({ ...values, portfolioId: name });
          } else {
            setError(true);
            setId(false);
          }
        })
        .catch((err) => {
          setError(true);
          setId(false);
          console.log(err);
        });
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`https://devkrishnasai.vercel.app/${name}`)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000);
      });
  };

  return (
    <div>
      {decline && (
        <DialogComp
          setDecline={setDecline}
          decline={decline}
          values={values}
          setValues={setValues}
          setUser={setUser}
        />
      )}
      {page === true ? (
        <div
          style={{
            maxWidth: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    <Typography>{step.description}</Typography>
                    {activeStep === 0 && (
                      <Typography
                        variant="body1"
                        style={{ margin: "10px 0px" }}
                      >
                        This is how the portfolio looks like
                        <br />
                        <a
                          href="https://devkrishnasai.vercel.app/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: "none" }}
                        >
                          https://devkrishnasai.vercel.app/
                        </a>
                      </Typography>
                    )}
                    {activeStep === 1 && (
                      <IdMaker
                        id={id}
                        setId={setId}
                        name={name}
                        setName={setName}
                        error={error}
                        setError={setError}
                        checkId={checkId}
                        user={user}
                      />
                    )}
                    {activeStep === 2 && (
                      <Box display="flex" alignItems="center">
                        <Card
                          elevation={copied ? 1 : 5}
                          sx={{
                            backgroundColor: "#D3D3D3",
                            borderRadius: "10px",
                            padding: "10px",
                          }}
                        >
                          <Typography variant="body1">
                            https://devkrishnasai.vercel.app/{name}
                          </Typography>
                        </Card>

                        <IconButton
                          onClick={(e) => handleCopy()}
                          sx={{ ml: "5px" }}
                        >
                          <ContentCopy />
                        </IconButton>
                      </Box>
                    )}
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        onClick={(e) => handleNext(index)}
                        sx={{ mr: 1 }}
                        disabled={activeStep === 1 && !id ? true : false}
                      >
                        {activeStep === 0 ? "Accept" : "Next"}
                      </Button>
                      <Button onClick={(e) => handleBack(index)}>
                        {activeStep === 0 ? "decline" : "Back"}
                      </Button>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
            <Snackbar
              open={copied}
              autoHideDuration={5000}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <Alert
                sx={{
                  width: "100%",
                  backgroundColor: "blue",
                  borderRadius: "40px",
                }}
                color="success"
                variant="filled"
              >
                Copied
              </Alert>
            </Snackbar>
          </Box>
        </div>
      ) : (
        <Homepage user={user} setUser={setUser} />
      )}
    </div>
  );
}
