import { red } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff"
    },
    error: {
      main: red.A400
    },
    primary: {
      main: "#9e9e9e"
    },
    secondary: {
      main: "#00bcd4"
    }
  }
});

export default responsiveFontSizes(theme);
