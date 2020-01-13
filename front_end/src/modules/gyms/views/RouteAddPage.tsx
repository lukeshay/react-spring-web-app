import React from "react";
import * as ReactRouter from "react-router";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import * as UrlUtils from "../../../utils/urlUtils";
import RouteForm from "./RouteForm";
import { Route } from "../../../types";

const RouteAddPage: React.FC = () => {
  const history = ReactRouter.useHistory();

  const [wallId, setWallId] = React.useState<string>("");
  const [gymId, setGymId] = React.useState<string>("");

  const { state: gymsState } = useGymsContext();
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

  return (
    <RouteForm
      route={{} as Route}
      formHeadText="Add route"
      handleCancel={() => history.push(Routes.GYMS + "/" + gymId)}
      handleSubmit={(route: Route) => console.log(route)}
      submitButtonText="Add route"
    />
  );
};

export default RouteAddPage;
