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
    <TableCell>{wall.routes ? wall.routes.length : 0}</TableCell>
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
        <TableRow>
          <TableCell key="wall">Wall</TableCell>
          <TableCell key="routes">Routes</TableCell>
          <TableCell key="type">Type</TableCell>
        </TableRow>
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
