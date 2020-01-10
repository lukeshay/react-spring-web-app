import {
  Button,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import * as React from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import Table from "../../common/table/Table";

interface IGymPageRowProps {
  label: React.ReactNode;
  text: React.ReactNode;
}

const GymPageRow: React.FC<IGymPageRowProps> = ({ label, text }) => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell>{text}</TableCell>
  </TableRow>
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backIcon: {
      paddingRight: theme.spacing(1)
    },
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    }
  })
);

export interface IGymInformationProps {
  gym: Gym;
}

const GymInformation: React.FunctionComponent<IGymInformationProps> = ({
  gym
}) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.buttonWrapper}>
        <Button
          component={Link}
          to={Routes.GYMS}
          variant="text"
          fullWidth={false}
          size="medium"
          type="button"
        >
          <ArrowBackIcon className={classes.backIcon} />
          Back
        </Button>
      </div>
      <Table
        body={[
          <GymPageRow key="name" label="Name" text={gym.name} />,
          <GymPageRow key="website" label="Website" text={gym.website} />,
          <GymPageRow
            key="address"
            label="Address"
            text={
              gym.address +
              "\n" +
              gym.city +
              ", " +
              gym.state +
              " " +
              gym.zipCode
            }
          />,
          <GymPageRow key="email" label="Email" text={gym.email} />,
          <GymPageRow
            key="phoneNumber"
            label="Phone Number"
            text={gym.phoneNumber}
          />
        ]}
      />
    </React.Fragment>
  );
};

export default GymInformation;
