import React from "react";
import * as ReactRouter from "react-router";
import { Gym } from "../../../types";

const GymEditPage: React.FunctionComponent = () => {
  const history = ReactRouter.useHistory();
  const [gymId] = React.useState<string | undefined>(
    history.location.pathname
      .split("/")
      .splice(-1)
      .pop()
  );

  return <div>Editing {gymId}</div>;
};

export default GymEditPage;
