import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { ToDo } from "../../types";
import RedButton from "../common/buttons/RedButton";
import Table from "../common/table/Table";
import TableBody from "../common/table/TableBody";
import TableHead from "../common/table/TableHead";

export interface IToDoListProps {
  toDos: ToDo[];
  handleCheckboxChange(event: any): void;
  handleDeleteButtonClick(event: any): void;
}

const ToDoList: React.FC<IToDoListProps> = (props: IToDoListProps) => {
  const { toDos, handleCheckboxChange, handleDeleteButtonClick } = props;

  const completedStyle = {
    textDecoration: "line-through"
  };

  return (
    <Table>
      <TableHead>
        <th>Completed</th>
        <th>Text</th>
        <th>Due</th>
        <th>Delete</th>
      </TableHead>
      <TableBody>
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
      </TableBody>
    </Table>
  );
};

export default ToDoList;
