import React, { useState, forwardRef } from 'react';
import clsx from 'clsx';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Typography } from '@material-ui/core';
import { AppBar, Toolbar, Badge, Hidden, IconButton, InputAdornment, Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import SvgIcon from '@material-ui/core/SvgIcon';



const useStyles = makeStyles(theme => ({

  appBar: {
      top: 'auto',
      bottom: 0,
    },
  flexGrow: {
    flexGrow: 1
  },

  textField: {
    position: 'relative',
    backgroundColor: '#F2F6FC',
    border: '1px solid #fff',
    fontSize: 12,
    width: '100%',
    borderRadius: '70px',
    transition: theme.transitions.create(['background-color']),
    padding: '5px 20px'
  },
  input: {
    '&::placeholder': {
       color: '#A1A9B3',
       fontSize: 14
     },
  },
  grid: {
    height: '100%',
    width: '100%'
  },
  menuCol: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1
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
    borderTop: '1px solid #F2F4F7',
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    flexGrow: 1,
  },
  smallAvatar: {
    width: 30,
    height: 30,
    border: '1px solid #fff'
  },
  title: {
    flexGrow: 1,
  },

  active: {
    color: '#2688fb',
    fontWeight: theme.typography.fontWeightMedium,
    '& $svg': {
      color: '#2688fb',
      stroke: '#2688FB !important'
    }
  },
  fabStyle: {
    textTransform: 'none',
    fontSize: 12,
    WebkitBoxShadow: 'none',
    MozBoxShadow: 'none',
    boxShadow: 'none',
    borderStyle: 'solid',
    borderRadius: 10,
    borderWidth: 1,
    fontWeight: 400,
    backgroundColor: '#2688FB',
    borderColor: '#fff',
    color: '#fff',
    '&:hover': {
      WebkitBoxShadow: 'none',
      MozBoxShadow: 'none',
      boxShadow: 'none',
      backgroundColor: '#0573f0',
      color: "#fff",
     },
  },
  badgeStyle: {
    backgroundColor: '#2688FB'
  }

  }));

  const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
      style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
  ));

  function HomeIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 23.6 26">
        <g transform="translate(-6.5 -4)">
          <path class="a" d="M7.5,13.4,18.3,5l10.8,8.4V26.6A2.4,2.4,0,0,1,26.7,29H9.9a2.4,2.4,0,0,1-2.4-2.4h0Z" transform="translate(0)"/>
          <path class="a" d="M22.5,42V30h7.2V42" transform="translate(-7.8 -13)"/>
        </g>
      </SvgIcon>
    );
  }
  //fill:#010e1c;stroke:#010e1c;stroke-width:0.5px;

  function MessageIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 24.963 24.506">
        <g transform="translate(0.25 0.25)">
          <path d="M20.258,0H4.2A4.192,4.192,0,0,0,0,4.2v9.938a4.192,4.192,0,0,0,4.2,4.2h8.142l7.377,5.466c.5.382.841.153.764-.459l-.612-5.007,1.529-.153a4.2,4.2,0,0,0,3.058-4.052V4.2A4.192,4.192,0,0,0,20.258,0Zm2.676,14.143a2.659,2.659,0,0,1-2.676,2.676h-2.1l.535,4.319-5.848-4.319H4.2a2.659,2.659,0,0,1-2.676-2.676V4.2A2.659,2.659,0,0,1,4.2,1.529H20.258A2.659,2.659,0,0,1,22.934,4.2Z"/>
          <circle cx="1.529" cy="1.529" r="1.529" transform="translate(6.116 8.027)"/>
          <circle cx="1.529" cy="1.529" r="1.529" transform="translate(10.703 8.027)"/>
          <circle cx="1.529" cy="1.529" r="1.529" transform="translate(15.289 8.027)"/>
        </g>
      </SvgIcon>
    );
  }

  function NotificationsIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 23.604 26">
        <g transform="translate(-2 -1)">
          <path d="M21,9.2a7.2,7.2,0,1,0-14.4,0C6.6,17.6,3,20,3,20H24.6S21,17.6,21,9.2" transform="translate(0)"/>
          <path d="M14.423,21a2.4,2.4,0,0,1-4.153,0" transform="translate(1.456 3.804)"/>
        </g>
      </SvgIcon>
    );
  }

  function MenusIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 20.358 15.4">
        <g transform="translate(-19.3 -16.3)">
          <path d="M20,15H38.958" transform="translate(0 2)"/>
          <path d="M20,30H38.958" transform="translate(0 -6)"/>
          <path d="M20,45H38.958" transform="translate(0 -14)"/>
        </g>
      </SvgIcon>
    );
  }

  const MobileBottombar = props => {

    const { className, onDialogOpen, onMenuOpen, onBadgeVisible, onMsgBadgeVisible, ...rest } = props;

    const classes = useStyles();
    const loc = useLocation();

    const handleReload = () => {
    //  console.log("LOCATION: " + JSON.stringify(loc.pathname));
      if(loc.pathname === '/home') {
        window.location.reload(true);
      }
    }

    return (
      <AppBar
        {...rest}
        className={classes.appBar}
        position="fixed"
        elevation={1}
        style={{ color: '#04011D', backgroundColor: 'white' }}
      >

        <Toolbar
          disableGutters={true}
          className={classes.toolbar}
        >
          <Grid
            className={classes.grid}
            container
            spacing={1}
            alignItems='center'
            justify='space-between'
          >
            <Grid
              item
            >
              <IconButton
                aria-label="Home"
                color="inherit"
                activeClassName={classes.active}
                component={CustomRouterLink}
                onClick={handleReload}
                to='/home'
              >
                 <HomeIcon fontSize="small" style={{ fill:'none', stroke:'#010e1c', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
               </IconButton>
            </Grid>
            <Grid
              item
            >
            <IconButton
              aria-label="Notify"
              color="inherit"
              activeClassName={classes.active}
              component={CustomRouterLink}
              to='/notifications'
            >
               <Badge color="primary" variant="dot" invisible={onBadgeVisible} classes={{ colorPrimary: classes.badgeStyle }}><NotificationsIcon fontSize="small" style={{ fill:'none', stroke:'#010e1c', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} /></Badge>
             </IconButton>
            </Grid>
            <Grid
              item
            >
              <Fab className={classes.fabStyle} aria-label="add" size="small" onClick={onDialogOpen}>
                <AddIcon />
              </Fab>
            </Grid>
            <Grid
              item
            >
            <IconButton
              aria-label="Search"
              color="inherit"
              activeClassName={classes.active}
              component={CustomRouterLink}
              to='/messages'
            >
               <Badge color="primary" variant="dot" invisible={onMsgBadgeVisible} classes={{ colorPrimary: classes.badgeStyle }}><MessageIcon fontSize="small" style={{ strokeWidth:0.5 }} /></Badge>
             </IconButton>
            </Grid>
            <Grid
              item
            >
            <IconButton
              aria-label="menu"
              color="inherit"
              onClick={onMenuOpen}
            >
               <MenusIcon fontSize="small" style={{ fill:'none', stroke:'#010e1c', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:1.4 }}/>
             </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

    );

  };

  MobileBottombar.propTypes = {
    className: PropTypes.string,
    onDialogOpen: PropTypes.func,
    onMenuOpen: PropTypes.func,
    onBadgeVisible: PropTypes.bool,
    onMsgBadgeVisible: PropTypes.bool
  };

  export default MobileBottombar;
