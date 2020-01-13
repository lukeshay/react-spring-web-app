import React from "react";
import * as ReactRouter from "react-router";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import { Gym, Wall } from "../../../types";
import * as UrlUtils from "../../../utils/urlUtils";
import WallEditForm from "./WallEditForm";

const WallEditPage: React.FunctionComponent = () => {
  const history = ReactRouter.useHistory();

  const [wall, setWall] = React.useState<Wall>({} as Wall);
  const [gym, setGym] = React.useState<Gym>({} as Gym);

  const { state: gymsState } = useGymsContext();
  const { state: userState } = useUserContext();

  React.useEffect(() => {
    const { user } = userState;

    const wallId = UrlUtils.getLastPathVariable(history.location.pathname);

    const tempGym = gymsState.gyms
      .filter(
        (element) =>
          element.walls &&
          element.walls.filter((elementWall) => elementWall.id === wallId)
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
        .filter((element) => element.id === wallId)
        .pop();
      setGym(tempGym);

      // Only here to silence warning
      if (tempWall) {
        setWall(tempWall);
      }
    } else if (tempGym) {
      history.push(Routes.GYMS + "/" + tempGym.id);
    } else {
      history.push(Routes.GYMS);
    }
  }, []);

  if (wall.id) {
    return <WallEditForm wall={wall} />;
  } else {
    return <React.Fragment />;
  }
};

export default WallEditPage;
