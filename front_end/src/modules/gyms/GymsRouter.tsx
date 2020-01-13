import React from "react";
import { Route, Switch } from "react-router";
import { AuthRoutes, Routes } from "../../routes";

const GymsPage = React.lazy(() => import("./views/GymsPage"));
const GymPage = React.lazy(() => import("./views/GymPage"));
const GymEditPage = React.lazy(() => import("./views/GymEditPage"));
const WallEditPage = React.lazy(() => import("./views/WallEditPage"));
const WallAddPage = React.lazy(() => import("./views/WallAddPage"));

const GymRouter: React.FC = () => (
  <React.Suspense fallback={<div />}>
    <Switch>
      <Route exact={true} path={Routes.GYMS} component={GymsPage} />
      <Route path={AuthRoutes.EDIT_GYM} component={GymEditPage} />
      <Route path={Routes.GYMS} component={GymPage} />
      <Route path={AuthRoutes.EDIT_WALL} component={WallEditPage} />
      <Route path={AuthRoutes.ADD_WALL} component={WallAddPage} />
    </Switch>
  </React.Suspense>
);

export default React.memo(GymRouter);
