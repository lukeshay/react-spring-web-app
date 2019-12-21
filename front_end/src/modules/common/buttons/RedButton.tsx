import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import Button from "./Button";

export interface IPropsRedButton {
  id?: string;
  bootstrap?: string;
  text: string;
  handleClick?(event: React.MouseEvent<HTMLElement>): void;
}

const RedButton: React.SFC<IPropsRedButton> = (props: IPropsRedButton) => {
  return (
    <Button
      id={props.id}
      bootstrap={"btn-danger " + props.bootstrap}
      text={props.text}
      handleClick={props.handleClick}
    />
  );
};

RedButton.defaultProps = {
  bootstrap: "",
  id: ""
};

export default RedButton;
