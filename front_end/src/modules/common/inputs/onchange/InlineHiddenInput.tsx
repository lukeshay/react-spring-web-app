import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Input from "./Input";

export interface IPropsInlineHiddenInput {
  label: string;
  id: string;
  helpText?: string;
  value: string;
  handleChange(event: any): void;
}

const InlineHiddenInput: React.FC<IPropsInlineHiddenInput> = (
  props: IPropsInlineHiddenInput
) => {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label" htmlFor={props.id}>
        {props.label}
      </label>
      <Input
        type="password"
        id={props.id}
        value={props.value}
        handleChange={props.handleChange}
        helpText={props.helpText}
      />
    </div>
  );
};

InlineHiddenInput.defaultProps = {
  helpText: ""
};

export default InlineHiddenInput;
