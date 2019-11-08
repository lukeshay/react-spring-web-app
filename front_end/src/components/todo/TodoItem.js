import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoItem = props => {
    const completedStyle = {
        textDecoration: "line-through"
    };

    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <input
                        className="checkbox"
                        type="checkbox"
                        checked={props.item.completed}
                        onChange={() =>
                            props.handleCheckboxChange(props.item.id)
                        }
                    />
                </div>
            </div>
            <span
                className="form-control"
                style={props.item.completed ? completedStyle : {}}
            >
                {props.item.text}
            </span>
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <button
                        name={props.item.id}
                        className="close"
                        aria-label="Close"
                        onClick={() =>
                            props.handleDeleteButtonClick(props.item.id)
                        }
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoItem;
