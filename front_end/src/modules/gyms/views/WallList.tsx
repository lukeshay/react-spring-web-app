import { Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import AddIcon from "@material-ui/icons/Add";
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
  onRowClick(wallId: string): Promise<void>;
}

const WallRow: React.FC<IWallRowProps> = ({ wall, onRowClick, canEdit }) => {
  const classes = useStyles();

  return (
    <TableRow hover id={wall.id} onClick={() => onRowClick(wall.id)}>
      <TableCell>{wall.name}</TableCell>
      <TableCell>{wall.routes ? wall.routes.length : 0}</TableCell>
      <TableCell>{wall.types}</TableCell>
      {canEdit && (
        <TableCell>
          <Button
            component={Link}
            to={AuthRoutes.EDIT_WALL + "/" + wall.id}
            variant="contained"
            fullWidth={false}
            size="medium"
            type="button"
          >
            <EditIcon className={classes.icons} />
            Edit
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
}

const WallList: React.FC<IWallListProps> = ({ walls, onRowClick, canEdit }) => {
  return (
    <Table
      head={
        <TableRow>
          <TableCell key="wall">Wall</TableCell>
          <TableCell key="routes">Routes</TableCell>
          <TableCell key="type">Type</TableCell>
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
          />
        ))
      }
    />
  );
};

export default WallList;
