import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Hidden  } from '@material-ui/core';

import { Leftbar } from './components';

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
//  const theme = useTheme();
/*  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

*/

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
            <Leftbar />
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
