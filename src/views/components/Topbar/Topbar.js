import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Toolbar } from '@material-ui/core';


const useStyles = makeStyles(theme => ({

  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },

  grid: {
    height: '100%',
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15
  },
  centerCol: {
    display: 'flex',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    width: "100%",
  },
  txtSuggestions: {
    marginLeft: 20,
    color: theme.palette.text.primary,
    fontSize: 14
  },
  icon: {
    color: '#A1A9B3'
  },
  toolbar: {
    borderBottom: '1px solid #F2F4F7',
    width: '100%',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: '#fff'
  }

  }));




  const Topbar = props => {

    const classes = useStyles();

    const { title } = props;

    return (

        <Toolbar
          disableGutters={true}
          className={classes.toolbar}
        >
          <Grid
            className={classes.grid}
            container
          >

            <Grid
              item
              lg={12}
            >
              <Typography variant="h6">{title}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
    );

};

Topbar.propTypes = {
  title: PropTypes.string
};

export default Topbar;
