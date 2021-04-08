import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PrintIcon from '@material-ui/icons/Print';
import FilterListIcon from '@material-ui/icons/FilterList';

/*

<Tooltip title="Filter list">
  <IconButton aria-label="filter list">
    <FilterListIcon />
  </IconButton>
</Tooltip>
*/

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

const TableToolbar = props => {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={classes.root}
    >
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Withdrawals
        </Typography>
    </Toolbar>
  );
};

export default TableToolbar;
