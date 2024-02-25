// theme.ts

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#009688', // Teal color
    },
    background: {
      default: '#fff', // White background
    },
  },
  typography: {
    fontSize: 16, // Default font size
  },
  spacing: 8, // Default spacing
});

export default theme;
