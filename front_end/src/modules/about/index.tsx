import { Typography } from "@material-ui/core";
import React from "react";

const AboutPage: React.FC = (): JSX.Element => {
  return (
    <React.Fragment>
      <Typography variant="h3">About This Web Application</Typography>
      <Typography variant="h4">Favicon Credit</Typography>
      <Typography>
        <a
          href="
    https://www.iconfinder.com/icons/310343/climbing_sport_icon"
        >
          https://www.iconfinder.com/icons/310343/climbing_sport_icon
        </a>
      </Typography>
    </React.Fragment>
  );
};

export default React.memo(AboutPage);
