import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Theme, ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

// A custom darkTheme for this app
export const darkTheme: ThemeOptions = {
  palette: {
    background: {
      default: "#222",
      paper: "rgba(39, 39, 45, 1)"
    },
    common: { black: "rgba(0, 0, 0, 1)", white: "rgba(255, 255, 255, 1)" },
    error: {
      main: "#f10"
    },
    primary: {
      main: "#BB86FC"
    },
    secondary: {
      main: "#03DAC5"
    },
    text: {
      disabled: "rgb(116, 116, 116)",
      hint: "rgba(240, 240, 240, 1)",
      primary: "rgba(240, 240, 240, 1)",
      secondary: "rgba(153, 153, 153, 1)"
    },
    type: "dark"
  }
};

// A custom lightTheme for this app
export const lightTheme: ThemeOptions = {
  palette: {
    background: {
      default: "#F3F3F3",
      paper: "#F1F1F1"
    },
    common: { black: "rgba(0, 0, 0, 1)", white: "rgba(255, 255, 255, 1)" },
    error: {
      main: "#f10"
    },
    primary: {
      main: "#BB86FC"
    },
    secondary: {
      main: "#03DAC5"
    },
    text: {
      disabled: "#D3D3D3",
      hint: "#696969",
      primary: "#262626",
      secondary: "#535353"
    },
    type: "light"
  }
};

export const getTheme = (themeOptions: ThemeOptions): Theme =>
  responsiveFontSizes(createMuiTheme(themeOptions));
