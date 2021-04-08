import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const theme = createMuiTheme({
  palette,
  typography,
  overrides: {
    MuiButton: {
      root: {
        boxShadow:
          '0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20)',
        backgroundColor: palette.primary.main,
        '&hover': {
          backgroundColor: palette.primary.dark,
        }
      }
    }
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
