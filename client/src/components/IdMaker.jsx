import { TextField, Typography, Button, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";

const IdMaker = ({
  id,
  setId,
  name,
  setName,
  checkId,
  error,
  setError,
  user,
  loading,
  setLoading,
}) => {
  return (
    <Box
      sx={{
        height: "140px",
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
        disabled={id && "true"}
      />
      {name.length > 0 && (
        <Typography
          variant="body1"
          sx={{ fontWeight: 500 }}
          color={error ? "red" : "black"}
        >
          https://makefolio.vercel.app/{name}
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
      <Button variant="contained" onClick={checkId} disabled={id && "true"}>
        {loading ? (
          <LoadingButton loading variant="outlined">
            Loading...
          </LoadingButton>
        ) : (
          "check"
        )}
      </Button>
    </Box>
  );
};

export default IdMaker;
