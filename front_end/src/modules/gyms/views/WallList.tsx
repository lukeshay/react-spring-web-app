import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Link } from "react-router-dom";
import { AuthRoutes } from "../../../routes";
import { Gym, Wall } from "../../../types";
import Table from "../../common/table/Table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icons: {
      paddingRight: theme.spacing(1)
    }
  })
);

export interface IWallRowProps {
  wall: Wall;
  canEdit: boolean;
  onRowClick(wallId: string): Promise<void> | void;
  onDeleteClick(wallId: string): Promise<void> | void;
}

const WallRow: React.FC<IWallRowProps> = ({
  wall,
  onRowClick,
  canEdit,
  onDeleteClick
}) => {
  const classes = useStyles();
  const { id, routes, name } = wall;

  let types = "";

  wall.types.forEach((value) => {
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
    <TableRow hover id={id} onClick={() => onRowClick(id)}>
      <TableCell>{name}</TableCell>
      <TableCell>{routes ? routes.length : 0}</TableCell>
      <TableCell>{types}</TableCell>
      {canEdit && (
        <TableCell>
          <Button
            component={Link}
            to={AuthRoutes.EDIT_WALL + "/" + id}
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
            onClick={() => onDeleteClick(id)}
          >
            <DeleteIcon className={classes.icons} />
            Delete
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

export interface IWallListProps {
  walls: Wall[] | null;
  canEdit: boolean;
  onRowClick(wallId: string): Promise<void>;
  handleDeleteWall(wallId: string): Promise<void>;
}

const WallList: React.FC<IWallListProps> = ({
  walls,
  onRowClick,
  canEdit,
  handleDeleteWall
}) => {
  return (
    <Table
      head={
        <TableRow>
          <TableCell key="wall">Wall</TableCell>
          <TableCell key="routes">Routes</TableCell>
          <TableCell key="type">Type</TableCell>
          {canEdit && <TableCell key="edit">Edit</TableCell>}
          {canEdit && <TableCell key="delete">Delete</TableCell>}
        </TableRow>
      }
      body={
        walls &&
        walls.map((wall: Wall) => (
          <WallRow
            key={wall.id}
            wall={wall}
            onRowClick={onRowClick}
            canEdit={canEdit}
            onDeleteClick={handleDeleteWall}
          />
        ))
      }
    />
  );
};

export default WallList;
