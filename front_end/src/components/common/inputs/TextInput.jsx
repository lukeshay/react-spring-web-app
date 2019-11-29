import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

const TextInput = props => {
    return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <input
                className="form-control"
                type="text"
                id={props.id}
                value={props.value}
                onChange={props.handleChange}
            />
        </div>
    );
};

TextInput.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default TextInput;
