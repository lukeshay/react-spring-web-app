import { TableCell, TableHead, TableRow } from "@material-ui/core";
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
