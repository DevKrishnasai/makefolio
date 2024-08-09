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
  PasswordRounded,
} from "@mui/icons-material";

const Login = ({ setUser, toggle, setToggle, user }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setError("");

    if (values["email"] === "" || !values["email"].includes("@")) {
      setError("email");
    } else if (values["password"].length < 6) {
      setError("password");
    } else {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BACKEND_URL}/users/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            const userData = { ...values, portfolioId: data["portfolioId"] };
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
            setIsLoading(false);
          } else {
            setServerError(data.message);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setServerError(err.message);
          setIsLoading(false);
        });
    }
  };

  const textBoxSX = {
    marginY: "10px",
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
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
      {isLoading ? (
        <Btn loading variant="plain" sx={{ height: "50px" }}>
          loading...
        </Btn>
      ) : (
        <Stack>
          <form onSubmit={handleSubmit} className="form">
            <div className="twelve">
              <h1>Login</h1>
            </div>
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
              Login
            </Button>
            <Typography>
              Don't have an account?
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
                signup
              </Button>
            </Typography>
          </form>
        </Stack>
      )}
    </Box>
  );
};

export default Login;
