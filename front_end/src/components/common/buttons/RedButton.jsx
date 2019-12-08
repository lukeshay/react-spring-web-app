import React from "react";
import PropType from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

function RedButton(props) {
  return (
    <button
      className={"btn btn btn-danger " + props.bootstrap}
      id={props.id}
      onClick={props.handleClick}
    >
      {props.text}
    </button>
  );
}

RedButton.propTypes = {
  text: PropType.string.isRequired,
  id: PropType.string,
  handleClick: PropType.func,
  bootstrap: PropType.string
};

RedButton.defaultProps = {
  id: "",
  bootstrap: ""
};

export default RedButton;
