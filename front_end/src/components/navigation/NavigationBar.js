import React from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default class NavigationBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-dark">
                <NavLink exact to="/" className="nav-item text-white">Home</NavLink>
                <NavLink to="/items" className="nav-item text-white">Items</NavLink>
                <NavLink to="/reminders" className="nav-item text-white">Reminders</NavLink>
                <NavLink to="/todo" className="nav-item text-white">Todo</NavLink>
                <NavLink to="/calendar" className="nav-item text-white">Calendar</NavLink>
                <NavLink to="/email" className="nav-item text-white">Email</NavLink>
                <NavLink to="/account" className="nav-item text-white">Account</NavLink>
            </nav>
        );
    }
}
