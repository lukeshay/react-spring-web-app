import React, { useState, Suspense } from "react";
import NavigationBar from "./components/navigation/NavigationBar.jsx";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { lazy } from "@loadable/component";

const HomePage = lazy(() => import("./components/homepage/HomePage.jsx"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage.jsx"));
const ToDoPage = lazy(() => import("./components/todopage/ToDoPage.jsx"));
const ProfilePage = lazy(() => import("./components/profile/ProfilePage.jsx"));

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
                <Suspense fallback={<div></div>}>
                    <Switch>
                        <Route exact path="/" component={HomePage} />
                        <Route exact path="/index" component={HomePage} />
                        <Route path="/todo" component={ToDoPage} />
                        <Route path="/profile" component={ProfilePage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </Suspense>
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
