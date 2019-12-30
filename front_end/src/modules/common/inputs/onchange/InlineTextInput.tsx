import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Input from "./Input";

export interface IPropsInlineTextInput {
  label: string;
  id: string;
  helpText?: string;
  value: string;
  handleChange(event: any): void;
}

const InlineTextInput: React.FC<IPropsInlineTextInput> = (
  props: IPropsInlineTextInput
) => {
  return (
    <div className="form-group row">
      <label className="col-sm-2 col-form-label" htmlFor={props.id}>
        {props.label}
      </label>
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

InlineTextInput.defaultProps = {
  helpText: ""
};

export default React.memo(InlineTextInput);
