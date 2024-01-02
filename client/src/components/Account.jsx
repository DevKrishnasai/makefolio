import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export default function Account({
  handleClickOpen,
  handleClickClose,
  open,
  setOpen,
  user,
  setUser,
  handleUpdate,
}) {
  const [id, setId] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [temp, setTemp] = useState(user["portfolioId"]);

  const checkId = async () => {
    setLoading(true);
    if (temp.length < 4) {
      setLoading(false);
      setError(true);
    } else {
      await fetch(
        `https://makfolio-api.onrender.com/api/v1/portfolios/checkId/${temp}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.status === 201) {
            setError(false);
            setId(true);
            setUser({ ...user, updatedPortfolioId: temp });
          } else {
            setError(true);
            setId(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          setError(true);
          setId(false);
        });
      setLoading(false);
    }
  };

  const textBoxSX = {
    marginY: "10px",
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClickClose} fullWidth>
        <DialogTitle>update details</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              // height: "150px",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-evenly",
            }}
          >
            <TextField
              type="email"
              label="Email"
              sx={{
                ...textBoxSX,
              }}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
              }}
              variant="outlined"
              value={user["email"]}
            />
            <TextField
              type="text"
              label="Password"
              sx={{
                ...textBoxSX,
              }}
              onChange={(e) => {
                setUser({ ...user, password: e.target.value });
              }}
              variant="outlined"
              value={user["password"]}
            />
          </Box>
          <Box
            sx={{
              height: "150px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              placeholder="Enter a unique name"
              onChange={(e) => {
                setTemp(e.target.value);
                setError(false);
              }}
              disabled={id && "true"}
              value={temp}
            />
            {temp.length > 0 && (
              <Typography
                variant="body1"
                sx={{ fontWeight: 500, ml: "10px" }}
                color={error ? "red" : "black"}
              >
                https://makfolio.vercel.app/{temp}
              </Typography>
            )}
            {temp.length > 0 && error && (
              <Typography color="red">
                Id already exits try different one
              </Typography>
            )}
            {error && temp.length === 0 && (
              <Typography color="red">
                please enter a name with atleast 3 characters
              </Typography>
            )}
            {temp !== user["portfolioId"] && (
              <Button
                variant="contained"
                onClick={checkId}
                disabled={id && "true"}
              >
                {loading ? (
                  <LoadingButton loading variant="outlined">
                    Loading...
                  </LoadingButton>
                ) : (
                  "check"
                )}
              </Button>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
