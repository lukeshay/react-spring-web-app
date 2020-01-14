import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import React from "react";

export interface ISimpleTableProps {
  head?: React.ReactNode;
  body: React.ReactNode[] | null;
}

const SimpleTable: React.FC<ISimpleTableProps> = ({
  head,
  body
}): JSX.Element => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>{head}</TableHead>
        <TableBody>{body}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default SimpleTable;
