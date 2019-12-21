import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import Button from "./Button";

export interface IPropsBlueOutlineButton {
  id?: string;
  bootstrap?: string;
  text: string;
  handleClick?(event: React.MouseEvent<HTMLElement>): void;
}

const BlueOutlineButton: React.SFC<IPropsBlueOutlineButton> = (
  props: IPropsBlueOutlineButton
) => {
  return (
    <Button
      id={props.id}
      bootstrap={"btn-outline-primary " + props.bootstrap}
      text={props.text}
      handleClick={props.handleClick}
    />
  );
};

BlueOutlineButton.defaultProps = {
  bootstrap: "",
  id: ""
};

export default BlueOutlineButton;
