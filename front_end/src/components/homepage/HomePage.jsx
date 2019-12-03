import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { version } from "../../../package.json";

const HomePage = () => {
    return (
        <div className="jumbotron-fluid">
            <h1>Luke Shay's Productivity App</h1>
            <h2>Planned Features (not limited to)</h2>
            <ul>
                <li>ToDo list</li>
                <li>Note taking</li>
                <li>Google Calendar integration</li>
                <li>Gmail integration</li>
                <li>Version: {version}</li>
            </ul>
        </div>
    );
};

export default HomePage;
