import React from "react";
import TodoItem from "./TodoItem";
import todosData from "./data/todosData";
import "./todo.css"

export default class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            loading: true,
            todos: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // const todos = fetch("http://localhost:5000/todo/thisuserid");

        this.setState(prevState => {
            return {
                loading: false,
                todos: todosData
            };
        });
    }

    handleChange(id) {
        this.setState(prevState => {
            const updatedTodos = prevState.todos.map(todo => {
                return todo.id === id ? {...todo, completed: !todo.completed} : todo;
            });

            return {todos: updatedTodos};
        });
    }

    render() {
        if (this.state.loading) {
            return <h1>Loading...</h1>
        }
        else {
            const items = this.state.todos.map(item =>
                <TodoItem key={item.id} item={item} handleChange={this.handleChange}/>
            );

            return (
                <div className="todo-list">
                    {items}
                </div>
            );
        }
    }
}