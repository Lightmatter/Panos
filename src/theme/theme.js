import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    h1: {
      marginBottom: '0.6rem',
      fontSize: '3rem', // 48px
    },
    h2: {
      marginBottom: '0.5rem',
      fontSize: '2.5rem', // 40px
    },
    h3: {
      marginBottom: '0.5rem',
      fontSize: '2.25rem', // 36px
    },
    h4: {
      marginBottom: '0.5rem',
      fontSize: '1.250rem', // 20px
    },
    h5: {
      marginBottom: '0.5rem',
      fontSize: '1.250rem', // 20px
    },
    h6: {
      marginBottom: '0.5rem',
      fontSize: '1rem',
    },
  },
});

export default theme;
