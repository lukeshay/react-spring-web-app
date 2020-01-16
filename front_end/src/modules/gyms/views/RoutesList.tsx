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
import { Route } from "../../../types";
import * as GradeUtils from "../../../utils/gradeUtils";
import Table from "../../common/table/Table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      paddingRight: theme.spacing(1)
    }
  })
);

export interface IRouteRowProps {
  canEdit: boolean;
  route: Route;
  onDeleteClick(routeId: string): Promise<void> | void;
  onEditClick(route: Route): Promise<void> | void;
  onRowClick(route: Route): Promise<void> | void;
}

const RouteRow: React.FC<IRouteRowProps> = ({
  canEdit,
  route,
  onDeleteClick,
  onEditClick,
  onRowClick
}): JSX.Element => {
  const classes = useStyles();

  const { averageGrade, holdColor, id, name, averageRating, setter } = route;

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
    <TableRow
      hover
      id={id}
      onClick={(): void | Promise<void> => onRowClick(route)}
    >
      <TableCell>{name}</TableCell>
      <TableCell>{types}</TableCell>
      <TableCell>{setter}</TableCell>
      <TableCell>{holdColor}</TableCell>
      <TableCell>
        {averageGrade && GradeUtils.convertGradeToString(averageGrade)}
      </TableCell>
      <TableCell>
        {averageRating > 0 && Math.round(averageRating * 10) / 10}
      </TableCell>
      {canEdit && (
        <TableCell>
          <Button
            onClick={(): void | Promise<void> => onEditClick(route)}
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
            onClick={(): void | Promise<void> => onDeleteClick(id)}
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
  handleDeleteRoute(routeId: string): Promise<void> | void;
  handleEditRoute(route: Route): Promise<void> | void;
  handleRowClick(route: Route): Promise<void> | void;
}

const RoutesList: React.FC<IRoutesListProps> = ({
  canEdit,
  routes,
  handleDeleteRoute,
  handleEditRoute,
  handleRowClick
}): JSX.Element => (
  <Table
    head={
      <TableRow>
        <TableCell key="route">Route</TableCell>
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
          canEdit={canEdit}
          key={route.id}
          route={route}
          onDeleteClick={handleDeleteRoute}
          onEditClick={handleEditRoute}
          onRowClick={handleRowClick}
        />
      ))
    }
  />
);

export default RoutesList;
