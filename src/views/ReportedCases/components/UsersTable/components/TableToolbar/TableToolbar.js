import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
    fontSize: 18
  },
}));

const TableToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={classes.root}
    >
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Reported Cases
        </Typography>
    </Toolbar>
  );
};

export default TableToolbar;
