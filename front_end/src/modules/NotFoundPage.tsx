import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <Typography variant="h2">Page Not Found</Typography>
      <Typography>
        <Link to="/">Back to Home</Link>
      </Typography>
    </React.Fragment>
  );
};

export default NotFoundPage;
