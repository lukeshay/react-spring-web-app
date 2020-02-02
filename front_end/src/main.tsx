import React from "react";
import { GymsStore } from "./context/gyms/gymsStore";
import { UserStore } from "./context/user/userStore";
import { ViewStore } from "./context/view/viewStore";
import StoreCombiner from "./StoreCombiner";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";

const Main: React.FC = () => (
  <StoreCombiner stores={[GymsStore, UserStore, ViewStore]}>
    <Router>
      <App />
    </Router>
  </StoreCombiner>
);

export default Main;
