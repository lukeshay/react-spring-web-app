import React from "react";
import PropTypes from "prop-types";
import "bootstrap/dist/css/bootstrap.min.css";

function InlineTextInput(props) {
    return (
        <>
            <div className="form-group row">
                <label className="col-sm-2 col-form-label" htmlFor={props.id}>
                    {props.label}
                </label>
                <div className="col-sm-10">
                    <input
                        className="form-control"
                        type="text"
                        id={props.id}
                        value={props.value}
                        onChange={props.handleChange}
                    />
                </div>
            </div>
        </>
    );
}

InlineTextInput.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default InlineTextInput;
