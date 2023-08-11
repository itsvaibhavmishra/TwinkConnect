import { Stack, TextField } from "@mui/material";
import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";

// Props validation
RHFOtp.propTypes = {
  keyName: PropTypes.string,
  inputs: PropTypes.array,
  helperText: PropTypes.node,
};

export default function RHFOtp({
  keyName = "",
  helperText,
  inputs = [],
  ...other
}) {
  const otpsRef = useRef(null);

  const { control, setValue } = useFormContext();

  const handleChangeWithNextField = (event, handleChange) => {
    const { maxLength, value, name } = event.target;
    const fieldIndex = name.replace(keyName, "");

    const fieldIntIndex = Number(fieldIndex);
    const prevField = document.querySelector(
      `input[name=${keyName}${fieldIntIndex - 1}]`
    );

    if (value.length === 0 && prevField !== null) {
      event.preventDefault(); // Prevent the default behavior
      prevField.focus(); // Move focus to the previous field
      setValue(name, ""); // Clear the current field's value
    } else if (value.length > maxLength) {
      event.target.value = value[0];
    } else if (value.length >= maxLength && fieldIntIndex < 6) {
      const nextField = document.querySelector(
        `input[name=${keyName}${fieldIntIndex + 1}]`
      );
      if (nextField !== null) {
        nextField.focus();
      }
    }

    handleChange(event);
  };

  const handlePaste = (event) => {
    event.preventDefault(); // Prevent the default paste behavior

    const pastedData = event.clipboardData.getData("text");
    const otpArray = pastedData.split("");

    otpArray.forEach((char, index) => {
      const fieldName = `${keyName}${index + 1}`;
      setValue(fieldName, char); // Set the value using setValue
    });
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      spacing={2}
      ref={otpsRef}
      onPaste={handlePaste} // Add the paste event handler
    >
      {inputs.map((name, index) => (
        <Controller
          key={name}
          name={`${keyName}${index + 1}`}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              error={!!error}
              autoFocus={index === 0}
              placeholder={`-`}
              onChange={(event) => {
                handleChangeWithNextField(event, field.onChange);
              }}
              onFocus={(event) => event.currentTarget.select()}
              InputProps={{
                sx: {
                  "& input": { textAlign: "center" },
                },
              }}
              inputProps={{
                maxLength: 1,
                type: "string",
              }}
              helperText={error ? error.message : helperText}
              {...other}
            />
          )}
          control={control}
        ></Controller>
      ))}
    </Stack>
  );
}
