import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Grid, Typography } from '@material-ui/core';
import { AppBar, Toolbar, Badge, Hidden, IconButton, InputAdornment, Button, FormControl } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import TuneIcon from '@material-ui/icons/Tune';
import CachedIcon from '@material-ui/icons/Cached';
import SearchIcon from '@material-ui/icons/Search';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SvgIcon from '@material-ui/core/SvgIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Popover from '@material-ui/core/Popover';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles(theme => ({

  root: {
    boxShadow: 'none'
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
  },
  leftCol: {
     paddingTop: 25,
     paddingLeft: 40,
     width: 225

  },
  rightCol: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    width: "100%"
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
    zIndex: 1000,
    backgroundColor: '#fff'
  },
  dropdown: {
      transition: theme.transitions.create(["transform"], {
        duration: theme.transitions.duration.short
      })
    },
    dropdownOpen: {
      transform: "rotate(-180deg)"
    },
    dropdownClosed: {
      transform: "rotate(0)"
    },
    checkroot: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    checkIcon: {
      borderRadius: 3,
      width: 16,
      height: 16,
      boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
      backgroundColor: '#f5f8fa',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
      '$root.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
      },
      'input:hover ~ &': {
        backgroundColor: '#ebf1f5',
      },
      'input:disabled ~ &': {
        boxShadow: 'none',
        background: 'rgba(161, 169, 179,.5)',
        backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      },
    },
    checkedIcon: {
      backgroundColor: '#2688FB',
      backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
      '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
      },
      'input:hover ~ &': {
        backgroundColor: '#137cbd',
      },
    },
    frmControlLabelStyleRoot: {
      width: '100%',
      marginLeft: 0,
      marginRight: 0,
      paddingRight: 7
    },
    frmControlLabelStyleLabel: {
      fontSize: 14,
      fontWeight: 400,
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      position: 'absolute',
      left: 20
    },
    filterCancelButton: {
      textTransform: 'none',
      fontSize: 12,
      fontWeight: 400
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
    }
  }));

  function RefreshIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 22.545 18.16">
        <g transform="translate(-1.228 -6.606)">
          <path d="M47.955,10v5.455H42.5" transform="translate(-25.454 -1.587)"/>
          <path d="M2.5,40.455V35H7.955" transform="translate(0 -17.496)"/>
          <path d="M4.782,12.959A8.182,8.182,0,0,1,18.283,9.9h0L22.5,13.868M2.5,17.5l4.218,3.964a8.185,8.185,0,0,0,13.483-3l.018-.057"/>
        </g>
      </SvgIcon>
    );
  }

  function FilterIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 18.164 21.8">
        <g transform="translate(24.764 -1.6) rotate(90)">
          <path d="M10,41.364V35" transform="translate(-4.773 -17.5)"/>
          <path d="M10,13.864V7.5" transform="translate(-4.773)"/>
          <path d="M30,38.182V30" transform="translate(-17.5 -14.318)"/>
          <path d="M30,12.045V7.5" transform="translate(-17.5)"/>
          <path d="M50,44.545V40" transform="translate(-30.227 -20.682)"/>
          <path d="M50,15.682V7.5" transform="translate(-30.227)"/>
          <path d="M2.5,35H7.955" transform="translate(0 -17.5)"/>
          <path d="M22.5,20h5.455" transform="translate(-12.727 -7.955)"/>
          <path d="M42.5,40h5.455" transform="translate(-25.455 -20.682)"/>
        </g>
      </SvgIcon>
    );
  }

  function StyledCheckbox(props) {
    const classes = useStyles();

    return (
      <Checkbox
        className={classes.checkroot}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.checkIcon, classes.checkedIcon)} />}
        icon={<span className={classes.checkIcon} />}
        inputProps={{ 'aria-label': 'decorative checkbox' }}
        {...props}
      />
    );
  }

  const RightTopbar = props => {
    const { className, onSidebarOpen, refreshAction, filterData, ...rest } = props;

    const classes = useStyles();

    const [checkedData, setCheckedData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const openPostMenu = Boolean(anchorEl);
    const checkid = openPostMenu ? 'simple-popover' : undefined;
    const [checkProfilePic, setCheckProfilePic] = useState(false);
    const [checkStans, setCheckStans] = useState(false);
    const [checkCreators, setCheckCreators] = useState(false);
    const [checkFree, setCheckFree] = useState(false);

    const [checkState, setCheckState] = useState({
      profilepic: false,
      stans: false,
      creators: false,
      free: false,
    });

  //  const [openDrawer, setOpenDrawer] = useState(false);

    const handleFilterMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleFilterMenuClose = () => {
      setAnchorEl(null);
    };

    const handleCheckProfile = (event) => {
    //  setCheckProfilePic(event.target.checked);
      const profilePicObj = {"profilePicUrl" : { "$ne": "" }};
      setCheckProfilePic(true);
      setCheckedData([...checkedData, profilePicObj]);
      if(!event.target.checked) {
        setCheckProfilePic(false);
        let filteredArray = checkedData.filter(item => !!item.profilePicUrl === false);
        console.log("Filtered Array: " + JSON.stringify(filteredArray));
        setCheckedData(filteredArray);
      }

    }

    const handleCheckStans = (event) => {
    //  setCheckProfilePic(event.target.checked);
      const stansObj = {"stans" : { "$exists": true, "$ne": [] }};
      setCheckStans(true);
      setCheckedData([...checkedData, stansObj]);
      if(!event.target.checked) {
        setCheckStans(false);
        let filteredArray = checkedData.filter(item => !!item.stans === false);
        console.log("Filtered Array: " + JSON.stringify(filteredArray));
        setCheckedData(filteredArray);
      }

    }

    const handleCheckCreators= (event) => {
    //  setCheckProfilePic(event.target.checked);
      const creatorObj = {"contentCreator" : { "$ne": false }};
      setCheckCreators(true);
      setCheckedData([...checkedData, creatorObj]);
      if(!event.target.checked) {
        setCheckCreators(false);
        let filteredArray = checkedData.filter(item => !!item.contentCreator === false);
        console.log("Filtered Array: " + JSON.stringify(filteredArray));
        setCheckedData(filteredArray);
      }

    }

    const handleCheckFree = (event) => {
    //  setCheckProfilePic(event.target.checked);
      const freeObj = {"subscribePrice" : { "$gt": 0 }};
    //  console.log(profilePicObj);
      setCheckFree(true);
      setCheckedData([...checkedData, freeObj]);
      if(!event.target.checked) {
        setCheckFree(false);
        let filteredArray = checkedData.filter(item => !!item.subscribePrice === false);
        console.log("Filtered Array: " + JSON.stringify(filteredArray));
        setCheckedData(filteredArray);
      }

    }

    /*const handleCheckChange =(event) => {
      setCheckState({...checkState, [event.target.name]: event.target.checked});
      if(event.target.name === "profilepic" && event.target.checked) {
        const profilePicObj = {"profilePicUrl" : { "$ne": "" }};
        setCheckedData({...checkedData, profilePicObj});
      }
    } */

     const handleFilter = () => {
       filterData(checkedData);
       console.log("CHECKED DATA: " + JSON.stringify(checkedData));

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
              className={classes.rightCol}
            >
              <Grid container spacing={1} direction="row" justify="flex-start">
                <Typography
                  variant="h6"
                  display="block"
                  className={classes.txtSuggestions}
                >
                  Suggestions for you
                </Typography>
              </Grid>
              <Grid container spacing={1} direction="row" justify="flex-end">
                <Hidden mdDown>
                  <IconButton
                    color="inherit"
                    disableFocusRipple={true}
                    disableRipple={true}
                    onClick={refreshAction}
                  >
                    <RefreshIcon fontSize="small" style={{ fill:'none', stroke:'#2688fb', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:1.8 }} />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    aria-describedby={checkid}
                    disableFocusRipple={true}
                    disableRipple={true}
                    onClick={handleFilterMenuClick}
                  >
                    <FilterIcon fontSize="small" style={{ fill:'none', stroke:'#2688fb', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:1.8 }} />
                  </IconButton>
                </Hidden>
                <Popover
                   id={checkid}
                   anchorEl={anchorEl}
                   open={openPostMenu}
                   onClose={handleFilterMenuClose}
                   PaperProps={{
                     style: { width: 200 }
                    }}
                   anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                 >
                 <FormControl component="fieldset" style={{ width: '100%' }}>
                   <FormGroup aria-label="position" style={{ width: '100%' }}>
                      <FormControlLabel
                        value="profilepic"
                        control={<StyledCheckbox name="profilepic" onChange={handleCheckProfile} checked={checkProfilePic} />}
                        label="Profile Picture"
                        labelPlacement="start"
                        classes={{ root: classes.frmControlLabelStyleRoot, label: classes.frmControlLabelStyleLabel }}
                      />
                    </FormGroup>
                  </FormControl>
                  <FormControl component="fieldset" style={{ width: '100%' }}>
                    <FormGroup aria-label="position" style={{ width: '100%' }}>
                       <FormControlLabel
                         value="stans"
                         control={<StyledCheckbox name="stans" onChange={handleCheckStans} checked={checkStans} />}
                         label="Stans"
                         labelPlacement="start"
                         classes={{ root: classes.frmControlLabelStyleRoot, label: classes.frmControlLabelStyleLabel }}
                       />
                     </FormGroup>
                   </FormControl>
                   <FormControl component="fieldset" style={{ width: '100%' }}>
                     <FormGroup aria-label="position" style={{ width: '100%' }}>
                        <FormControlLabel
                          value="creators"
                          control={<StyledCheckbox name="creators" onChange={handleCheckCreators} checked={checkCreators}  />}
                          label="Content Creators"
                          labelPlacement="start"
                          classes={{ root: classes.frmControlLabelStyleRoot, label: classes.frmControlLabelStyleLabel }}
                        />
                      </FormGroup>
                    </FormControl>
                    <FormControl component="fieldset" style={{ width: '100%' }}>
                      <FormGroup aria-label="position" style={{ width: '100%' }}>
                         <FormControlLabel
                           value="free"
                           control={<StyledCheckbox name="free" onChange={handleCheckFree} checked={checkFree} />}
                           label="Free Subscription"
                           labelPlacement="start"
                           classes={{ root: classes.frmControlLabelStyleRoot, label: classes.frmControlLabelStyleLabel }}
                         />
                       </FormGroup>
                     </FormControl>
                     <Grid
                       container
                       justify="space-evenly"
                       style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 70 }}
                       >
                       <Button
                         onClick={handleFilterMenuClose}
                         className={classes.filterCancelButton}
                         >
                         Cancel
                       </Button>
                       <Button
                         variant="contained"
                         className={classes.buttonStyle}
                         style= {{ fontSize: 12 }}
                         onClick={handleFilter}
                         >
                         Done
                       </Button>
                     </Grid>
                 </Popover>
                <Hidden lgUp>
                  <IconButton
                    color="inherit"
                    onClick={onSidebarOpen}
                  >
                    <MenuIcon fontSize="small" />
                  </IconButton>
                </Hidden>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
    );

};

RightTopbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default RightTopbar;
