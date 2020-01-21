import React from "react";
import { Route, Switch } from "react-router";
import { AuthRoutes, Routes } from "../../routes";

const GymsPage = React.lazy(() => import("./views/GymsPage"));
const GymPage = React.lazy(() => import("./views/GymPage"));
const GymEditPage = React.lazy(() => import("./views/GymEditPage"));

const GymRouter: React.FC = (): JSX.Element => (
  <React.Suspense fallback={<div />}>
    <Switch>
      <Route exact={true} path={Routes.GYMS} component={GymsPage} />
      <Route path={AuthRoutes.EDIT_GYM} component={GymEditPage} />
      <Route path={Routes.GYMS} component={GymPage} />
    </Switch>
  </React.Suspense>
);

export default GymRouter;
