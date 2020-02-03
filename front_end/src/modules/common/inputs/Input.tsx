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
  className?: string;
  onChange?(event: any): void;
  onKeyPress?(even: any): void;
}

const Input: React.FC<IPropsInput> = ({
  helpText,
  id,
  name,
  type,
  value,
  placeholder,
  onChange,
  autoComplete,
  autoCapitalize,
  error,
  rows,
  className,
  fullWidth,
  onKeyPress
}): JSX.Element => (
  <TextField
    id={id}
    className={className}
    type={type}
    label={placeholder}
    name={name}
    variant="outlined"
    margin="normal"
    onChange={onChange}
    value={(value || "").toString()}
    fullWidth={fullWidth}
    autoComplete={autoComplete}
    autoCapitalize={autoCapitalize}
    helperText={helpText}
    error={helpText !== "" && error}
    rows={rows}
    multiline={rows !== undefined && rows > 1}
    onKeyPress={onKeyPress}
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
