import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function ToDoList(props) {
    const completedStyle = {
        textDecoration: "line-through"
    };

    return (
        <table className="table">
            <thead>
                <tr className="table-secondary">
                    <th>Completed</th>
                    <th>Text</th>
                    <th>Due</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.toDos.map(toDo => (
                    <tr key={toDo.id}>
                        <td>
                            <input
                                type="checkbox"
                                name={toDo.id}
                                checked={toDo.completed}
                                onChange={props.onCheckboxChange}
                            />
                        </td>
                        <td style={toDo.completed ? completedStyle : {}}>
                            {toDo.text}
                        </td>
                        <td>{toDo.dueDate}</td>
                        <td>
                            <button
                                className="btn btn btn-danger"
                                name={toDo.id}
                                onClick={props.onDeleteButtonClick}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ToDoList;
