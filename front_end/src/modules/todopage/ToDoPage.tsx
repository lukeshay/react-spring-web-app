import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import {
  deleteToDo,
  loadUsersToDos,
  saveToDo
} from "../../state/toDo/toDoActions";
import toDoStore from "../../state/toDo/toDoStore";
import userStore from "../../state/user/userStore";
import { ButtonEvent, InputEvent, ToDo, User } from "../../types";
import ToDoList from "./ToDoList";

const ToDoPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [adding, setAdding] = useState<boolean>(false);
  const [toDos, setToDos] = useState<ToDo[]>([]);
  const [newToDo, setNewToDo] = useState<ToDo>({} as ToDo);
  const [key, setKey] = useState<number>(Math.random() * 10000);
  const [currentUser, setCurrentUser] = useState<User>(userStore.getUser());

  useEffect(() => {
    toDoStore.addChangeListener(onToDoChange);
    userStore.addChangeListener(onUserChange);

    if (currentUser.email && toDoStore.getToDos().length === 0) {
      loadUsersToDos(currentUser.userId);
      setNewToDo({
        completed: false,
        text: "",
        userId: currentUser.userId
      } as ToDo);
    } else if (currentUser.email) {
      onToDoChange();
    }

    setLoading(false);

    return () => {
      toDoStore.removeChangeListener(onToDoChange);
      userStore.removeChangeListener(onUserChange);
    };
  }, []);

  async function onToDoChange(): Promise<void> {
    setToDos(toDoStore.getToDos());
    setKey(Math.random() * 10000);
  }

  async function onUserChange(): Promise<void> {
    setCurrentUser(userStore.getUser());

    if (currentUser.email) {
      loadUsersToDos(currentUser.userId);
      setLoading(false);
    }

    setKey(Math.random() * 10000);
  }

  async function handleCheckboxChange({ target }: InputEvent): Promise<void> {
    const toDoToUpdate = toDos.find((toDo) => toDo.id === target.id);

    if (toDoToUpdate) {
      saveToDo({ ...toDoToUpdate, completed: toDoToUpdate.completed } as ToDo);
    }
  }

  async function handleDeleteButtonClick({
    target
  }: ButtonEvent): Promise<void> {
    deleteToDo(target.id);
  }

  async function handleAddClick() {
    if (adding && newToDo.text !== "") {
      const response = await saveToDo(newToDo);

      if (response instanceof Response && response.status === 200) {
        setNewToDo({
          completed: false,
          text: "",
          userId: currentUser.userId
        } as ToDo);

        setAdding(false);
      }
    } else {
      setAdding(!adding);
    }
  }

  async function handleInputChange({ target }: InputEvent): Promise<void> {
    const { value } = target;
    setNewToDo({ ...newToDo, text: value });
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else if (!currentUser || !currentUser.userId) {
    return (
      <h1>
        Please <Link to="profile">Sign In</Link>
      </h1>
    );
  } else {
    return (
      <div className="col-lg-12">
        <div className="card px-3">
          <div className="card-body">
            <h4 className="card-title text-center">ToDo list</h4>
            <ToDoList
              key={key}
              toDos={toDos}
              handleCheckboxChange={handleCheckboxChange}
              handleDeleteButtonClick={handleDeleteButtonClick}
            />
            {adding && (
              <input
                autoFocus={true}
                type="text"
                className="form-control"
                name="newToDo"
                style={{ marginBottom: "5px" }}
                value={newToDo.text}
                onChange={handleInputChange}
              />
            )}
            <div className="col text-center">
              <button
                className="btn btn-secondary"
                name="add"
                onClick={handleAddClick}
              >
                Add ToDo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ToDoPage;
