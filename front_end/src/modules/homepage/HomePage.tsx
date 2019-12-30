import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="jumbotron-fluid">
      <h1>Climbing Routes Rating</h1>
      <h2>
        Web application for gyms to post their routes and customers to rate
        them.
      </h2>
    </div>
  );
};

export default React.memo(HomePage);
