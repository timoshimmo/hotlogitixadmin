import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  Button,
  Grid
} from '@material-ui/core';


const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
    fontSize: 18
  },

  buttonStyle: {
    textTransform: 'none',
    borderStyle: 'solid',
    borderRadius: 70,
    borderWidth: 1,
    fontSize: 14,
    fontWeight: 400,
    font: 'Helvetica Neue',
    WebkitBoxShadow: 'none',
    MozBoxShadow: 'none',
    boxShadow: 'none',
    backgroundColor: '#4caf50',
    borderColor: '#fff',
    color: '#fff',
    '&:hover': {
       WebkitBoxShadow: 'none',
       MozBoxShadow: 'none',
       boxShadow: 'none',
       backgroundColor: '#388e3c',
       color: "#fff",
     },
  },
}));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const { handlOpenCreateDrawer } = props;

  return (
    <Toolbar
      className={classes.root}
    >

    <Grid container justify="space-between">
      <Grid item>
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Admins List
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          className={classes.buttonStyle}
          onClick={handlOpenCreateDrawer}
          >
           Create Admin
        </Button>
      </Grid>

    </Grid>

    </Toolbar>
  );
};

export default TableToolbar;
