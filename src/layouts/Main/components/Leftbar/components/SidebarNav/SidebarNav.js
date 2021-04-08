import React, { forwardRef } from 'react';
import { NavLink as RouterLink, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Button, ListItemIcon, ListItemText } from '@material-ui/core';
import SvgIcon from '@material-ui/core/SvgIcon';
import Popover from '@material-ui/core/Popover';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';


const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: '#04011D',
    padding: '10px 15px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: 600,
    fontSize: 14,
    marginBottom: theme.spacing(1),
    borderRadius: '70px',
    '&:hover': {
     backgroundColor: '#F2F4F7'
   },
  },
  icon: {
    color: '#04011D',
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1)
  },
  active: {
    color: '#2688FB',
    fontWeight: theme.typography.fontWeightMedium,
    '& $svg': {
      color: '#2688FB',
      stroke: '#2688FB !important'
    }
  },
  listroot: {
    flexGrow: 1
  },
  settingsTitleStyle: {
      fontSize: 14,
      fontWeight: 600,
      color: '#04011D',
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

/*
function MoreIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 14 3">
      <g style={{ stroke:'none', fill:'#010e1c', strokeLinecap:'round', strokeLinejoin:'round' }} transform="translate(-10 -17.5)">
        <g style={{ fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }} transform="translate(-12 0)">
          <path class="b" d="M30.5,29A1.5,1.5,0,1,1,29,27.5,1.5,1.5,0,0,1,30.5,29Z"/>
          <path style={{ stroke:'none', fill:'#010e1c' }} d="M 28.99999809265137 27.49999809265137 C 29.82859802246094 27.49999809265137 30.49999809265137 28.1713981628418 30.49999809265137 28.99999809265137 C 30.49999809265137 29.82859802246094 29.82859802246094 30.49999809265137 28.99999809265137 30.49999809265137 C 28.1713981628418 30.49999809265137 27.49999809265137 29.82859802246094 27.49999809265137 28.99999809265137 C 27.49999809265137 28.1713981628418 28.1713981628418 27.49999809265137 28.99999809265137 27.49999809265137 Z"/>
        </g>
        <g style={{ fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }} transform="translate(-24 0)">
          <path class="b" d="M48,29a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,48,29Z"/>
          <path style={{ stroke:'none', fill:'#010e1c' }} d="M 46.49999618530273 27.49999809265137 C 47.32860565185547 27.49999809265137 47.99999618530273 28.1713981628418 47.99999618530273 28.99999809265137 C 47.99999618530273 29.82859802246094 47.32860565185547 30.49999809265137 46.49999618530273 30.49999809265137 C 45.67140579223633 30.49999809265137 44.99999618530273 29.82859802246094 44.99999618530273 28.99999809265137 C 44.99999618530273 28.1713981628418 45.67140579223633 27.49999809265137 46.49999618530273 27.49999809265137 Z"/>
        </g>
        <g style={{ fill:'none', strokeLinecap:'round', strokeLinejoin:'round' }} transform="translate(0 0)">
          <path class="b" d="M13,29a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,13,29Z"/>
          <path style={{ stroke:'none', fill:'#010e1c' }} d="M 11.49999713897705 27.49999809265137 C 12.32859706878662 27.49999809265137 12.99999713897705 28.1713981628418 12.99999713897705 28.99999809265137 C 12.99999713897705 29.82859802246094 12.32859706878662 30.49999809265137 11.49999713897705 30.49999809265137 C 10.67139720916748 30.49999809265137 9.999997138977051 29.82859802246094 9.999997138977051 28.99999809265137 C 9.999997138977051 28.1713981628418 10.67139720916748 27.49999809265137 11.49999713897705 27.49999809265137 Z"/>
        </g>
      </g>
    </SvgIcon>
  );
}

*/

function MoreIcon(props) {
  return (
    <SvgIcon {...props}  viewBox="0 0 512 512">
      <g>
        <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,480
          C132.288,480,32,379.712,32,256S132.288,32,256,32s224,100.288,224,224S379.712,480,256,480z"/>
        <circle cx="256" cy="256" r="32"/>
        <circle cx="368" cy="256" r="32"/>
        <circle cx="144" cy="256" r="32"/>
      </g>
    </SvgIcon>
  );
}

/*function HomeIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 23.6 26">
      <g transform="translate(-6.5 -4)">
        <path d="M7.5,13.4,18.3,5l10.8,8.4V26.6A2.4,2.4,0,0,1,26.7,29H9.9a2.4,2.4,0,0,1-2.4-2.4h0Z" transform="translate(0)"/>
        <path d="M22.5,42V30h7.2V42" transform="translate(-7.8 -13)"/>
      </g>
    </SvgIcon>
  );
} */


const SidebarNav = props => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();
  let history = useHistory();
  const loc = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const moreid = openPopover ? 'menu-popover' : undefined;


  const logout = () => {
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
          fullWidth
          className={classes.button}
          aria-describedby={moreid}
          onClick={handleMenuClick}
          style={{ marginTop: -5 }}
          startIcon={<MoreIcon fontSize="small" style={{ marginLeft: 5, marginRight: 4 }} />}
          >
          More
        </Button>

        <Popover
        id={moreid}
        open={openPopover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
      <List component="nav" className={classes.listroot} aria-label="side menu">
          <ListItem
            button
            onClick={logout}
          >
            <ListItemIcon>
              <ExitToAppOutlinedIcon style={{ color: '#04011D', fontSize: 21 }} />
            </ListItemIcon>
            <ListItemText
               primary="Logout"
               primaryTypographyProps={{
                 classes:{ body1: classes.settingsTitleStyle }
               }}
                />
          </ListItem>
        </List>
      </Popover>
      </div>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default SidebarNav;
