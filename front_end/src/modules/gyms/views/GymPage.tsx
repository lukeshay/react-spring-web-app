import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { GymsContext } from "../../../context/gyms/gymsStore";
import { UserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import { Gym, Route, Wall } from "../../../types";
import GymInformation from "./GymInformation";
import RoutesList from "./RoutesList";
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

export interface IGymPageProps {
  gymId: string;
}

const GymPage: React.FC<IGymPageProps> = ({ gymId }) => {
  const gymsContext = useContext(GymsContext);
  const gymsState = gymsContext.state;
  const gymsDispatch = gymsContext.dispatch;
  const userContext = useContext(UserContext);
  const userState = userContext.state;
  const userDispatch = userContext.dispatch;
  const [gym, setGym] = useState<Gym>({} as Gym);
  const [walls, setWalls] = useState<boolean>(true);
  const [routes, setRoutes] = useState<Route[]>([]);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const tempGym = gymsState.gyms
      .filter((element) => element.id === gymId)
      .pop();

    if (!tempGym) {
      history.push(Routes.GYMS);
    } else if (!tempGym.walls) {
      loadFullGym();
    }
  }, []);

  useEffect(() => {
    const tempGym = gymsState.gyms
      .filter((element) => element.id === gymId)
      .pop();
    if (tempGym && tempGym !== gym) {
      setGym(tempGym);
    }
  }, [gymsState]);

  const loadFullGym = () => {
    GymsActions.loadGymV2(gymsDispatch, gymId).then((response: Response) => {
      if (!response || !(response instanceof Response) || !response.ok) {
        toast.error("Error getting gym.");
      }
    });
  };

  if (!gym) {
    return <h3>Cannot find the gym you are looking for.</h3>;
  }

  const onWallRowClick = async (wallId: string) => {
    const wall = gym.walls
      ? gym.walls.find((element: Wall) => element.id === wallId)
      : null;

    if (wall && (!wall.routes || wall.routes.length === 0 || !wall.routes[0])) {
      GymsActions.loadGymV2(gymsDispatch, gymId);
    } else if (wall) {
      setWalls(false);
      setRoutes(wall.routes);
    } else {
      toast.error("Could not find wall.");
    }
  };

  return (
    <React.Fragment>
      <GymInformation gym={gym} />
      <div
        className={classes.wallList}
        style={{
          display: !gym.walls || gym.walls.length === 0 ? "none" : "block"
        }}
      >
        {walls ? (
          <WallList walls={gym.walls} onRowClick={onWallRowClick} />
        ) : (
          <div>
            <div className={classes.buttonWrapper}>
              <Button
                variant="text"
                fullWidth={false}
                size="medium"
                type="button"
                onClick={() => setWalls(true)}
              >
                <ArrowBackIcon className={classes.backIcon} />
                Back
              </Button>
            </div>
            <RoutesList routes={routes} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default GymPage;
