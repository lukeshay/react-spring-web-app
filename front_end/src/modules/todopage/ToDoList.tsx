import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { ToDo } from "../../types";
import RedButton from "../common/buttons/RedButton";

export interface IPropsToDoList {
  toDos: ToDo[];
  handleCheckboxChange(event: any): void;
  handleDeleteButtonClick(event: any): void;
}

const ToDoList: React.FC<IPropsToDoList> = (props: IPropsToDoList) => {
  const { toDos, handleCheckboxChange, handleDeleteButtonClick } = props;

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
        {toDos.map((toDo) => (
          <tr key={toDo.id}>
            <td>
              <input
                type="checkbox"
                id={toDo.id}
                checked={toDo.completed}
                onChange={handleCheckboxChange}
              />
            </td>
            <td style={toDo.completed ? completedStyle : {}}>{toDo.text}</td>
            <td>{toDo.dueDate}</td>
            <td>
              <RedButton
                text="Delete"
                id={toDo.id}
                handleClick={handleDeleteButtonClick}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ToDoList;
