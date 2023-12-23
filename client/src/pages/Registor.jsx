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
      await fetch("http://localhost:5000/register", {
        method: "POST",
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
          if (data.status === 201) {
            // setUser(values);
            setTerms(true);
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
    <div>
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
          height="80vh"
        >
          {isLoading ? (
            <Btn loading variant="plain" sx={{ height: "50px" }}>
              loading...
            </Btn>
          ) : (
            <Stack>
              <form onSubmit={handleSubmit} className="form">
                <h1>Register</h1>
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
                  error={error === "name" && true}
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
                  error={error === "confirmPassword" && true}
                  helperText={
                    error === "confirmPassword" &&
                    "please check the password your entered!"
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
                  Register
                </Button>
                <Typography>
                  Already have a account?
                  <Button
                    variant="text"
                    sx={{ textTransform: "none" }}
                    onClick={(e) => setToggle(!toggle)}
                  >
                    SignIn
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
