import {
  CssBaseline,
  FormControlLabel,
  ThemeProvider
} from "@material-ui/core";
import ToggleSwitch from "@material-ui/core/Switch";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GymsStore } from "./context/gyms/gymsStore";
import { UserStore } from "./context/user/userStore";
import NavigationBar from "./modules/navigation/NavigationBar";
import Router from "./Router";
import StoreCombiner from "./StoreCombiner";
import { darkTheme, getTheme, lightTheme } from "./theme";
import Favicon from "react-favicon";

interface Style {
  marginLeft: string;
  marginRight: string;
  marginTop: string;
}

const App: React.FC = () => {
  const [style, setStyle] = React.useState<Style>({
    marginLeft: "0px",
    marginRight: "0px",
    marginTop: "0px"
  });

  const [dark, setDark] = React.useState<boolean>(true);

  React.useEffect(() => {
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
    <StoreCombiner stores={[UserStore, GymsStore]}>
      <Favicon url="./favicon.ico" />
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
              style={{
                bottom: "0",
                marginLeft: "10px",
                position: "absolute"
              }}
            />
          </NavigationBar>
          <Router />
        </ThemeProvider>
      </div>
    </StoreCombiner>
  );
};

export default App;
