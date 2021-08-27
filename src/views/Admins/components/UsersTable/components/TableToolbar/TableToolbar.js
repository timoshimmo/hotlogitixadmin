import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import {
  Button,
  Grid,
  Tooltip,
  IconButton
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
    color: theme.palette.success.main,
    fontSize: 12,
    marginRight: 15,
    borderColor: theme.palette.success.main,
    "&:hover": {
      borderColor: theme.palette.success.main,
    }
  },
}));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const { handlOpenCreateDrawer } = props;

  return (
    <Toolbar
      className={classes.root}
    >

    <Grid style={{ paddingRight: 10}} container justify="space-between" alignItems="center">
      <Grid
        item
        lg={6}
        >
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Admin List
        </Typography>
      </Grid>
      <Grid
        item
        lg={6}
        >
        <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                className={classes.buttonStyle}
                startIcon={<AddIcon style={{ fontSize: 14 }} />}
                onClick={handlOpenCreateDrawer}
                >
                 New Admin
              </Button>
              <Tooltip title="Filter users">
               <IconButton aria-label="filter users">
                 <FilterListIcon />
               </IconButton>
             </Tooltip>
            </Grid>
        </Grid>

      </Grid>

    </Grid>

    </Toolbar>
  );
};

TableToolbar.propTypes = {
  handlOpenCreateDrawer: PropTypes.func
};

export default TableToolbar;
