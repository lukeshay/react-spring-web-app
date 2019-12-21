import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Input from "./Input";

export interface IPropsTextInput {
  label: string;
  id: string;
  helpText?: string;
  value: string;
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const TextInput: React.FC<IPropsTextInput> = (props: IPropsTextInput) => {
  return (
    <div className="form-group">
      <label htmlFor={props.id}>{props.label}</label>
      <Input
        type="text"
        id={props.id}
        value={props.value}
        handleChange={props.handleChange}
        helpText={props.helpText}
      />
    </div>
  );
};

TextInput.defaultProps = {
  helpText: ""
};

export default TextInput;
