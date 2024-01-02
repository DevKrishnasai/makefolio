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
import { EmailRounded, PasswordRounded } from "@mui/icons-material";

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
      await fetch("https://makfolio-api.onrender.com/api/v1/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === 200) {
            setUser({ ...values, portfolioId: data["portfolioId"] });
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
      {isLoading ? (
        <Btn loading variant="plain" sx={{ height: "50px" }}>
          loading...
        </Btn>
      ) : (
        <Stack>
          <form onSubmit={handleSubmit} className="form">
            <div class="twelve">
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
              error={error === "email" && true}
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
              error={error === "password" && true}
              helperText={
                error === "password" &&
                "Please enter password with altleast 6 characters length"
              }
            />
            <Typography variant="p" color="red">
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
              Dont't have an account?
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
                onClick={(e) => setToggle(!toggle)}
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
