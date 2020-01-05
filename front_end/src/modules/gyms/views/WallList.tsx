import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import React from "react";
import { Wall } from "../../../types";
import Table from "../../common/table/Table";

export interface IWallRowProps {
  wall: Wall;
}

const WallRow: React.FC<IWallRowProps> = ({ wall }) => (
  <TableRow hover onClick={() => {}}>
    <TableCell>{wall.name}</TableCell>
    <TableCell>{wall.routes && wall.routes}</TableCell>
    <TableCell>{wall.type}</TableCell>
  </TableRow>
);

export interface IWallListProps {
  walls: Wall[] | null;
}

const WallList: React.FunctionComponent<IWallListProps> = ({ walls }) => {
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
        walls.map((wall: Wall) => <WallRow key={wall.id} wall={wall} />)
      }
    />
  );
};

export default WallList;
