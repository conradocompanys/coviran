import { createMuiTheme } from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";

// define light theme colors
export const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: "#30994c",
    },
    secondary: {
      main: orange[300],
    },
  },
});

// define dark theme colors
export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: orange[300],
    },
    secondary: {
      main: "#30994c",
    },
  },
});
