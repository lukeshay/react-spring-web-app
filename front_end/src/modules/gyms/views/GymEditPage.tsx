import React from "react";
import * as ReactRouter from "react-router";
import { useGymsContext } from "../../../context/gyms/gymsStore";
import { useUserContext } from "../../../context/user/userStore";
import { Routes } from "../../../routes";
import { Gym } from "../../../types";
import GymEditForm from "./GymEditForm";

const GymEditPage: React.FunctionComponent = () => {
  const history = ReactRouter.useHistory();

  const [gym, setGym] = React.useState<Gym>({} as Gym);

  const { state: gymsState, dispatch: gymsDispatch } = useGymsContext();
  const { state: userState, dispatch: userDispatch } = useUserContext();

  React.useEffect(() => {
    const gymId = history.location.pathname
      .split("/")
      .splice(-1)
      .pop();

    const tempGym = gymsState.gyms
      .filter((element) => element.id === gymId)
      .pop();

    const { user } = userState;

    if (
      tempGym &&
      user &&
      tempGym.authorizedEditors &&
      tempGym.authorizedEditors.find(
        (editorId: string) => editorId === user.userId
      )
    ) {
      setGym(tempGym);
    } else {
      history.push(Routes.GYMS + "/" + gymId);
    }
  });

  if (gym && gym.id) {
    return <GymEditForm gym={gym} />;
  } else {
    return <div />;
  }
};

export default GymEditPage;
