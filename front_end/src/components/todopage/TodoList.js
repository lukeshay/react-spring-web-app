import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoList(props) {
    const completedStyle = {
        textDecoration: "line-through"
    };

    return (
        <table className="table">
            <thead>
                <tr className="table-secondary">
                    <th>Completed</th>
                    <th>Text</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {props.todos.map(todo => (
                    <tr key={todo.id}>
                        <td>
                            <input
                                type="checkbox"
                                name={todo.id}
                                checked={todo.completed}
                                onChange={props.onCheckboxChange}
                            />
                        </td>
                        <td style={todo.completed ? completedStyle : {}}>
                            {todo.text}
                        </td>
                        <td>
                            <button
                                className="btn btn btn-danger"
                                name={todo.id}
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

export default TodoList;
