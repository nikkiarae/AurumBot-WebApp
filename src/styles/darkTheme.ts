// styles/darkTheme.ts
import { createTheme } from "@mui/material/styles";
import { blue, grey } from "@mui/material/colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#DAA520",
    },
    secondary: {
      main: blue[500],
    },
    background: {
      default: grey[900],
      paper: "#1a1a1a",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
