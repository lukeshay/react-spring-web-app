import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import Button from "./Button";

export interface IPropsBlueButton {
  id?: string;
  bootstrap?: string;
  text: string;
  handleClick?(event: React.MouseEvent<HTMLElement>): void;
}

const BlueButton: React.SFC<IPropsBlueButton> = (props: IPropsBlueButton) => {
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

export default BlueButton;
