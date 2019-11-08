import React from 'react';
import NavigationBar from "./components/navigation/NavigationBar.js";
import TodoPage from "./components/TodoPage";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
    }

    render() {
        return (
            <div className="container-fluid" >
                <NavigationBar />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/todo" component={TodoPage} />>
                </Switch>
            </div>
        );
    }
}
