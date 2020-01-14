import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { AuthRoutes, Routes } from "../../../routes";
import { Gym, Route, Wall } from "../../../types";
import { shouldBeVisible, shouldDisplay } from "../../../utils/styleUtils";
import GymInformation from "./GymInformation";
import RouteAddPage from "./RouteAddPage";
import RoutesList from "./RoutesList";
import WallList from "./WallList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    addButton: {
      position: "absolute",
      right: "10px"
    },
    buttonWrapper: {
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1)
    },
    icons: {
      paddingRight: theme.spacing(1)
    },
    wallList: {
      marginTop: theme.spacing(2)
    }
  })
);

const GymPage: React.FC = () => {
  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: userState } = useUserContext();

  const [gym, setGym] = React.useState<Gym>({} as Gym);
  const [walls, setWalls] = React.useState<boolean>(true);
  const [routes, setRoutes] = React.useState<Route[]>([]);
  const [canEdit, setCanEdit] = React.useState<boolean>(false);
  const [wallId, setWallId] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const classes = useStyles();
  const history = useHistory();
  const [gymId] = React.useState<string | undefined>(
    history.location.pathname
      .split("/")
      .splice(-1)
      .pop()
  );

  React.useEffect(() => {
    const tempGym = gymsState.gyms
      .filter((element) => element.id === gymId)
      .pop();

    if (!tempGym) {
      history.push(Routes.GYMS);
    } else if (!tempGym.walls) {
      loadFullGym();
    }
  }, []);

  React.useEffect(() => {
    const tempGym = gymsState.gyms
      .filter((element) => element.id === gymId)
      .pop();

    if (tempGym) {
      setGym(tempGym);

      const { user } = userState;
      const { authorizedEditors } = tempGym;

      if (
        user &&
        authorizedEditors &&
        authorizedEditors.find((editorId: string) => editorId === user.userId)
      ) {
        setCanEdit(true);
      } else {
        setCanEdit(false);
      }
    }
  }, [gymsState]);

  const loadFullGym = () => {
    if (gymId) {
      GymsActions.loadGymV2(gymsDispatch, gymId).then((response: Response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error getting gym.");
        }
      });
    }
  };

  const onWallRowClick = async (rowWallId: string) => {
    const wall = gym.walls
      ? gym.walls.find((element: Wall) => element.id === rowWallId)
      : null;

    if (wall) {
      setWalls(false);
      setRoutes(wall.routes);
      setWallId(wall.id);
    } else {
      toast.error("Could not find wall.");
    }
  };

  const handleDeleteWall = async (rowWallId: string) => {
    if (gymId) {
      GymsActions.deleteWall(gymsDispatch, rowWallId, gymId).then(
        (response: Response) => {
          if (!response || !(response instanceof Response) || !response.ok) {
            toast.error("Error deleting wall.");
          }
        }
      );
    } else {
      toast.error("Error deleting wall.");
    }
  };

  const handleDeleteRoute = async (routeId: string) => {
    if (gymId) {
      GymsActions.deleteRoute(
        gymsDispatch,
        { id: routeId, gymId } as Route,
        gymId
      ).then((response: Response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error deleting route.");
        } else {
          const newRoutes: Route[] = [];

          routes.forEach(
            (element) => element.id !== routeId && newRoutes.push(element)
          );

          setRoutes(newRoutes);
        }
      });
    } else {
      toast.error("Error deleting route.");
    }
  };

  const handleOpen = async () => setOpen(true);

  const handleClose = async () => setOpen(false);

  return (
    <React.Fragment>
      <GymInformation gym={gym} canEdit={canEdit} />
      <div
        className={classes.wallList}
        style={shouldDisplay((gym.walls && gym.walls.length !== 0) || canEdit)}
      >
        <div className={classes.buttonWrapper}>
          <Button
            variant="text"
            fullWidth={false}
            size="medium"
            type="button"
            onClick={() => {
              setWalls(true);
              setWallId("");
            }}
            style={shouldBeVisible(!walls)}
          >
            <ArrowBackIcon className={classes.icons} />
            Back
          </Button>
          <Button
            onClick={handleOpen}
            className={classes.addButton}
            variant="text"
            fullWidth={false}
            size="medium"
            type="button"
            style={shouldBeVisible(canEdit)}
          >
            <AddIcon className={classes.icons} />
            Add
          </Button>
        </div>
        {walls ? (
          <WallList
            walls={gym.walls}
            onRowClick={onWallRowClick}
            canEdit={canEdit}
            handleDeleteWall={handleDeleteWall}
          />
        ) : (
          <RoutesList
            routes={routes}
            canEdit={canEdit}
            onDeleteClick={handleDeleteRoute}
          />
        )}
      </div>
      {gymId && (
        <RouteAddPage
          open={!walls && open}
          handleClose={handleClose}
          gymId={gymId}
          wallId={wallId}
        />
      )}
    </React.Fragment>
  );
};

export default React.memo(GymPage);
