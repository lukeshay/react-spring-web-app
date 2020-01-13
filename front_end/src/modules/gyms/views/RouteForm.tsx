import React from "react";
import { Route } from "../../../types";

export interface IRouteFormProps {
  route: Route;
  formHead: React.ReactNode;
  submitButtonText: string;
  handleSubmit(route: Route): Promise<void> | void;
}

const RouteForm: React.FunctionComponent<IRouteFormProps> = ({
  route,
  handleSubmit
}) => {
  const [name, setName] = React.useState<string>(route.name);
  const [setter, setSetter] = React.useState<string>(route.setter);
  const [types, setTypes] = React.useState<string[]>(route.types);
  const [holdColor, setHoldColor] = React.useState<string>(route.holdColor);
  const [gymId, setGymId] = React.useState<string>(route.gymId);
  const [wallId, setWallId] = React.useState<string>(route.wallId);

  return;
};

export default RouteForm;
