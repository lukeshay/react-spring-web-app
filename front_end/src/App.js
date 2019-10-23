import React from 'react';
import './App.css';
import NavigationBar from "./components/navigation/NavigationBar.js";

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="App">
                <NavigationBar />
            </div>
        );
    }
}
