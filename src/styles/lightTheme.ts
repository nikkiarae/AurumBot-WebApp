// styles/lightTheme.ts
import { createTheme } from '@mui/material/styles';
import { blue, grey } from '@mui/material/colors';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blue[500],
    },
    secondary: {
      main: '#DAA520'
  },
    background: {
      default: grey[100],
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});