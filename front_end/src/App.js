import React from 'react';
import './App.css';
import NavigationBar from "./components/navigation/NavigationBar.js";
import Todo from "./components/todo/Todo";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        return (
            <div className="App">
                <NavigationBar />
                <Todo />
            </div>
        );
    }
}
