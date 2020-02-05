import {
  CssBaseline,
  FormControlLabel,
  ThemeProvider
} from "@material-ui/core";
import ToggleSwitch from "@material-ui/core/Switch";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as UserActions from "./context/user/userActions";
import { useUserContext } from "./context/user/userStore";
import {
  DARK_THEME,
  LIGHT_THEME,
  Types,
  useViewContext
} from "./context/view/viewStore";
import NavigationBar from "./modules/navigation/NavigationBar";
import Router from "./Router";
import { darkTheme, getTheme, lightTheme } from "./theme";

const App: React.FC = (): JSX.Element => {
  const { state: userState, dispatch: userDispatch } = useUserContext();
  const { state: viewState, dispatch: viewDispatch } = useViewContext();

  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMobile(viewState.mobile);
  }, [viewState, isMobile]);

  const handleResize = (): void => {
    const width = window.innerWidth;
    const { theme } = viewState;

    if (width < 600) {
      viewDispatch({ actionType: Types.UPDATE_VIEW, theme, mobile: true });
    } else if (width >= 600) {
      viewDispatch({ actionType: Types.UPDATE_VIEW, theme, mobile: false });
    }
  };

  React.useEffect(() => {
    if (!userState.user || !userState.user.id) {
      UserActions.loadUserFromCookies(userDispatch);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={
        isMobile
          ? {
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "60px"
            }
          : {
              marginLeft: "180px",
              marginRight: "10px",
              marginTop: "0px"
            }
      }
    >
      <ThemeProvider
        theme={getTheme(
          viewState.theme === DARK_THEME ? darkTheme : lightTheme
        )}
      >
        <CssBaseline />
        <ToastContainer autoClose={3000} hideProgressBar={true} />
        <NavigationBar>
          <FormControlLabel
            control={
              <ToggleSwitch
                checked={viewState.theme === DARK_THEME}
                onChange={(): void =>
                  viewDispatch({
                    actionType: Types.UPDATE_VIEW,
                    mobile: viewState.mobile,
                    theme:
                      viewState.theme === DARK_THEME ? LIGHT_THEME : DARK_THEME
                  })
                }
              />
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
  );
};

export default App;
