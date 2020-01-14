import Typography from "@material-ui/core/Typography";
import React from "react";

const HomePage: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <Typography variant="h2">Climbing Routes Rating</Typography>
      <Typography variant="h3">
        Web application for gyms to post their routes and customers to rate
        them.
      </Typography>
    </React.Fragment>
  );
};

export default HomePage;
