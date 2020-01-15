import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import { Gym, Route, Wall } from "../../../types";
import { shouldBeVisible, shouldDisplay } from "../../../utils/styleUtils";
import GymInformation from "./GymInformation";
import RouteAddPage from "./RouteAddPage";
import RouteEditPage from "./RouteEditPage";
import RoutesList from "./RoutesList";
import WallAddPage from "./WallAddPage";
import WallEditPage from "./WallEditPage";
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

const GymPage: React.FC = (): JSX.Element => {
  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: userState } = useUserContext();

  const [gym, setGym] = React.useState<Gym>({} as Gym);
  const [view, setView] = React.useState<"WALL" | "ROUTE" | "RATING">("WALL");
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

      const tempWall = tempGym.walls
        ? tempGym.walls.find((element: Wall) => element.id === wallId)
        : null;

      if (tempWall) {
        setRoutes(tempWall.routes);
        setWallId(tempWall.id);
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

  const loadFullGym = (): void => {
    if (gymId) {
      GymsActions.loadGymV2(gymsDispatch, gymId).then((response: Response) => {
        if (!response || !(response instanceof Response) || !response.ok) {
          toast.error("Error getting gym.");
        }
      });
    }
  };

  const handleWallRowClick = async (rowWallId: string): Promise<void> => {
    const tempWall = gym.walls
      ? gym.walls.find((element: Wall) => element.id === rowWallId)
      : null;

    if (tempWall) {
      setView("ROUTE");
      setRoutes(tempWall.routes);
      setWallId(tempWall.id);
    } else {
      toast.error("Could not find wall.");
    }
  };

  const handleDeleteWall = async (rowWallId: string): Promise<void> => {
    if (
      window.confirm(
        "Are you sure you want to delete this wall? This action cannot be undone."
      )
    ) {
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
    }
  };

  const handleRouteRowClick = async (route: Route): Promise<void> => {
    console.log(route);
  };

  const handleDeleteRoute = async (routeId: string): Promise<void> => {
    if (
      window.confirm(
        "Are you sure you want to delete this route? This action cannot be undone."
      )
    ) {
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
    }
  };

  const handleEditRoute = async (tempRoute: Route): Promise<void> => {
    setRoute(tempRoute);
    setOpenEdit(true);
    setOpenAdd(false);
  };

  const handleEditWall = async (tempWall: Wall): Promise<void> => {
    setWall(tempWall);
    setOpenEdit(true);
    setOpenAdd(false);
  };

  const handleOpenAdd = async (): Promise<void> => {
    setOpenAdd(true);
    setOpenEdit(false);
  };

  const handleCloseAdd = async (): Promise<void> => setOpenAdd(false);

  const handleCloseEdit = async (): Promise<void> => {
    setOpenEdit(false);
    setRoute(undefined);
    setWall(undefined);
  };

  const Buttons: React.FC = (): JSX.Element => (
    <div className={classes.buttonWrapper}>
      <Button
        variant="text"
        fullWidth={false}
        size="medium"
        type="button"
        onClick={(): void => {
          setView("WALL");
          setWallId("");
        }}
        style={shouldBeVisible(view !== "WALL")}
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
  );

  const CurrentView: React.FC = (): JSX.Element => {
    if (view === "WALL") {
      return (
        <WallList
          walls={gym.walls}
          onRowClick={handleWallRowClick}
          canEdit={canEdit}
          handleDeleteWall={handleDeleteWall}
          handleEditClick={handleEditWall}
        />
      );
    }

    if (view === "ROUTE") {
      return (
        <RoutesList
          canEdit={canEdit}
          routes={routes}
          handleDeleteRoute={handleDeleteRoute}
          handleEditRoute={handleEditRoute}
          handleRowClick={handleRouteRowClick}
        />
      );
    }

    if (view === "RATING") {
      return <div>YEET</div>;
    }

    return <React.Fragment />;
  };

  return (
    <React.Fragment>
      <GymInformation gym={gym} canEdit={canEdit} />
      <div
        className={classes.wallList}
        style={shouldDisplay((gym.walls && gym.walls.length !== 0) || canEdit)}
      >
        <Buttons />
        <CurrentView />
      </div>
      {gymId && route && (
        <RouteEditPage
          open={view === "ROUTE" && openEdit}
          handleClose={handleCloseEdit}
          gymId={gymId}
          wallId={wallId}
          route={route}
        />
      )}
      {gymId && (
        <WallAddPage
          open={view === "WALL" && openAdd}
          handleClose={handleCloseAdd}
          gymId={gymId}
        />
      )}
      {gymId && wall && (
        <WallEditPage
          open={view === "WALL" && openEdit}
          handleClose={handleCloseEdit}
          gymId={gymId}
          wall={wall}
        />
      )}
    </React.Fragment>
  );
};

export default React.memo(GymPage);
