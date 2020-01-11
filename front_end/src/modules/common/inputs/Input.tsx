import { createStyles, makeStyles, Theme } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    helpText: {
      color: "#DE0000",
      visibility: "visible"
    }
  })
);

export interface IPropsInput {
  helpText?: string;
  id?: string;
  name?: string;
  type: string;
  value: string;
  placeholder?: string;
  fullWidth?: boolean;
  autoComplete?: string;
  autoCapitalize?: "true" | undefined;
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
  autoComplete,
  autoCapitalize,
  fullWidth
}) => {
  const classes = useStyles();

  return (
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
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
      />
      <small id={id + "Help"} className={classes.helpText}>
        {helpText}
      </small>
    </React.Fragment>
  );
};

Input.defaultProps = {
  fullWidth: true,
  helpText: "",
  id: "",
  name: "",
  placeholder: ""
};

export default Input;
