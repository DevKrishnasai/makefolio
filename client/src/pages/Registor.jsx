import React, { useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Button as Btn } from "@mui/joy";
import {
  EmailRounded,
  GitHub,
  LinkedIn,
  Man2,
  PasswordRounded,
  PasswordTwoTone,
} from "@mui/icons-material";
import Intropage from "./Intropage";

const Register = ({ setUser, toggle, setToggle, user }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setError("");

    if (values["name"] === "") {
      setError("name");
    } else if (values["email"] === "" || !values["email"].includes("@")) {
      setError("email");
    } else if (values["password"].length < 6) {
      setError("password");
    } else if (values["confirmPassword"].length < 6) {
      setError("confirmPassword");
    } else if (values["password"] !== values["confirmPassword"]) {
      setError("confirmPassword");
    } else {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BACKEND_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 201) {
            setTerms(true);
            setIsLoading(false);
          } else {
            setServerError(data.message);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setServerError(err.message);
          setIsLoading(false);
        });
    }
  };

  const textBoxSX = {
    marginY: "10px",
  };

  return (
    <div>
      <div className="bottom-center">
        <a
          href="https://www.linkedin.com/in/krishnasaiambati/"
          target="_blank"
          rel="noreferrer"
        >
          <LinkedIn
            sx={{
              fontSize: 40,
              color: "blue",
              ":hover": {
                scale: 10,
                cursor: "pointer",
              },
              marginRight: "5px",
            }}
          />
        </a>
        <a
          href="https://github.com/DevKrishnasai/"
          target="_blank"
          rel="noreferrer"
        >
          <GitHub sx={{ fontSize: 40 }} />
        </a>
      </div>
      {terms ? (
        <Intropage
          setUser={setUser}
          user={user}
          values={values}
          setValues={setValues}
          toggle={toggle}
          setToggle={setToggle}
        />
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          {isLoading ? (
            <Btn loading variant="plain" sx={{ height: "50px" }}>
              loading...
            </Btn>
          ) : (
            <Stack>
              <form onSubmit={handleSubmit} className="form">
                <div className="twelve">
                  <h1>Register</h1>
                </div>
                <TextField
                  type="text"
                  label="Enter name"
                  sx={{ ...textBoxSX, width: "100%" }}
                  onChange={(e) => {
                    setValues({ ...values, name: e.target.value });
                    setError("");
                  }}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Man2 />
                      </InputAdornment>
                    ),
                  }}
                  error={error === "name"}
                  helperText={error === "name" && "Please enter name"}
                />
                <TextField
                  type="email"
                  label="Enter email"
                  sx={{ ...textBoxSX, width: "100%" }}
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value });
                    setError("");
                  }}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailRounded />
                      </InputAdornment>
                    ),
                  }}
                  error={error === "email"}
                  helperText={error === "email" && "Please enter a valid email"}
                />
                <TextField
                  type="password"
                  label="Enter password"
                  sx={{ ...textBoxSX, width: "100%" }}
                  onChange={(e) => {
                    setValues({ ...values, password: e.target.value });
                    setError("");
                  }}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PasswordRounded />
                      </InputAdornment>
                    ),
                  }}
                  error={error === "password"}
                  helperText={
                    error === "password" &&
                    "Please enter password with at least 6 characters length"
                  }
                />
                <TextField
                  type="password"
                  label="Enter your password again"
                  sx={{ ...textBoxSX, width: "100%" }}
                  onChange={(e) => {
                    setValues({ ...values, confirmPassword: e.target.value });
                    setError("");
                  }}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <PasswordTwoTone />
                      </InputAdornment>
                    ),
                  }}
                  error={error === "confirmPassword"}
                  helperText={
                    error === "confirmPassword" &&
                    "Please check the password you entered!"
                  }
                />

                <Typography variant="body1" color="error">
                  {serverError}
                </Typography>

                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    width: {
                      xs: "270px",
                      sm: "400px",
                    },
                    marginTop: "10px",
                  }}
                >
                  Register
                </Button>
                <Typography>
                  Already have an account?
                  <Button
                    variant="text"
                    sx={{
                      textTransform: "none",
                      ":hover": {
                        textDecoration: "underline",
                        cursor: "pointer",
                        color: "blue",
                      },
                    }}
                    onClick={() => setToggle(!toggle)}
                  >
                    signin
                  </Button>
                </Typography>
              </form>
            </Stack>
          )}
        </Box>
      )}
    </div>
  );
};

export default Register;
