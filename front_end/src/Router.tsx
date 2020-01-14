import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router";
import { AuthRoutes, Routes } from "./routes";

const HomePage = lazy(() => import("./modules/homepage/HomePage"));
const NotFoundPage = lazy(() => import("./modules/NotFoundPage"));
const ProfilePage = lazy(() => import("./modules/profile"));
const GymsPage = lazy(() => import("./modules/gyms"));
const AboutPage = lazy(() => import("./modules/about"));

const Router: React.FC = (): JSX.Element => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route exact={true} path="/index" component={HomePage} />
        <Route path={Routes.PROFILE} component={ProfilePage} />
        <Route path={Routes.GYMS} component={GymsPage} />
        <Route path={Routes.ABOUT} component={AboutPage} />
        <Route path={AuthRoutes.WALLS} component={GymsPage} />
        <Route path={AuthRoutes.ROUTES} component={GymsPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  );
};

export default Router;
