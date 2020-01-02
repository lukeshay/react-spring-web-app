import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";

// A custom theme for this app
export const theme: ThemeOptions = {
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

export default responsiveFontSizes(createMuiTheme(theme));
