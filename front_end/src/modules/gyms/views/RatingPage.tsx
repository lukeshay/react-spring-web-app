import { TableCell, TableRow } from "@material-ui/core";
import React from "react";
import * as RouteRatingsApi from "../../../api/routeRatingsApi";
import { Route, RouteRating } from "../../../types";
import Table from "../../common/table/Table";
import { toast } from "react-toastify";

interface IRouteInformationRowProps {
  label: React.ReactNode;
  text: React.ReactNode;
}

const RouteInformationRow: React.FC<IRouteInformationRowProps> = ({
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
  const [ratings, setRatings] = React.useState<RouteRating[]>([]);
  const { id, name, grade, rating, setter, holdColor } = route;
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

  React.useEffect(() => {
    RouteRatingsApi.getRouteRatings(id).then((response: Response) => {
      if (response instanceof Response && response.ok) {
        response.json().then((body: RouteRating[]) => {
          setRatings(body);
        });
      } else {
        toast.error("Error getting ratings.");
      }
    });
  }, []);

  return (
    <Table
      body={[
        <RouteInformationRow key="route" label="Route" text={name} />,
        <RouteInformationRow key="type" label="Type" text={types} />,
        <RouteInformationRow key="setter" label="Setter" text={setter} />,
        <RouteInformationRow key="color" label="Route" text={holdColor} />,
        <RouteInformationRow key="grade" label="Average Grade" text={grade} />,
        <RouteInformationRow
          key="rating"
          label="Average Rating"
          text={rating}
        />
      ]}
    />
  );
};

export default RatingPage;
