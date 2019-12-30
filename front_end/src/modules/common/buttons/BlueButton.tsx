import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "./Button";

export interface IPropsBlueButton {
  id?: string;
  bootstrap?: string;
  text: string;
  handleClick?(event: any): void;
}

const BlueButton: React.FC<IPropsBlueButton> = (props: IPropsBlueButton) => {
  return (
    <Button
      id={props.id}
      bootstrap={"btn-primary " + props.bootstrap}
      text={props.text}
      handleClick={props.handleClick}
    />
  );
};

BlueButton.defaultProps = {
  bootstrap: "",
  id: ""
};

export default React.memo(BlueButton);
