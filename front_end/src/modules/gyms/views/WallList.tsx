import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { Wall } from "../../../types";
import Table from "../../common/table/Table";

export interface IWallRowProps {
  wall: Wall;
  onRowClick(wallId: string): Promise<void>;
}

const WallRow: React.FC<IWallRowProps> = ({ wall, onRowClick }) => (
  <TableRow hover id={wall.id} onClick={() => onRowClick(wall.id)}>
    <TableCell>{wall.name}</TableCell>
    <TableCell>{wall.routes.length}</TableCell>
    <TableCell>{wall.type}</TableCell>
  </TableRow>
);

export interface IWallListProps {
  walls: Wall[] | null;
  onRowClick(wallId: string): Promise<void>;
}

const WallList: React.FC<IWallListProps> = ({ walls, onRowClick }) => {
  return (
    <Table
      head={
        <React.Fragment>
          <TableCell>Wall</TableCell>
          <TableCell>Routes</TableCell>
          <TableCell>Type</TableCell>
        </React.Fragment>
      }
      body={
        walls &&
        walls.map((wall: Wall) => (
          <WallRow key={wall.id} wall={wall} onRowClick={onRowClick} />
        ))
      }
    />
  );
};

export default WallList;
