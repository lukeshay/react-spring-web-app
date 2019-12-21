import { useState, useEffect } from "react";
import * as React from "react";
import ToDoList from "./ToDoList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import toDoStore from "../../stores/toDoStore";
import userStore from "../../stores/userStore";
import {
  loadUsersToDos,
  saveToDo,
  deleteToDo
} from "../../actions/toDo/toDoActions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ToDoPage() {
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [newToDo, setNewToDo] = useState({});
  const [key, setKey] = useState(Math.random() * 10000);
  const [currentUser, setCurrentUser] = useState(userStore.getUser());

  useEffect(() => {
    toDoStore.addChangeListener(onToDoChange);
    userStore.addChangeListener(onUserChange);

    if (currentUser.email && toDoStore.getToDos().length === 0) {
      loadUsersToDos(currentUser.userId);
      setNewToDo({
        userId: currentUser.userId,
        text: "",
        completed: false
      });
    } else if (currentUser.email) {
      onToDoChange();
    }

    setLoading(false);

    return () => {
      toDoStore.removeChangeListener(onToDoChange);
      userStore.removeChangeListener(onUserChange);
    };
  }, []);

  async function onToDoChange() {
    setToDos(toDoStore.getToDos());
    setKey(Math.random() * 10000);
  }

  async function onUserChange() {
    setCurrentUser(userStore.getUser());

    if (currentUser.email) {
      loadUsersToDos(currentUser.userId);
      setLoading(false);
    }

    setKey(Math.random() * 10000);
  }

  async function onCheckboxChange({ target }) {
    var toDoToUpdate = toDos.find((toDo) => toDo.id === target.id);
    toDoToUpdate.completed = !toDoToUpdate.completed;
    saveToDo(toDoToUpdate);
  }

  async function onDeleteButtonClick({ target }) {
    deleteToDo(target.id);
  }

  async function onAddClick() {
    if (adding && newToDo.text !== "") {
      const response = await saveToDo(newToDo);

      if (response.status === 200) {
        setNewToDo({
          userId: currentUser.userId,
          text: "",
          completed: false
        });
        setAdding(false);
      } else {
        toast.error("There was an error saving your to-do.");
      }
    } else {
      setAdding(!adding);
    }
  }

  async function onInputChange({ target }) {
    const { value } = target;
    setNewToDo({ ...newToDo, text: value });
  }

  async function handleKeyPress({ target, key }) {
    if (key === "Enter" && target.name === "newToDo") {
      setAdding(false);
    }
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
              onCheckboxChange={onCheckboxChange}
              onDeleteButtonClick={onDeleteButtonClick}
            />
            {adding && (
              <input
                autoFocus
                type="text"
                className="form-control"
                name="newToDo"
                style={{ marginBottom: "5px" }}
                value={newToDo.text}
                onChange={onInputChange}
                onKeyPress={handleKeyPress}
              />
            )}
            <div className="col text-center">
              <button
                className="btn btn-secondary"
                name="add"
                onClick={onAddClick}
              >
                Add ToDo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoPage;
