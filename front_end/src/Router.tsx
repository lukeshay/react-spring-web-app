import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router";
import { Routes } from "./routes/routes";

const HomePage = lazy(() => import("./modules/homepage/HomePage"));
const NotFoundPage = lazy(() => import("./modules/NotFoundPage"));
const ProfilePage = lazy(() => import("./modules/profile"));
const GymsV2Page = lazy(() => import("./modules/gyms"));

const Router: React.FC = () => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/index" component={HomePage} />
        <Route path={Routes.PROFILE} component={ProfilePage} />
        <Route path={Routes.GYMS} component={GymsV2Page} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};

export default Router;
