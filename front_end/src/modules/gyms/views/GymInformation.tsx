import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { GymsContext } from "../../../context/gyms/gymsStore";
import { Routes } from "../../../routes";
import { Gym, Wall } from "../../../types";
import Table from "../../common/table/Table";
import WallList from "./WallList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backIcon: {
      paddingRight: theme.spacing(1)
    },
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    wallList: {
      marginTop: theme.spacing(2)
    }
  })
);

interface IGymInformationRowProps {
  label: string;
  text: string;
}

const GymInformationRow: React.FC<IGymInformationRowProps> = ({
  label,
  text
}) => (
  <TableRow>
    <TableCell>{label}</TableCell>
    <TableCell>{text}</TableCell>
  </TableRow>
);

export interface IGymInformationProps {
  gymId: string;
}

const GymInformation: React.FC<IGymInformationProps> = ({ gymId }) => {
  const { state, dispatch } = useContext(GymsContext);
  const [gym, setGym] = useState<Gym>({} as Gym);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (state.gyms.length === 0) {
      loadGyms();
    }

    const tempGym = state.gyms.filter((element) => element.id === gymId).pop();

    if (!tempGym) {
      history.push(Routes.GYMS);
    } else if (tempGym && !tempGym.walls) {
      GymsActions.loadWalls(dispatch, tempGym);
    }

    if (tempGym) {
      setGym(tempGym);
    }
  }, []);

  const loadGyms = async () => {
    const response = await GymsActions.loadGyms(dispatch);

    if (!response || !(response instanceof Response) || !response.ok) {
      toast.error("Error getting gyms.");
    }
  };

  if (!gym) {
    return <h3>Cannot find the gym you are looking for.</h3>;
  }

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
          <GymInformationRow key="name" label="Name" text={gym.name} />,
          <GymInformationRow
            key="website"
            label="Website"
            text={gym.website}
          />,
          <GymInformationRow
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
          <GymInformationRow key="email" label="Email" text={gym.email} />,
          <GymInformationRow
            key="phoneNumber"
            label="Phone Number"
            text={gym.phoneNumber}
          />
        ]}
      />
      <div
        className={classes.wallList}
        style={{
          display: !gym.walls || gym.walls.length === 0 ? "none" : "block"
        }}
      >
        <WallList walls={gym.walls} />
      </div>
    </React.Fragment>
  );
};

export default React.memo(GymInformation);
