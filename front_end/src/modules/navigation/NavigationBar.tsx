import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { NavLink } from "react-router-dom";

interface IPropsNavItem {
  link: string;
  text: string;
}

const NavItem: React.FC<IPropsNavItem> = (props: IPropsNavItem) => {
  const { link, text } = props;
  return (
    <li
      className="nav-item"
      style={{ marginRight: "15px", marginLeft: "15px" }}
    >
      <NavLink to={link} className="nav-link">
        {text}
      </NavLink>
    </li>
  );
};

const NavigationBar: React.FC = () => (
  <div style={{ paddingBottom: "15px" }}>
    <nav className="navbar navbar-expand-lg navbar-light bg-light  sticky-top shadow rounded fixed-top">
      <ul className="navbar-nav mr-auto">
        <NavItem link="/" text="Home" />
        <NavItem link="/items" text="Items" />
        <NavItem link="/todo" text="ToDo" />
        <NavItem link="/calendar" text="Calendar" />
        <NavItem link="/email" text="Email" />
      </ul>
      <ul className="navbar-nav">
        <NavItem link="/profile" text="Profile" />
      </ul>
    </nav>
  </div>
);

export default NavigationBar;
