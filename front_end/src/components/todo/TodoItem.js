import React from 'react';
import "./todoItem.css";

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        const completedStyle = {
            textDecoration: "line-through"
        };

        return (
            <div className="todo-item">
                <input type="checkbox"
                       checked={this.props.item.completed}
                       onChange={() => this.props.handleChange(this.props.item.id)}
                />
                <p style={this.props.item.completed ? completedStyle: null}>
                    {this.props.item.text}
                </p>
            </div>
        );
    }
}