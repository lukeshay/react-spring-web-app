import React from "react";

interface IPropsInput {
  helpText?: string;
  id: string;
  type: string;
  defaultValue: string;
}

const Input = React.forwardRef<HTMLInputElement, IPropsInput>(
  (
    { helpText, id, type, defaultValue }: IPropsInput,
    ref: React.RefObject<HTMLInputElement>
  ) => {
    return (
      <div className="col-sm-10">
        <input
          className="form-control"
          defaultValue={defaultValue}
          id={id}
          name={name}
          ref={ref}
          type={type}
        />
        <small id={id + "Help"} className="form-text text-danger">
          {helpText}
        </small>
      </div>
    );
  }
);

Input.defaultProps = {
  helpText: ""
};

export default React.memo(Input);
