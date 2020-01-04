import {
  CssBaseline,
  FormControlLabel,
  ThemeProvider
} from "@material-ui/core";
import ToggleSwitch from "@material-ui/core/Switch";
import { lazy, Suspense, useEffect, useState } from "react";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "./modules/navigation/NavigationBar";
import { Routes } from "./routes";
import { darkTheme, getTheme, lightTheme } from "./theme";

const HomePage = lazy(() => import("./modules/homepage/HomePage"));
const NotFoundPage = lazy(() => import("./modules/NotFoundPage"));
const ProfilePage = lazy(() => import("./modules/profile"));
const GymsV2Page = lazy(() => import("./modules/gyms"));

interface Style {
  marginLeft: string;
  marginRight: string;
  marginTop: string;
}

const App: React.FC = () => {
  const [style, setStyle] = useState<Style>({
    marginLeft: "0px",
    marginRight: "0px",
    marginTop: "0px"
  });

  const [dark, setDark] = useState<boolean>(true);

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleResize() {
    const width = window.innerWidth;

    if (width < 600) {
      setStyle({ marginLeft: "10px", marginTop: "60px", marginRight: "10px" });
    } else {
      setStyle({ marginLeft: "180px", marginTop: "0px", marginRight: "10px" });
    }
  }

  return (
    <div style={style}>
      <ThemeProvider theme={getTheme(dark ? darkTheme : lightTheme)}>
        <CssBaseline />
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <NavigationBar>
          <FormControlLabel
            control={
              <ToggleSwitch checked={dark} onChange={() => setDark(!dark)} />
            }
            label="Dark Mode"
            style={{ marginLeft: "10px", position: "absolute", bottom: "0" }}
          />
        </NavigationBar>
        <Suspense fallback={<div />}>
          <Switch>
            <Route exact={true} path="/" component={HomePage} />
            <Route exact={true} path="/index" component={HomePage} />
            <Route path={Routes.PROFILE} component={ProfilePage} />
            <Route path={Routes.GYMS} component={GymsV2Page} />
            <Route component={NotFoundPage} />
          </Switch>
        </Suspense>
      </ThemeProvider>
    </div>
  );
};

export default React.memo(App);
