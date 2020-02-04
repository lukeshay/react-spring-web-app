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
      height: "200px",
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
    content: {},
    information: {
      paddingLeft: "10px"
    },
    photo: {
      width: "90%"
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

interface IGymCardProps {
  gym: Gym;
}

const GymCard: React.FC<IGymCardProps> = ({ gym }): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div
      className={classes.cardWrapper}
      onClick={(): void => history.push(Routes.GYMS + "/" + gym.id)}
    >
      <Card className={classes.card}>
        <CardMedia className={classes.photoWrapper}>
          <img
            src={"https://" + gym.logoUrl}
            alt="This gym does not have a photo."
            className={classes.photo}
          />
        </CardMedia>
        <CardContent className={classes.content}>
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

interface IGymsListProps {
  gyms: Gym[];
}

const GymsList: React.FC<IGymsListProps> = ({ gyms }): JSX.Element => (
  <React.Fragment>
    {gyms.map((gym) => (
      <GymCard key={gym.id} gym={gym} />
    ))}
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
      <GymsList gyms={gymsState.gyms} />
    </div>
  );
};

export default React.memo(GymsPage);
