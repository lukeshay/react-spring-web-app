import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Input from "./Input";

export interface IPropsInlineHiddenInput {
  label?: string;
  id: string;
  helpText?: string;
  placeHolder?: string;
  value: string;
  handleChange(event: any): void;
}

const InlineHiddenInput: React.FC<IPropsInlineHiddenInput> = (
  props: IPropsInlineHiddenInput
) => {
  return (
    <div className="form-group row">
      {props.label && (
        <label className="col-sm-2 col-form-label" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      <Input
        type="password"
        id={props.id}
        value={props.value}
        handleChange={props.handleChange}
        helpText={props.helpText}
        placeholder={props.placeHolder && props.placeHolder}
      />
    </div>
  );
};

InlineHiddenInput.defaultProps = {
  helpText: ""
};

export default React.memo(InlineHiddenInput);
