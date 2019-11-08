import React from "react";
import TodoItem from "./todo/TodoItem";
import todosData from "./todo/data/todosData";
import "bootstrap/dist/css/bootstrap.min.css";

export default class TodoPage extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: true,
            adding: false,
            todos: []
        };
        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    async componentDidMount() {
        this.setState({ todos: todosData, loading: false });
    }

    onCheckboxChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                return todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo;
            });

            return { todos: updatedTodos };
        });
    }

    onDeleteButtonClick(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.filter(item => item.id !== id);
            return { todos: updatedTodos };
        });
    }

    onAddClick() {
        if (!this.state.adding) {
            this.setState({
                adding: true
            });
        } else {
            // postToServer
            this.setState(prevState => {
                const updatedTodos = prevState.todos;
                updatedTodos.push({
                    id: 10,
                    text: this.state.newTodo,
                    completed: false
                });

                return {
                    todos: updatedTodos,
                    adding: false
                };
            });
        }
    }

    onInputChange(event) {
        const { name, value } = event;
        this.setState({ newTodo: value });
    }

    render() {
        const items = this.state.todos.map(item => (
            <TodoItem
                key={item.id}
                item={item}
                handleCheckboxChange={this.onCheckboxChange}
                handleDeleteButtonClick={this.onDeleteButtonClick}
            />
        ));

        if (this.state.loading) {
            return <h1>Loading...</h1>;
        } else {
            return (
                <div className="col-lg-12">
                    <div className="card px-3">
                        <div className="card-body">
                            <h4 className="card-title text-center">
                                Todo list
                            </h4>
                            <div className="list-wrapper">
                                <ul className="todo-list">{items}</ul>
                            </div>
                            {this.state.adding ? (
                                <input
                                    type="text"
                                    name="newTodo"
                                    value={this.state.newTodo}
                                    onChange={this.onInputChange}
                                />
                            ) : (
                                <></>
                            )}

                            <button className="" onClick={this.onAddClick}>
                                Add Todo
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
