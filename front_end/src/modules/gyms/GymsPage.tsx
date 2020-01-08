import React from "react";
import { useHistory } from "react-router-dom";
import GymInformation from "./views/GymInformation copy";
import GymsList from "./views/GymsList";

const GymsPage: React.FC = () => {
  const history = useHistory();

  const last = history.location.pathname
    .split("/")
    .slice(-1)
    .pop();

  if (!last || last.trim() === "gyms" || last.trim().length === 0) {
    return <GymsList />;
  } else {
    return <GymInformation gymId={last} />;
  }
};

export default React.memo(GymsPage);
