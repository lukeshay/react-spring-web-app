import React from "react";

interface IPropsInput {
  helpText?: string;
  id?: string;
  name?: string;
  type: string;
  value: string;
  handleChange(event: any): void;
}

const Input: React.FC<IPropsInput> = (props: IPropsInput) => {
  const { helpText, id, name, type, value, handleChange } = props;

  return (
    <div className="col-sm-10">
      <input
        className="form-control"
        id={id}
        name={name}
        onChange={handleChange}
        type={type}
        value={value}
      />
      <small id={id + "Help"} className="form-text text-danger">
        {helpText}
      </small>
    </div>
  );
};

Input.defaultProps = {
  helpText: "",
  id: "",
  name: ""
};

export default React.memo(Input);
