import React from "react";
import PropType from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

function BlueButton(props) {
    return (
        <button
            className={"btn btn-outline-primary " + props.bootstrap}
            id={props.id}
            onClick={props.handleClick}
        >
            {props.text}
        </button>
    );
}

BlueButton.propTypes = {
    text: PropType.string.isRequired,
    id: PropType.string,
    handleClick: PropType.func.isRequired,
    bootstrap: PropType.string
};

BlueButton.defaultProps = {
    id: "",
    bootstrap: ""
};

export default BlueButton;
