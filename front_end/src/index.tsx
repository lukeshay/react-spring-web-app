import React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { GymsStore } from "./context/gyms/gymsStore";
import { UserStore } from "./context/user/userStore";
import StoreCombiner from "./StoreCombiner";

ReactDOM.render(
  <StoreCombiner stores={[UserStore, GymsStore]}>
    <Router>
      <App />
    </Router>
  </StoreCombiner>,
  document.getElementById("root")
);
