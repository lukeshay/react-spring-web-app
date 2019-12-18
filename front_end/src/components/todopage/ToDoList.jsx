import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import RedButton from "../common/buttons/RedButton.jsx";

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
                id={toDo.id}
                checked={toDo.completed}
                onChange={props.onCheckboxChange}
              />
            </td>
            <td style={toDo.completed ? completedStyle : {}}>{toDo.text}</td>
            <td>{toDo.dueDate}</td>
            <td>
              <RedButton
                text="Delete"
                id={toDo.id}
                handleClick={props.onDeleteButtonClick}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ToDoList;
