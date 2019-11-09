import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TodoList(props) {
    const completedStyle = {
        textDecoration: "line-through"
    };

    return (
        <table className="table">
            <thead>
                <tr>
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
                                checked={todo.completed}
                                onChange={() => props.onCheckboxChange(todo.id)}
                            />
                        </td>
                        <td style={todo.completed ? completedStyle : {}}>
                            {todo.text}
                        </td>
                        <td>
                            <button
                                className="btn btn btn-danger"
                                name="delete"
                                onClick={() =>
                                    props.onDeleteButtonClick(todo.id)
                                }
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
