import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Typography, Toolbar, Badge, IconButton, InputAdornment } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
//import { history } from '../../../helpers';
import SvgIcon from '@material-ui/core/SvgIcon';


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

  function SearchIcon(props) {
      return (
          <SvgIcon {...props} viewBox="0 0 22.052 22.052">
              <g transform="translate(0.85 0.85)">
                  <path class="a" d="M25.278,16.389A8.889,8.889,0,1,1,16.389,7.5,8.889,8.889,0,0,1,25.278,16.389Z" transform="translate(-7.5 -7.5)"/>
                  <path class="a" d="M46.458,46.458l-4.833-4.833" transform="translate(-26.458 -26.458)"/>
              </g>
          </SvgIcon>
      );
  }

  /*
  <Grid
    item
    className={classes.leftCol}
  >

  <RouterLink to="/">
    <img
      alt="Logo"
      src="/images/logo_only.png"
      height="35"
      width="45"
    />
  </RouterLink>

  </Grid>

  <AppBar
    {...rest}
    className={clsx(classes.root, className)}
    elevation={0}
    style={{ color: '#2688FB', backgroundColor: 'white' }}
  >
    const logout = () => {
      history.push('/signin');
    }

  */


  const Topbar = props => {

    const classes = useStyles();

    const { title } = props;
    let history = useHistory();

    const [notifications] = useState([]);

    const handleSearch = () => {
      history.push('/search');
    }


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
