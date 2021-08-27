import { colors } from '@material-ui/core';

const white = '#FFFFFF';
const black = '#000000';

export default {
  black,
  white,
  primary: {
    contrastText: white,
    dark: '#262931',
    main: '#363a46',
    light: '#505668'
  },
  secondary: {
    contrastText: white,
    dark: '#AB7406',
    main: '#f7ac1b',
    light: '#F9BF4D'
  },
  success: {
    contrastText: white,
    dark: colors.green[900],
    main: colors.green[600],
    light: colors.green[400],
    veryLight: colors.green[100],
  },
  info: {
    contrastText: white,
    dark: colors.blue[900],
    main: colors.blue[600],
    light: colors.blue[400]
  },
  warning: {
    contrastText: white,
    dark: colors.orange[900],
    main: colors.orange[600],
    light: colors.orange[400]
  },
  error: {
    contrastText: white,
    dark: colors.red[900],
    main: colors.red[600],
    light: colors.red[400],
    veryLight: colors.red[100],
  },
  text: {
    primary: '#363a46',
    secondary: colors.blueGrey[600],
    link: colors.blue[600]
  },
  background: {
    default: '#F4F6F8',
    paper: white,
    dark: '#363a46',
    light: 'rgba(210, 210, 210, 0.2)',
    lightBlue: '#D3ECFF',
  },
  icon: colors.blueGrey[600],
  divider: colors.grey[200],
  priority: {
    red: '#FF0000',
    blue: '#0057FF',
    green: '#1CC500'
  },
  orders: {
    orange: '#FFB03A',
    green: '#1BBC2B',
    orangeIcon: '#FF9900',
    blueIcon: '#2B81C6',
    greenIcon: '#12AD22'
  },
  iconColors: {
    blue: '#1B75BC'
  }
};
