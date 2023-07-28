// using React Hook Form

import { Autocomplete, Avatar, Box, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { useFormContext, Controller } from "react-hook-form";

// Props validation
RHFAutoComplete.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.node,
  options: PropTypes.array.isRequired, // Added options prop
};

export default function RHFAutoComplete({
  name,
  label,
  helperText,
  options,
  ...other
}) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          {...field}
          fullWidth
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          options={options}
          getOptionLabel={(option) => option.name}
          onChange={(event, newValue) =>
            setValue(name, newValue, { shouldValidate: true })
          }
          clearOnBlur={true}
          clearOnEscape={true}
          filterOptions={(options, { inputValue }) =>
            options.filter((option) =>
              option.name.toLowerCase().includes(inputValue.toLowerCase())
            )
          }
          {...other}
          renderInput={(params) => (
            <TextField
              label={label}
              error={!!error}
              helperText={error ? error.message : helperText}
              {...params}
            />
          )}
        />
      )}
    />
  );
}
