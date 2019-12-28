import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="jumbotron-fluid">
      <h1>Luke Shay's Productivity App</h1>
      <h2>Planned Features (not limited to)</h2>
      <ul>
        <li>ToDo list</li>
        <li>Note taking</li>
        <li>Google Calendar integration</li>
        <li>Gmail integration</li>
      </ul>
    </div>
  );
};

export default React.memo(HomePage);
