import React, { useState } from "react";
import NavigationBar from "./components/navigation/NavigationBar.jsx";
import HomePage from "./components/homepage/HomePage.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import ToDoPage from "./components/todopage/ToDoPage.jsx";
import ProfilePage from "./components/profile/ProfilePage.jsx";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { version } from "../package.json";

function App() {
    const [load, setLoad] = useState(process.env.NODE_ENV === "development");

    function handleClick() {
        const enteredName = prompt("Please enter the super secret password");

        setLoad(enteredName === process.env.LOAD_PASSWORD);
    }

    if (load === true) {
        return (
            <div className="container-fluid">
                <ToastContainer autoClose={3000} hideProgressBar />
                <NavigationBar />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/index" component={HomePage} />
                    <Route path="/todo" component={ToDoPage} />
                    <Route path="/profile" component={ProfilePage} />
                    <Route component={NotFoundPage} />
                </Switch>
                Version: {version}
            </div>
        );
    } else {
        return (
            <>
                <h1>Hello summoners</h1>
                <input
                    type="button"
                    value="load web app"
                    onClick={handleClick}
                />
            </>
        );
    }
}

export default App;
