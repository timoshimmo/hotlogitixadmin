import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Slide,
  Backdrop
} from '@material-ui/core';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import HeadsetMicOutlinedIcon from '@material-ui/icons/HeadsetMicOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import LiveHelpOutlinedIcon from '@material-ui/icons/LiveHelpOutlined';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';
import SecurityIcon from '@material-ui/icons/Security';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
//import { history } from '../../../../helpers';
import SERVICES from '../../../../util/webservices';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },

  menuBody: {

    height: '100%',
    width: '100%'
  },
  profileAvatar: {
    width: 100,
    height: 100,
    border: '1px solid #fff'
  },
  backdrop: {
     zIndex: theme.zIndex.drawer + 1,
     color: '#fff',
   },

   paper: {
     zIndex: 1,
     position: 'absolute',
     width: '100%',
     height: '85%',
     paddingTop: theme.spacing(1),
     bottom: 0,
     overflow:'scroll',
     borderTopRightRadius: 10,
     borderTopLeftRadius: 10,
     borderBottomRightRadius: 0,
     borderBottomLeftRadius: 0,
     paddingBottom: 10
 },
 btnCloseMenuStyle: {
   height: 10,
   width: '20%',
   textTransform: 'none',
   borderStyle: 'solid',
   borderRadius: 70,
   borderWidth: 1,
   borderColor: '#fff',
   fontSize: 14,
   fontWeight: 400,
   backgroundColor: "#EBEFF5",
 },
 buttonStyle: {
   textTransform: 'none',
   borderStyle: 'solid',
   borderRadius: 70,
   borderWidth: 1,
   fontSize: 14,
   fontWeight: 400,
   font: 'Helvetica Neue',
   WebkitBoxShadow: 'none',
   MozBoxShadow: 'none',
   boxShadow: 'none',
   paddingLeft: 25,
   paddingRight: 25,
   '&:hover': {
      WebkitBoxShadow: 'none',
      MozBoxShadow: 'none',
      boxShadow: 'none'
    },
 },
 active: {
   color: theme.palette.primary.main,
   fontWeight: theme.typography.fontWeightMedium,
   '& $icon': {
     color: theme.palette.primary.main
   }
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

const MobileMenu = props => {

   const classes = useStyles();
   let history = useHistory();

   const { openMenu, onCloseMenu } = props;

   const [profilePic, setProfilePic] = useState(null);
   const [fullname, setFullname] = useState(null);
   const [username, setUsername] = useState(null);
   const [stans, setStans] = useState(0);
   const [following, setFollowing] = useState(0);

   let userData = {};
   if (typeof localStorage !== 'undefined') {
       const user = localStorage.getItem('user');
       if(user !== null) {
         const data = JSON.parse(user);
         userData = data;
       }
   }

   useEffect(() => {
     SERVICES.get(`user/profile/${userData.userid}`)
     .then(response => {
       if(response.data.status === "success") {
           setProfilePic(response.data.data.profilePicUrl);
           setFullname(response.data.data.fullname);
           setUsername('@'+response.data.data.username);
           setStans(response.data.data.stans.length);
           setFollowing(response.data.data.following.length);
       }

     })
     .catch(error => {
       console.log(error.response);
     });

   },[]);

   const logout = () => {
     history.push('/signin');
   }

   const handleBookmarks = () => {
     history.push('/bookmarks');
   }

   const handleOpenSettings = () => {
     history.push('/settings');
   }

   const handleOpenLists = () => {
     history.push('/lists');
   }

   const handleContact = () => {
     //history.push('/contact');
     window.open("http://chat.stansonly.com/", "_blank");
   }

   const handleFaq = () => {
     history.push('/faq');
   }

   const handleTerms = () => {
     history.push('/terms');
   }

   const handlePrivacy = () => {
     history.push('/privacy');
   }

   const handlePolicy = () => {
     history.push('/policy');
   }


   return (
     <div className={classes.root}>
       <Backdrop className={classes.backdrop} open={openMenu} onClick={onCloseMenu}>
         <div className={classes.menuBody}>
            <Slide direction="up" in={openMenu} mountOnEnter unmountOnExit>
              <Paper elevation={4} className={classes.paper}>
                <Grid container spacing={2} alignItems='center' direction="column" style={{ paddingBottom: 20 }}>
                    <Grid item>
                        <Button
                          type="button"
                          variant="contained"
                          className={classes.btnCloseMenuStyle}
                          onClick={onCloseMenu}
                          disableElevation
                        />
                    </Grid>
                    <Grid item>
                      <Avatar alt="avatar" src={profilePic} className={classes.profileAvatar} />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body1"
                        display="block"
                        component="span"
                        style={{ fontWeight: 700, textAlign: 'center' }}
                      >
                        {fullname}
                      </Typography>
                      <Typography
                        variant="body2"
                        display="block"
                        component="span"
                        style={{ fontWeight: 400, color: '#A0B1C6', textAlign: 'center' }}
                      >
                        {username}
                      </Typography>
                    </Grid>
                    <Grid container spacing={3} justify='center'>
                      <Grid item>
                          <Grid container spacing={1} justify='center'>
                                <Grid item>
                                  <Typography
                                    variant="body1"
                                    display="block"
                                    component="span"
                                    style={{ fontWeight: 700, textAlign: 'center' }}
                                  >
                                    {stans}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    variant="body1"
                                    display="block"
                                    component="span"
                                    style={{ fontWeight: 400, color: '#A0B1C6', textAlign: 'center' }}
                                  >
                                    Stans
                                  </Typography>
                                </Grid>
                          </Grid>
                      </Grid>
                      <Grid item>
                          <Grid container spacing={1} justify='center'>
                                <Grid item>
                                  <Typography
                                    variant="body1"
                                    display="block"
                                    component="span"
                                    style={{ fontWeight: 700, textAlign: 'center' }}
                                  >
                                    {following}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Typography
                                    variant="body1"
                                    display="block"
                                    component="span"
                                    style={{ fontWeight: 400, color: '#A0B1C6', textAlign: 'center' }}
                                  >
                                    Following
                                  </Typography>
                                </Grid>
                          </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                        <Button
                          type="button"
                          color="primary"
                          variant="contained"
                          className={classes.buttonStyle}
                          component={CustomRouterLink}
                          to={{ pathname: `/profile/${userData.username}`, state:{ type: 'profile', userid: userData.userid } }}
                          disableElevation
                        >
                          Profile
                        </Button>
                    </Grid>
                </Grid>
                <Divider light />
                <List component="nav" className={classes.root} aria-label="mobile menu">
                  <ListItem
                    button
                    onClick={handleBookmarks}
                    >
                    <ListItemIcon>
                      <BookmarkBorderOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bookmarks" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={handleOpenLists}
                     >
                    <ListItemIcon>
                      <FormatListBulletedOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lists" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={handleOpenSettings}
                    >
                    <ListItemIcon>
                      <SettingsOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </List>
                <Divider light />
                <List component="nav" className={classes.root} aria-label="mobile menu">
                  <ListItem
                    button
                    onClick={handleContact}
                    >
                    <ListItemIcon>
                      <HeadsetMicOutlinedIcon style={{ color: '#04011D', fontSize: 21 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Contact Us"
                      primaryTypographyProps={{
                        classes:{ body1: classes.settingsTitleStyle }
                      }}
                       />
                  </ListItem>
                  <ListItem
                    button
                    onClick={handleFaq}
                    >
                    <ListItemIcon>
                      <LiveHelpOutlinedIcon style={{ color: '#04011D', fontSize: 21 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="FAQ"
                      primaryTypographyProps={{
                        classes:{ body1: classes.settingsTitleStyle }
                      }}
                       />
                  </ListItem>
                  <ListItem
                    button
                    onClick={handleTerms}
                    >
                    <ListItemIcon>
                      <AssignmentOutlinedIcon style={{ color: '#04011D', fontSize: 21 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Terms"
                      primaryTypographyProps={{
                        classes:{ body1: classes.settingsTitleStyle }
                      }}
                       />
                  </ListItem>

                  <ListItem
                    button
                    onClick={handlePolicy}
                    >
                    <ListItemIcon>
                      <SecurityIcon style={{ color: '#04011D', fontSize: 21 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary="Privacy & Policy"
                      primaryTypographyProps={{
                        classes:{ body1: classes.settingsTitleStyle }
                      }}
                       />
                  </ListItem>
                  <Divider light />
                  <ListItem
                    button
                    onClick={logout}
                  >
                    <ListItemIcon>
                      <ExitToAppOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Paper>
             </Slide>
           </div>
       </Backdrop>
     </div>
   );
};

MobileMenu.propTypes = {
  onCloseMenu: PropTypes.func,
  openMenu: PropTypes.bool
};

export default MobileMenu;
