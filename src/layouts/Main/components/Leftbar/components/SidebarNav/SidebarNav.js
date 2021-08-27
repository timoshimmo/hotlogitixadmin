import React, { forwardRef } from 'react';
import { NavLink as RouterLink, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { List, ListItem, Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {
    height: '90vh',
    position: 'relative',
    padding: theme.spacing(2),
  },
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.primary.contrastText,
    padding: '10px 15px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: 600,
    fontSize: 13,
    marginBottom: theme.spacing(1),
    borderRadius: '5px',
    '&:hover': {
     color: theme.palette.secondary.main,
     backgroundColor: '#FFFFFF40',
     '& $svg': {
         color: theme.palette.secondary.main,
         stroke: '#f7ac1b !important'
       }
   },
  },
  icon: {
    color: theme.palette.primary.contrastText,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $svg': {
      color: theme.palette.secondary.main,
      stroke: '#f7ac1b !important'
    }
  },
  listroot: {
    flexGrow: 1
  },
  settingsTitleStyle: {
      fontSize: 14,
      fontWeight: 600,
      color: '#04011D',
  },
  logout: {
    fontWeight: 400,
    fontSize: 13,
    textTransform: 'none',
    color: theme.palette.text.secondary,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'transparent',
    border: '1px solid #8692A6',
    borderRadius: 4,
    '&:hover': {
     backgroundColor: '#FFFFFF1A',
   },
   position: 'absolute',
   bottom: 0,
   width: 'calc(100% - 32px)'
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

CustomRouterLink.displayName = 'CustomRouterLink';


const SidebarNav = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();
  let history = useHistory();
  const loc = useLocation();


  const handleLogout = () => {
    history.push('/signin');
  }

  const handleReload = () => {
    if(loc.pathname === '/home') {
      window.location.reload(true);
    }
  }

  return (
    <div {...rest}
    className={clsx(classes.root, className)}>

        <List>
          {pages.map(page => (
            <ListItem
              className={classes.item}
              disableGutters
              key={page.title}
            >
             {
               page.title === "Home" ?

               (
                 <Button
                   activeClassName={classes.active}
                   className={classes.button}
                   component={CustomRouterLink}
                   to={page.href}
                   onClick={handleReload}
                 >
                   <div className={classes.icon}>{page.icon}</div>
                   {page.title}
                 </Button>
               )
               :
               (
                 <Button
                   activeClassName={classes.active}
                   className={classes.button}
                   component={CustomRouterLink}
                   to={page.href}
                 >
                   <div className={classes.icon}>{page.icon}</div>
                   {page.title}
                 </Button>
               )

             }

            </ListItem>
          ))}
        </List>
        <Button
          className={classes.logout}
          variant="outline"
          onClick={handleLogout}
          >
          Log out
        </Button>
      </div>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
