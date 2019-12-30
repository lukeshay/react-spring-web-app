import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import Button from "./Button";

export interface IPropsRedButton {
  id?: string;
  bootstrap?: string;
  text: string;
  handleClick?(event: any): void;
}

const RedButton: React.FC<IPropsRedButton> = (props: IPropsRedButton) => {
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

export default React.memo(RedButton);
