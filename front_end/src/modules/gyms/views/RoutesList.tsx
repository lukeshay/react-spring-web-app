import {
  Button,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../../../routes";
import { Route } from "../../../types";
import Table from "../../common/table/Table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      paddingRight: theme.spacing(1)
    }
  })
);

export interface IRouteRowProps {
  route: Route;
  canEdit: boolean;
  onDeleteClick(routeId: string): Promise<void> | void;
}

const RouteRow: React.FC<IRouteRowProps> = ({
  route,
  canEdit,
  onDeleteClick
}) => {
  const classes = useStyles();

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
      {canEdit && (
        <TableCell>
          <Button
            component={Link}
            to={AuthRoutes.EDIT_ROUTE + "/" + route.id + "/" + route.wallId}
            variant="outlined"
            fullWidth={false}
            size="medium"
            type="button"
            color="secondary"
          >
            <EditIcon className={classes.icons} />
            Edit
          </Button>
        </TableCell>
      )}
      {canEdit && (
        <TableCell>
          <Button
            variant="outlined"
            fullWidth={false}
            size="medium"
            type="button"
            color="primary"
            onClick={() => onDeleteClick(route.id)}
          >
            <DeleteIcon className={classes.icons} />
            Delete
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export interface IRoutesListProps {
  canEdit: boolean;
  routes: Route[];
  onDeleteClick(routeId: string): Promise<void> | void;
}

const RoutesList: React.FC<IRoutesListProps> = ({
  routes,
  canEdit,
  onDeleteClick
}) => (
  <Table
    head={
      <TableRow>
        <TableCell key="name">Name</TableCell>
        <TableCell key="types">Types</TableCell>
        <TableCell key="setter">Setter</TableCell>
        <TableCell key="color">Color</TableCell>
        <TableCell key="grade">Grade</TableCell>
        <TableCell key="rating">Rating</TableCell>
        {canEdit && <TableCell key="edit">Edit</TableCell>}
        {canEdit && <TableCell key="delete">Delete</TableCell>}
      </TableRow>
    }
    body={
      routes &&
      routes.map((route: Route) => (
        <RouteRow
          key={route.id}
          route={route}
          canEdit={canEdit}
          onDeleteClick={onDeleteClick}
        />
      ))
    }
  />
);

export default RoutesList;
