import {
  Button,
  Card,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  Theme,
  Typography
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthRoutes, Routes } from "../../../routes";
import { Gym } from "../../../types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    card: {
      display: "flex"
    },
    content: {
      flex: "1 0 auto"
    },
    editButton: {
      position: "absolute",
      right: "10px"
    },
    icons: {
      paddingRight: theme.spacing(1)
    },
    information: {
      paddingLeft: theme.spacing(2)
    },
    photo: {
      width: "100%"
    },
    photoWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "50%"
    }
  })
);

const useMobileStyles = makeStyles(() =>
  createStyles({
    card: {
      borderRadius: "5px"
    },
    photo: {
      borderRadius: "10px",
      height: "96%"
    },
    photoWrapper: {
      alignItems: "center",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      width: "100%"
    }
  })
);

interface IGymCardProps {
  gym: Gym;
}

const GymCard: React.FC<IGymCardProps> = ({ gym }): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.photoWrapper}>
        <img
          src={"https://" + gym.photoUrl}
          alt="This gym does not have a photo."
          className={classes.photo}
        />
      </CardMedia>
      <CardContent className={classes.content}>
        <Typography variant="h2">{gym.name}</Typography>
        <div className={classes.information}>
          <Typography variant="body1">{gym.website}</Typography>
          <Typography variant="body1">
            {gym.address}
            <br />
            {gym.city + ", " + gym.state + " " + gym.zipCode}
          </Typography>
          <Typography variant="body1">{gym.email}</Typography>
          <Typography variant="body1">{gym.phoneNumber}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const GymCardMobile: React.FC<IGymCardProps> = ({ gym }): JSX.Element => {
  const classes = useMobileStyles();
  const history = useHistory();

  return (
    <div onClick={(): void => history.push(Routes.GYMS + "/" + gym.id)}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.photoWrapper}
          style={{
            height: `${window.innerWidth * (2 / 3) - 10}px`
          }}
        >
          <img
            className={classes.photo}
            src={"https://" + gym.photoUrl}
            alt="This gym does not have a photo."
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h4">{gym.name}</Typography>
          <div>
            <Typography variant="body1">{gym.website}</Typography>
            <Typography variant="body1">
              {gym.address}
              <br />
              {gym.city + ", " + gym.state + " " + gym.zipCode}
            </Typography>
            <Typography variant="body1">{gym.email}</Typography>
            <Typography variant="body1">{gym.phoneNumber}</Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export interface IGymInformationProps {
  gym: Gym;
  canEdit: boolean;
  mobile: boolean;
}

const GymInformation: React.FunctionComponent<IGymInformationProps> = ({
  gym,
  canEdit,
  mobile
}): JSX.Element => {
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
      {mobile ? <GymCardMobile gym={gym} /> : <GymCard gym={gym} />}
    </React.Fragment>
  );
};

export default GymInformation;
