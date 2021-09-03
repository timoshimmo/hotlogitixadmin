import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
//import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {
  Typography,
  Toolbar,
  Button
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  title: {
    flex: '1 1 50%',
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

  const { handleOpenCreate } = props;

  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={classes.root}
    >
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Riders List
        </Typography>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon style={{ fontSize: 16 }} />}
          className={classes.buttonStyle}
          onClick={handleOpenCreate}>
            New Rider
        </Button>
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  handleOpenCreate: PropTypes.func
};

export default TableToolbar;
