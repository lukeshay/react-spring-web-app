import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";

export interface IPropsButton {
  id?: string;
  bootstrap?: string;
  text: string;
  handleClick?(event: any): void;
}

const Button: React.FC<IPropsButton> = (props: IPropsButton) => {
  return (
    <button
      className={"btn " + props.bootstrap}
      id={props.id}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
};

Button.defaultProps = {
  bootstrap: "",
  id: ""
};

export default Button;
