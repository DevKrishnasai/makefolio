import { TextField, Typography, Button, Box } from "@mui/material";
import React, { useState } from "react";

const IdMaker = ({
  id,
  setId,
  name,
  setName,
  checkId,
  error,
  setError,
  user,
}) => {
  return (
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
          setName(e.target.value);
          setError(false);
        }}
        defaultValue={name}
      />
      {name.length > 0 && (
        <Typography
          variant="body1"
          sx={{ fontWeight: 500 }}
          color={error ? "red" : "black"}
        >
          https://devkrishnasai.vercel.app/{name}
        </Typography>
      )}
      {name.length > 0 && error && (
        <Typography color="red">Id already exits try different one</Typography>
      )}
      {error && name.length === 0 && (
        <Typography color="red">
          please enter a name with atleast 3 characters
        </Typography>
      )}
      <Button variant="contained" onClick={checkId}>
        Check
      </Button>
    </Box>
  );
};

export default IdMaker;
