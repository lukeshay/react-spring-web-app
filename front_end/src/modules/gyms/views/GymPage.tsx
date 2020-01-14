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
import RouteEditPage from "./RouteEditPage";
import RoutesList from "./RoutesList";
import WallList from "./WallList";
import WallEditPage from "./WallEditPage";

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
  const [wall, setWall] = React.useState<Wall | undefined>(undefined);
  const [routes, setRoutes] = React.useState<Route[]>([]);
  const [route, setRoute] = React.useState<Route | undefined>(undefined);
  const [canEdit, setCanEdit] = React.useState<boolean>(false);
  const [wallId, setWallId] = React.useState<string>("");
  const [openAdd, setOpenAdd] = React.useState<boolean>(false);
  const [openEdit, setOpenEdit] = React.useState<boolean>(false);

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

      const wall = tempGym.walls
        ? tempGym.walls.find((element: Wall) => element.id === wallId)
        : null;

      if (wall) {
        setRoutes(wall.routes);
        setWallId(wall.id);
      }

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
    const tempWall = gym.walls
      ? gym.walls.find((element: Wall) => element.id === rowWallId)
      : null;

    if (tempWall) {
      setWalls(false);
      setRoutes(tempWall.routes);
      setWallId(tempWall.id);
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
        }
      });
    } else {
      toast.error("Error deleting route.");
    }
  };

  const handleEditRoute = async (tempRoute: Route) => {
    setRoute(tempRoute);
    setOpenEdit(true);
    setOpenAdd(false);
  };

  const handleEditWall = async (tempWall: Wall) => {
    setWall(tempWall);
    setOpenEdit(true);
    setOpenAdd(false);
  };

  const handleOpenAdd = async () => {
    setOpenAdd(true);
    setOpenEdit(false);
  };

  const handleCloseAdd = async () => setOpenAdd(false);

  const handleCloseEdit = async () => {
    setOpenEdit(false);
    setRoute(undefined);
    setWall(undefined);
  };

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
            onClick={handleOpenAdd}
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
            onEditClick={handleEditWall}
          />
        ) : (
          <RoutesList
            routes={routes}
            canEdit={canEdit}
            handleEditRoute={handleEditRoute}
            handleDeleteRoute={handleDeleteRoute}
          />
        )}
      </div>
      {gymId && (
        <RouteAddPage
          open={!walls && openAdd}
          handleClose={handleCloseAdd}
          gymId={gymId}
          wallId={wallId}
        />
      )}
      {gymId && route && (
        <RouteEditPage
          open={!walls && openEdit}
          handleClose={handleCloseEdit}
          gymId={gymId}
          wallId={wallId}
          route={route}
        />
      )}
      {gymId && wall && (
        <WallEditPage
          open={walls && openEdit}
          handleClose={handleCloseEdit}
          gymId={gymId}
          wall={wall}
        />
      )}
    </React.Fragment>
  );
};

export default React.memo(GymPage);
