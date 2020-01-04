import * as React from "react";
import { Wall } from "../../../types";
import { useHistory } from "react-router";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "../../common/table/Table";

export interface IWallRowProps {
  wall: Wall;
}

const WallRow: React.FC<IWallRowProps> = ({ wall }) => (
  <TableRow hover onClick={() => {}}>
    <TableCell>{wall.name}</TableCell>
    <TableCell>{wall.routes}</TableCell>
  </TableRow>
);

export interface IWallListProps {
  walls: Wall[];
}

const WallList: React.FunctionComponent<IWallListProps> = ({ walls }) => {
  return (
    <Table
      body={walls.map((wall: Wall) => (
        <WallRow key={wall.id} wall={wall} />
      ))}
    />
  );
};

export default WallList;
