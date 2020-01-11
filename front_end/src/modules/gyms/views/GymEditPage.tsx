import React from "react";
import { Gym } from "../../../types";

export interface IGymEditPageProps {
  gymId: string;
}

const GymEditPage: React.FunctionComponent<IGymEditPageProps> = ({ gymId }) => {
  return <div>Editing {gymId}</div>;
};

export default GymEditPage;
