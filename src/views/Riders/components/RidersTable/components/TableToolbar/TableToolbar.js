import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
//import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {
  Typography,
  Toolbar
} from '@material-ui/core';


const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
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
          Riders List
        </Typography>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  handlOpenCreate: PropTypes.func
};

export default TableToolbar;
