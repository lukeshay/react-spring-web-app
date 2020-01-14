import TextField from "@material-ui/core/TextField";
import React from "react";

export interface IPropsInput {
  helpText?: string;
  id?: string;
  name?: string;
  type: string;
  value?: string;
  placeholder?: string;
  fullWidth?: boolean;
  autoComplete?: string;
  autoCapitalize?: "true" | undefined;
  handleChange?(event: any): void;
}

const Input: React.FC<IPropsInput> = ({
  helpText,
  id,
  name,
  type,
  value,
  placeholder,
  handleChange,
  autoComplete,
  autoCapitalize,
  fullWidth
}): JSX.Element => (
  <TextField
    id={id}
    type={type}
    label={placeholder}
    name={name}
    variant="outlined"
    margin="normal"
    onChange={handleChange}
    value={(value || "").toString()}
    fullWidth={fullWidth}
    autoComplete={autoComplete}
    autoCapitalize={autoCapitalize}
    helperText={helpText}
    error={helpText !== ""}
  />
);

Input.defaultProps = {
  fullWidth: true,
  helpText: "",
  id: "",
  name: "",
  placeholder: ""
};

export default Input;
