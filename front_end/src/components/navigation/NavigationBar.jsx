import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavigationBar = () => (
    <div style={{ paddingBottom: "15px" }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light  sticky-top shadow rounded fixed-top">
            <ul className="navbar-nav mr-auto">
                <li
                    className="nav-item"
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                >
                    <NavLink exact to="/" className="nav-link">
                        Home
                    </NavLink>
                </li>
                <li
                    className="nav-item"
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                >
                    <NavLink to="/items" className="nav-link">
                        Items
                    </NavLink>
                </li>
                <li
                    className="nav-item"
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                >
                    <NavLink to="/todo" className="nav-link">
                        ToDo
                    </NavLink>
                </li>
                <li
                    className="nav-item"
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                >
                    <NavLink to="/calendar" className="nav-link">
                        Calendar
                    </NavLink>
                </li>
                <li
                    className="nav-item"
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                >
                    <NavLink to="/email" className="nav-link">
                        Email
                    </NavLink>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li
                    className="nav-item"
                    style={{ marginRight: "15px", marginLeft: "15px" }}
                >
                    <NavLink to="/profile" className="nav-link">
                        Profile
                    </NavLink>
                </li>
            </ul>
        </nav>
    </div>
);

export default NavigationBar;
