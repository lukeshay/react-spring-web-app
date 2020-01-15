import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { Route } from "../../../types";
import Table from "../../common/table/Table";

interface IGymPageRowProps {
  label: React.ReactNode;
  text: React.ReactNode;
}

const RatingPageRow: React.FC<IGymPageRowProps> = ({
  label,
  text
}): JSX.Element => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell>{text}</TableCell>
  </TableRow>
);

export interface IRatingPageProps {
  route: Route;
}

const RatingPage: React.FunctionComponent<IRatingPageProps> = ({
  route
}): JSX.Element => {
  const { name, grade, rating, setter, holdColor } = route;
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
    <Table
      body={[
        <RatingPageRow key="route" label="Route" text={name} />,
        <RatingPageRow key="type" label="Type" text={types} />,
        <RatingPageRow key="setter" label="Setter" text={setter} />,
        <RatingPageRow key="color" label="Route" text={holdColor} />,
        <RatingPageRow key="grade" label="Average Grade" text={grade} />,
        <RatingPageRow key="rating" label="Average Rating" text={rating} />
      ]}
    />
  );
};

export default RatingPage;
