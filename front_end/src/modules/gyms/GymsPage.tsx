import React from "react";
import { useHistory } from "react-router-dom";
import GymEditPage from "./views/GymEditPage";
import GymPage from "./views/GymPage";
import GymsList from "./views/GymsList";

const GymsPage: React.FC = () => {
  const history = useHistory();

  const urlSplit = history.location.pathname.split("/");

  const last = urlSplit.pop();
  const view = urlSplit.pop();

  if (!last || last === "gyms" || last.length === 0) {
    return <GymsList />;
  } else if (view === "edit") {
    return <GymEditPage />;
  } else {
    return <GymPage />;
  }
};

export default React.memo(GymsPage);
