import React from "react";
import { useHistory } from "react-router-dom";
import GymInformation from "./views/GymInformation";
import GymsTable from "./views/GymsTable";

const GymsPage: React.FC = () => {
  const history = useHistory();

  const last = history.location.pathname
    .split("/")
    .slice(-1)
    .pop();

  if (!last || last.trim() === "gyms" || last.trim().length === 0) {
    return <GymsTable />;
  } else {
    return <GymInformation gymId={last} />;
  }
};

export default React.memo(GymsPage);
