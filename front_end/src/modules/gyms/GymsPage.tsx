import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import GymsTable from "./views/GymsTable";

const GymsPage: React.FC<RouteComponentProps> = (props) => {
  const last = props.location.pathname
    .split("/")
    .slice(-1)
    .pop();

  if (!last || last.trim() === "gyms" || last.trim().length === 0) {
    return <GymsTable />;
  } else {
    return <div>This is a gym</div>;
  }
};

export default React.memo(withRouter(GymsPage));
