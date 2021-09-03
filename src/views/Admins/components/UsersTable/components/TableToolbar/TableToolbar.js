import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {
  Button,
  Grid
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: '#fff',
    textTransform: 'none',
    fontSize: 13,
    minHeight: 40,
    fontWeight: 400,
    color: '#fff',
    font: 'Helvetica Neue',
    padding: '0px 15px',
    backgroundColor: theme.palette.success.main,
    '&:hover': {
      backgroundColor: theme.palette.success.light,
      color: "#fff",
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
                variant="contained"
                className={classes.buttonStyle}
                startIcon={<PersonAddIcon style={{ fontSize: 14 }} />}
                onClick={handlOpenCreateDrawer}
                >
                 New Admin
              </Button>
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
