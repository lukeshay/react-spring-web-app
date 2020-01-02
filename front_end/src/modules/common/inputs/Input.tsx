import TextField from "@material-ui/core/TextField";
import React from "react";

export interface IPropsInput {
  helpText?: string;
  id?: string;
  name?: string;
  type: string;
  value: string;
  placeholder?: string;
  fullWidth?: boolean;
  handleChange(event: any): void;
}

const Input: React.FC<IPropsInput> = ({
  helpText,
  id,
  name,
  type,
  value,
  placeholder,
  handleChange,
  fullWidth
}) => (
  <React.Fragment>
    <TextField
      id={id}
      type={type}
      label={placeholder}
      name={name}
      variant="outlined"
      margin="normal"
      onChange={handleChange}
      value={value}
      fullWidth={fullWidth}
    />
    <small id={id + "Help"} className="form-text text-danger">
      {helpText}
    </small>
  </React.Fragment>
);

Input.defaultProps = {
  fullWidth: true,
  helpText: "",
  id: "",
  name: "",
  placeholder: ""
};

export default React.memo(Input);
