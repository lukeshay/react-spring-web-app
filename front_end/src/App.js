import React from "react";
import NavigationBar from "./components/navigation/NavigationBar.js";
import HomePage from "./components/homepage/HomePage";
import NotFoundPage from "./components/NotFoundPage";
import TodoPage from "./components/todopage/TodoPage";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="container-fluid">
            <ToastContainer autoClose={3000} hideProgressBar />
            <NavigationBar />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/index" component={HomePage} />
                <Route path="/todo" component={TodoPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    );
}

export default App;
