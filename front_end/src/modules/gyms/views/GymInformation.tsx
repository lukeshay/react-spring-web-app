import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "../../common/buttons/ButtonDefault";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Routes } from "../../../routes";
import * as GymsActions from "../../../state/gyms/gymsActions";
import gymsStore from "../../../state/gyms/gymsStore";
import { Gym } from "../../../types";
import Table from "../../common/table/Table";

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
  const [gym, setGym] = useState<Gym>({} as Gym);
  const classes = useStyles();

  useEffect(() => {
    gymsStore.addChangeListener(handleGymsChange);

    if (gymsStore.getGyms().length === 0) {
      GymsActions.loadGyms();
    }

    const tempGym = gymsStore
      .getGyms()
      .filter((element) => element.id === gymId)
      .pop();

    if (tempGym) {
      setGym(tempGym);
    }

    return () => gymsStore.removeChangeListener(handleGymsChange);
  }, []);

  async function handleGymsChange(): Promise<void> {
    const tempGym = gymsStore
      .getGyms()
      .filter((element) => element.id === gymId)
      .pop();

    if (tempGym) {
      setGym(tempGym);
    }
  }

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
        >
          <ArrowBackIcon className={classes.backIcon} />
          Back
        </Button>
      </div>
      <Table
        body={[
          <GymInformationRow key="name" label="Gym Name" text={gym.name} />,
          <GymInformationRow
            key="website"
            label="Gym Website"
            text={gym.website}
          />,
          <GymInformationRow
            key="address"
            label="Gym Address"
            text={gym.address + " " + gym.city + ", " + gym.state}
          />,
          <GymInformationRow key="email" label="Gym Email" text={gym.email} />,
          <GymInformationRow
            key="phoneNumber"
            label="Gym Phone Number"
            text={gym.phoneNumber}
          />
        ]}
      />
    </React.Fragment>
  );
};

export default React.memo(GymInformation);
