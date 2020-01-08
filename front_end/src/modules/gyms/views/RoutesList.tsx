import { TableCell, TableRow } from "@material-ui/core";
import * as React from "react";
import { Route } from "../../../types";
import Table from "../../common/table/Table";

export interface IRouteRowProps {
  route: Route;
}

const RouteRow: React.FC<IRouteRowProps> = ({ route }) => (
  <TableRow hover id={route.id}>
    <TableCell>{route.name}</TableCell>
    <TableCell>{route.types}</TableCell>
    <TableCell>{route.setter}</TableCell>
    <TableCell>{route.holdColor}</TableCell>
    <TableCell>{route.averageGrade}</TableCell>
    <TableCell>{route.averageRating}</TableCell>
  </TableRow>
);

export interface IRoutesListProps {
  routes: Route[];
}

const RoutesList: React.FunctionComponent<IRoutesListProps> = ({ routes }) => (
  <Table
    head={
      <React.Fragment>
        <TableCell>Name</TableCell>
        <TableCell>Types</TableCell>
        <TableCell>Setter</TableCell>
        <TableCell>Color</TableCell>
        <TableCell>Grade</TableCell>
        <TableCell>Rating</TableCell>
      </React.Fragment>
    }
    body={
      routes &&
      routes.map((route: Route) => <RouteRow key={route.id} route={route} />)
    }
  />
);

export default RoutesList;
