// styles/lightTheme.ts
import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#DAA520",
    },
    secondary: {
      main: blue[500],
    },
    background: {
      default: grey[200],
      paper: '#D0D0D0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});