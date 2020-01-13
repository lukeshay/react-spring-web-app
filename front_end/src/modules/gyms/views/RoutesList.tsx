import { TableCell, TableHead, TableRow } from "@material-ui/core";
import React from "react";
import { Route } from "../../../types";
import Table from "../../common/table/Table";

export interface IRouteRowProps {
  route: Route;
}

const RouteRow: React.FC<IRouteRowProps> = ({ route }) => {
  let types = "";

  route.types.forEach((value) => {
    if (types.length !== 0) {
      types += ", ";
    }

    if (value === "LEAD") {
      types += "Lead";
    }

    if (value === "TOP_ROPE") {
      types += "Top rope";
    }

    if (value === "BOULDER") {
      types += "Boulder";
    }

    if (value === "AUTO_BELAY") {
      types += "Auto belay";
    }
  });

  return (
    <TableRow hover id={route.id}>
      <TableCell>{route.name}</TableCell>
      <TableCell>{types}</TableCell>
      <TableCell>{route.setter}</TableCell>
      <TableCell>{route.holdColor}</TableCell>
      <TableCell>{route.averageGrade}</TableCell>
      <TableCell>{route.averageRating}</TableCell>
    </TableRow>
  );
};

export interface IRoutesListProps {
  canEdit: boolean;
  routes: Route[];
}

const RoutesList: React.FC<IRoutesListProps> = ({ routes, canEdit }) => (
  <Table
    head={
      <TableRow>
        <TableCell key="name">Name</TableCell>
        <TableCell key="types">Types</TableCell>
        <TableCell key="setter">Setter</TableCell>
        <TableCell key="color">Color</TableCell>
        <TableCell key="grade">Grade</TableCell>
        <TableCell key="rating">Rating</TableCell>
      </TableRow>
    }
    body={
      routes &&
      routes.map((route: Route) => <RouteRow key={route.id} route={route} />)
    }
  />
);

export default RoutesList;
