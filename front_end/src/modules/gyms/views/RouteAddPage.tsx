import React from "react";
import * as ReactRouter from "react-router";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import * as UrlUtils from "../../../utils/urlUtils";
import RouteForm from "./RouteForm";
import { Route } from "../../../types";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { toast } from "react-toastify";

const RouteAddPage: React.FC = () => {
  const history = ReactRouter.useHistory();

  const [route, setRoute] = React.useState<Route>({} as Route);
  const [wallId, setWallId] = React.useState<string>("");
  const [gymId, setGymId] = React.useState<string>("");
  const [typesMessage, setTypesMessage] = React.useState<string>("");
  const [nameMessage, setNameMessage] = React.useState<string>("");

  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: userState } = useUserContext();

  React.useEffect(() => {
    const { user } = userState;

    const urlWallId = UrlUtils.getLastPathVariable(history.location.pathname);

    const tempGym = gymsState.gyms
      .filter(
        (element) =>
          element.walls &&
          element.walls.filter((elementWall) => elementWall.id === urlWallId)
            .length > 0
      )
      .pop();

    if (
      tempGym &&
      user &&
      tempGym.authorizedEditors &&
      tempGym.authorizedEditors.find(
        (editorId: string) => editorId === user.userId
      ) &&
      tempGym.walls
    ) {
      const tempWall = tempGym.walls
        .filter((element) => element.id === urlWallId)
        .pop();
      setGymId(tempGym.id);

      // Only here to silence warning
      if (tempWall) {
        setWallId(urlWallId);
      }
    } else if (tempGym) {
      history.push(Routes.GYMS + "/" + tempGym.id);
    } else {
      history.push(Routes.GYMS);
    }
  }, []);

  const handleSubmit = async (returnRoute: Route) => {
    const newRoute = { wallId, gymId, ...returnRoute };

    setRoute(newRoute);

    if (newRoute.types.length < 1) {
      setTypesMessage("Must select a type.");
    } else {
      setTypesMessage("");
    }

    if (newRoute.name.trim().length < 1) {
      setNameMessage("Name cannot be blank");
    } else {
      setNameMessage("");
    }

    if (newRoute.types.length > 0 && newRoute.name.trim().length > 0) {
      GymsActions.createRoute(gymsDispatch, newRoute, gymId).then(
        (response: Response) => {
          if (response instanceof Response && response.ok) {
            history.push(Routes.GYMS + "/" + gymId);
          } else {
            toast.error("Error adding route.");
          }
        }
      );
    }
  };

  if (gymId !== "" && wallId !== "") {
    return (
      <RouteForm
        route={route}
        formHeadText="Add route"
        handleCancel={() => history.goBack()}
        handleSubmit={handleSubmit}
        submitButtonText="Add route"
        nameMessage={nameMessage}
        typesMessage={typesMessage}
      />
    );
  } else {
    return <React.Fragment />;
  }
};

export default RouteAddPage;
