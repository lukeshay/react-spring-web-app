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
  rows?: number;
  error?: boolean;
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
  error,
  rows,
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
    error={helpText !== "" && error}
    rows={rows}
    multiline={rows !== undefined && rows > 1}
  />
);

Input.defaultProps = {
  error: true,
  fullWidth: true,
  helpText: "",
  id: "",
  name: "",
  placeholder: ""
};

export default Input;
