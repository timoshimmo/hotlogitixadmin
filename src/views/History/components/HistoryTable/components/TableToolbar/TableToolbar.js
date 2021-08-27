import React from 'react';
import { makeStyles } from '@material-ui/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
  Typography,
  Tooltip,
  Toolbar,
  IconButton
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
}));

const TableToolbar = () => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={classes.root}
    >
        <Typography className={classes.title} variant="h6" id="tableTitle">
          History List
        </Typography>
        <Tooltip title="Filter history">
         <IconButton aria-label="filter history">
           <FilterListIcon />
         </IconButton>
       </Tooltip>
    </Toolbar>
  );
};

export default TableToolbar;
