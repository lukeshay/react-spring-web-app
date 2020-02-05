import {
  Card,
  CardContent,
  CardMedia,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  Typography
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import Table from "../../common/table/Table";
import Input from "../../common/inputs/Input";
import { useViewContext } from "../../../context/view/viewStore";

const useStyles = makeStyles(() =>
  createStyles({
    div: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "100%"
    },
    card: {
      borderRadius: "10px",
      height: "233px",
      width: "700px",
      display: "flex"
    },
    cardWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      paddingBottom: "10px",
      paddingTop: "10px",
      width: "100%"
    },
    information: {
      paddingBottom: "5px",
      paddingLeft: "10px",
      paddingTop: "5px"
    },
    photo: {
      borderRadius: "10px",
      height: "96%"
    },
    photoWrapper: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      width: "50%"
    },
    root: {
      width: "100%"
    },
    search: {
      width: "50%"
    },
    searchMobile: {
      width: "96%"
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
  const history = useHistory();

  return (
    <div className={classes.cardWrapper}>
      <Card
        className={classes.card}
        onClick={(): void => history.push(Routes.GYMS + "/" + gym.id)}
      >
        <CardMedia className={classes.photoWrapper}>
          <img
            src={"https://" + gym.photoUrl}
            alt="This gym does not have a photo."
            className={classes.photo}
          />
        </CardMedia>
        <CardContent>
          <Typography variant="h4">{gym.name}</Typography>
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
    </div>
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

interface IGymsListProps {
  gyms: Gym[];
  mobile: boolean;
}

const GymsList: React.FC<IGymsListProps> = ({ gyms, mobile }): JSX.Element => (
  <React.Fragment>
    {gyms.map((gym) => {
      return mobile ? (
        <GymCardMobile key={gym.id} gym={gym} />
      ) : (
        <GymCard key={gym.id} gym={gym} />
      );
    })}
  </React.Fragment>
);

const GymsPage: React.FC = (): JSX.Element => {
  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: viewState } = useViewContext();

  const [search, setSearch] = React.useState<string>("");

  const classes = useStyles();

  const loadGyms = (): void => {
    if (gymsState.gyms.length === 0) {
      GymsActions.loadGymsQuery(gymsDispatch, "").then((response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error getting gyms.");
        }
      });
    }
  };

  React.useEffect(() => {
    loadGyms();
  }, []);

  const searchClass = (): string => {
    return viewState.mobile ? classes.searchMobile : classes.search;
  };

  const handleKeyPress = (event: any): void => {
    if (event.key === "Enter") {
      GymsActions.loadGymsQuery(gymsDispatch, search).then((response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error getting gyms.");
        }
      });
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.div}>
        <Input
          className={searchClass()}
          type="text"
          id="search"
          placeholder="Search"
          fullWidth={false}
          onChange={(event: any): void => {
            setSearch(event.target.value);
          }}
          value={search}
          name="search"
          onKeyPress={handleKeyPress}
        />
      </div>
      <GymsList gyms={gymsState.gyms} mobile={viewState.mobile} />
    </div>
  );
};

export default React.memo(GymsPage);
