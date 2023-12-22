import React, { useState } from "react";
import { TextField } from "@mui/material";

const FormInput = (props) => {
  const [error, setError] = useState(false);
  const {
    label,
    errorMessage,
    onChange,
    pattern,
    id,
    name,
    value,
    values,
    setValues,
    ...inputProps
  } = props;

  const isValid = false;

  const handleBlur = () => {
    setError(isValid);
  };

  return (
    <div className="formInput">
      <TextField
        sx={{
          width: {
            xs: "250px",
            sm: "400px",
          },
        }}
        {...inputProps}
        onChange={(e) => {
          onChange(e);
          setError(value.length < pattern - 1);
          setValues({ ...values, [name]: e.target.value });
        }}
        onBlur={handleBlur}
        helperText={error ? errorMessage : ""}
        error={error}
        margin="normal"
        color="success"
      />
    </div>
  );
};

export default FormInput;
