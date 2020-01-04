import React from "react";
import { ToDo } from "../../types";
import Button from "../common/buttons/ButtonPrimary";
import Table from "./Table";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

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
              <Button
                id={toDo.id}
                onClick={() => handleDeleteButtonClick(toDo.id)}
                fullWidth={false}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
};

export default ToDoList;
