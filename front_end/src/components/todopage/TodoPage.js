import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import todoStore from "../../stores/todoStore";
import { loadTodos, saveTodo, deleteTodo } from "../../actions/todoActions";
import { toast } from "react-toastify";

function TodoPage() {
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        text: "",
        completed: false
    });
    const [key, setKey] = useState(Math.random() * 10000);

    useEffect(() => {
        todoStore.addChangeListener(onChange);
        if (todoStore.getTodos().length === 0) {
            loadTodos();
            setLoading(false);
        }
        return () => todoStore.removeChangeListener(onChange);
    }, []);

    useEffect(() => {
        if (!adding && newTodo.text !== "") {
            saveTodo(newTodo);
            toast.success("Todo saved.");

            setNewTodo({
                text: "",
                completed: false
            });
        }
    }, [adding, newTodo]);

    async function onChange() {
        setTodos(todoStore.getTodos());

        setKey(Math.random() * 10000);
    }

    async function onCheckboxChange({ target }) {
        var todoToUpdate = todos.find(
            todo => todo.id === parseInt(target.name)
        );
        todoToUpdate.completed = !todoToUpdate.completed;
        saveTodo(todoToUpdate);
    }

    async function onDeleteButtonClick({ target }) {
        deleteTodo(target.name);
    }

    async function onAddClick() {
        setAdding(!adding);
    }

    async function onInputChange({ target }) {
        const { value } = target;
        setNewTodo({ ...newTodo, text: value });
    }

    async function handleKeyPress({ target, key }) {
        if (key === "Enter" && target.name === "newTodo") {
            setAdding(false);
        }
    }

    if (loading) {
        return <h1>Loading...</h1>;
    } else {
        return (
            <div className="col-lg-12">
                <div className="card px-3">
                    <div className="card-body">
                        <h4 className="card-title text-center">Todo list</h4>
                        <TodoList
                            key={key}
                            todos={todos}
                            onCheckboxChange={onCheckboxChange}
                            onDeleteButtonClick={onDeleteButtonClick}
                        />
                        {adding && (
                            <input
                                autoFocus
                                type="text"
                                className="form-control"
                                name="newTodo"
                                style={{ marginBottom: "5px" }}
                                value={newTodo.text}
                                onChange={onInputChange}
                                onKeyPress={handleKeyPress}
                            />
                        )}
                        <div class="col text-center">
                            <button
                                className="btn btn-secondary"
                                name="add"
                                onClick={onAddClick}
                            >
                                Add Todo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoPage;
