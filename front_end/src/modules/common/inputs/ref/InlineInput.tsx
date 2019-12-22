import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Input from "./Input";

export interface IPropsInlineInput {
  defaultValue: string;
  label: string;
  id: string;
  helpText?: string;
  type: string;
}

const InlineInput = React.forwardRef<HTMLInputElement, IPropsInlineInput>(
  (
    { defaultValue, label, id, helpText, type }: IPropsInlineInput,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label" htmlFor={id}>
          {label}
        </label>
        <Input
          defaultValue={defaultValue}
          type={type}
          helpText={helpText}
          id={id}
          ref={ref}
        />
      </div>
    );
  }
);

InlineInput.defaultProps = {
  helpText: ""
};

export default InlineInput;
