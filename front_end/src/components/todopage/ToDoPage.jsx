import React, { useState, useEffect } from "react";
import ToDoList from "./ToDoList.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import toDoStore from "../../stores/toDoStore";
import userStore from "../../stores/userStore";
import {
    loadUsersToDos,
    saveToDo,
    deleteToDo
} from "../../actions/toDo/toDoActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ToDoPage() {
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [toDos, setToDos] = useState([]);
    const [newToDo, setNewToDo] = useState({
        text: "",
        completed: false
    });
    const [key, setKey] = useState(Math.random() * 10000);
    const [currentUser, setCurrentUser] = useState(userStore.getUser());

    useEffect(() => {
        toDoStore.addChangeListener(onToDoChange);
        userStore.addChangeListener(onUserChange);

        if (currentUser.email && toDoStore.getToDos().length === 0) {
            loadUsersToDos(currentUser.uid);
        } else if (currentUser.email) {
            onToDoChange();
        }

        setLoading(false);

        return () => {
            toDoStore.removeChangeListener(onToDoChange);
            userStore.removeChangeListener(onUserChange);
        };
    }, []);

    useEffect(() => {
        if (!adding && newToDo.text !== "") {
            saveToDo(newToDo);
            toast.success("ToDo saved.");

            setNewToDo({
                userId: currentUser.uid,
                text: "",
                completed: false
            });
        }
    }, [adding, newToDo]);

    async function onToDoChange() {
        setToDos(toDoStore.getToDos());
        setKey(Math.random() * 10000);
    }

    async function onUserChange() {
        setCurrentUser(userStore.getUser());

        if (currentUser.email && toDoStore.getToDos().length === 0) {
            loadUsersToDos(currentUser.uid);
            setLoading(false);
        }

        setKey(Math.random() * 10000);
    }

    async function onCheckboxChange({ target }) {
        var toDoToUpdate = toDos.find(toDo => toDo.id === target.name);
        toDoToUpdate.completed = !toDoToUpdate.completed;
        saveToDo(toDoToUpdate);
    }

    async function onDeleteButtonClick({ target }) {
        deleteToDo(target.id);
    }

    async function onAddClick() {
        setAdding(!adding);
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
    } else if (!currentUser || !currentUser.uid) {
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
