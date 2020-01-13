import React from "react";
import * as ReactRouter from "react-router";
import { toast } from "react-toastify";
import * as GymsActions from "../../../context/gyms/gymsActions";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import { Route } from "../../../types";
import * as GymsUtils from "../../../utils/gymsUtils";
import * as UrlUtils from "../../../utils/urlUtils";
import RouteForm from "./RouteForm";

const RouteEditPage: React.FC = () => {
  const history = ReactRouter.useHistory();

  const [routeId, setRouteId] = React.useState<string>("");
  const [wallId, setWallId] = React.useState<string>("");
  const [gymId, setGymId] = React.useState<string>("");
  const [route, setRoute] = React.useState<Route>({} as Route);
  const [updatedRoute, setUpdatedRoute] = React.useState<Route>({} as Route);
  const [typesMessage, setTypesMessage] = React.useState<string>("");
  const [nameMessage, setNameMessage] = React.useState<string>("");

  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: userState, dispatch: userDispatch } = useUserContext();

  React.useEffect(() => {
    const urlWallId = UrlUtils.getLastPathVariable(history.location.pathname);
    const urlRouteId = UrlUtils.getSecondLastPathVariable(
      history.location.pathname
    );

    setRouteId(urlRouteId);
    setWallId(urlWallId);

    const tempGym = GymsUtils.getGymByWallId(gymsState.gyms, urlWallId);

    if (
      tempGym &&
      userState.user &&
      GymsUtils.isAuthorizedEditor(tempGym, userState.user)
    ) {
      setGymId(tempGym.id);

      const tempWall = GymsUtils.getWallById(tempGym, urlWallId);

      if (tempWall) {
        const tempRoute = GymsUtils.getRouteById(tempWall, urlRouteId);

        if (!tempRoute) {
          history.goBack();
        } else {
          setRoute(tempRoute);
          setUpdatedRoute(tempRoute);
        }
      } else {
        history.goBack();
      }
    } else {
      history.goBack();
    }
  }, []);

  const handleSubmit = async (returnRoute: Route) => {
    const newRoute = { id: routeId, wallId, gymId, ...returnRoute };

    setUpdatedRoute(newRoute);

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
      GymsActions.updateRoute(gymsDispatch, newRoute, gymId).then(
        (response: Response) => {
          if (response instanceof Response && response.ok) {
            history.push(Routes.GYMS + "/" + gymId);
          } else {
            toast.error("Error updating route.");
          }
        }
      );
    }
  };

  if (updatedRoute.id) {
    return (
      <RouteForm
        formHeadText="Update route"
        route={updatedRoute}
        handleCancel={() => history.goBack()}
        handleSubmit={handleSubmit}
        submitButtonText="Update route"
        nameMessage={nameMessage}
        typesMessage={typesMessage}
      />
    );
  } else {
    return <div />;
  }
};

export default RouteEditPage;
