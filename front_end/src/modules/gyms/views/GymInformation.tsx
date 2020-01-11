import {
  Button,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Theme
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import * as React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/user/userStore";
import { Routes, AuthRoutes } from "../../../routes";
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
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    editButton: {
      position: "absolute",
      right: "10px"
    },
    icons: {
      paddingRight: theme.spacing(1)
    }
  })
);

export interface IGymInformationProps {
  gym: Gym;
}

const GymInformation: React.FunctionComponent<IGymInformationProps> = ({
  gym
}) => {
  const userContext = React.useContext(UserContext);
  const userState = userContext.state;
  const classes = useStyles();
  const [canEdit, setCanEdit] = React.useState<boolean>(false);

  React.useEffect(() => {
    const { user } = userState;
    const { authorizedEditors } = gym;

    if (
      user &&
      authorizedEditors &&
      authorizedEditors.find((editorId: string) => editorId === user.userId)
    ) {
      setCanEdit(true);
    }
  }, [gym]);

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
          <ArrowBackIcon className={classes.icons} />
          Back
        </Button>
        {canEdit && (
          <Button
            component={Link}
            to={AuthRoutes.EDIT_GYM + "/" + gym.id}
            className={classes.editButton}
            variant="text"
            fullWidth={false}
            size="medium"
            type="button"
          >
            <EditIcon className={classes.icons} />
            Edit
          </Button>
        )}
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
