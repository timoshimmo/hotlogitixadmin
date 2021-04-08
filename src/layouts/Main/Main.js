import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useMediaQuery, Hidden  } from '@material-ui/core';

import { Leftbar, Rightbar, MobileBottombar, MobileMenu } from './components';
import SERVICES from '../../util/webservices';

/*
[theme.breakpoints.up('sm')]: {
  paddingTop: 64
}

*/

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: '100%',
    backgroundColor: '#fff',
    maxWidth: '100% !important',
    overflowX: 'hidden !important'
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%',
    display: 'block',
    backgroundColor: '#fff',
    width: '100%',
  },
  leftDiv: {
    display: 'flex',
    maxHeight: '100vh',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    width: '20%',
    position: 'sticky',
    right: 0,
    top: 0,
    zIndex: 100,
    borderRight: '1px solid #F2F4F7',
  },
  mainDiv: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    }
  },
  rightDiv: {
    width: '30%',
    position: 'sticky',
    right: 0,
    top: 0,
    zIndex: 100,
    borderLeft: '1px solid #F2F4F7',
  },
  grid: {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    position: 'relative'
  },
  topArea: {
    height: 64,
    width: '100%',
  }
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [invisible, setInvisible] = React.useState(false);

  const [msgInvisible, setMsgInvisible] = React.useState(false);

  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

//  const openDialog = true;
//  const closeDialog = false;

    const handleDialogOpen = () => {
      setOpenDialog(true);
    };

    const handleDialogClose = () => {
      setOpenDialog(false);
    };

    const handleMenuClose = () => {
      setOpenMenu(false);
    };
    const handleMenuToggle = () => {
      setOpenMenu(true);
    };

  const ScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }


  /*

  <div
    className={clsx({
      [classes.root]: true,
      [classes.shiftContent]: isDesktop
    })}
  >

  <Leftbar
    onClose={handleSidebarClose}
    open={shouldOpenSidebar}
    variant={isDesktop ? 'persistent' : 'temporary'}
  />

  <Hidden mdDown>
    <Topbar />
  </Hidden>
  <Hidden smUp>
    <MobileTopbar />
  </Hidden>
  */

  return (
    <div
      className={classes.root}
    >
      <div
        className={classes.grid}
      >
        <Hidden mdDown>
         <div className={classes.leftDiv} >
            <Leftbar onDialogOpen={handleDialogOpen} />
          </div>
        </Hidden>
        <div className={classes.mainDiv}>
            <main className={classes.content}>
              {children}
            </main>
        </div>
      </div>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
