import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  Grid,
  Fab,
  useMediaQuery,
  useTheme,
  GridList,
  Divider,
  InputBase,
  IconButton,
  Button,
  FormHelperText,
  InputLabel,
  InputAdornment,
  Hidden,
  Icon
} from '@material-ui/core';
//import ComponentSlider from "@kapost/react-component-slider";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import SettingsInputAntennaOutlinedIcon from '@material-ui/icons/SettingsInputAntennaOutlined';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SvgIcon from '@material-ui/core/SvgIcon';
import CloseIcon from '@material-ui/icons/Close';
import { Topbar, MobileTopbar } from '../components';
import SERVICES from '../../util/webservices';
import { history } from '../../helpers';
import { UsersTable } from './components';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ImageIcon(props) {
  return (
    <SvgIcon {...props} width="22.173" height="22.173" viewBox="0 0 22.173 22.173">
      <g transform="translate(-6.6 -6.6)">
        <path d="M9.722,7.5H25.278A2.222,2.222,0,0,1,27.5,9.722V25.278A2.222,2.222,0,0,1,25.278,27.5H9.722A2.222,2.222,0,0,1,7.5,25.278V9.722A2.222,2.222,0,0,1,9.722,7.5Z" transform="translate(0 0)"/>
        <path d="M20.833,19.167A1.667,1.667,0,1,1,19.167,17.5,1.667,1.667,0,0,1,20.833,19.167Z" transform="translate(-5.556 -5.556)"/>
        <path d="M30.278,30.556,24.722,25,12.5,37.222" transform="translate(-2.778 -9.722)"/>
      </g>
    </SvgIcon>
  );
}

function VideoIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 33.229 21.8">
      <g transform="translate(-1.6 -11.6)">
        <path d="M50,17.5,40,24.643l10,7.143Z" transform="translate(-16.071 -2.143)"/>
        <path d="M5.357,12.5H21.071a2.857,2.857,0,0,1,2.857,2.857V29.643A2.857,2.857,0,0,1,21.071,32.5H5.357A2.857,2.857,0,0,1,2.5,29.643V15.357A2.857,2.857,0,0,1,5.357,12.5Z" transform="translate(0 0)"/>
      </g>
    </SvgIcon>
  );
}

const useStyles = makeStyles(theme => ({
  root: {

  },
  body: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
    }
  },
  storyArea: {
    overflow: 'hidden'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
  },
  storyContainer: {
    border: '1px solid #F2F4F7',
    borderRadius: 8,
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(1),
      border: 'none',
      borderBottom: '1px solid #F2F4F7',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    }
  },
  composeContainer: {
    border: '1px solid #F2F4F7',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    }
  },
  postsContainer: {
    marginTop: 20
  },

  storyBack4: {
    height: 150,
    width: 125,
    padding: 10,
  },

  gridList: {
   flexWrap: 'nowrap',
   transform: 'translateZ(0)',
 },
 smallAvatar: {
   width: 25,
   height: 25,
   border: '1px solid #fff'
 },
 primaryAvtr: {
    color: '#fff',
    backgroundColor: '#2688FB',
    width: 25,
    height: 25
  },
  storyName: {
    color: '#fff',
    fontWeight: 300,
    height: '80%',
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: 13
  },
  iconStyle: {
    fontSize: 11
  },
  dividerSpacing: {
    marginLeft: 15,
    marginRight: 15
  },
  margin: {
   margin: 1,
   fontSize: 12,
   width: '100%'
 },
 divCompose: {
   width: '45%'
 },
 gridAction: {
   width: '55%',
 },
  liveroot: {
    height: 150,
    width: 125,
   },
 media: {
   height: 0,
   paddingTop: '56.25%', // 16:9
 },
 cardContent: {
   padding: '5px 16px 16px 16px'
 },
 likesBody: {
   marginTop: 10
 },
commentsBody: {
   marginTop: 15
 },
 primaryTextStyles: {
   color: '#04011D',
   fontWeight: 600
 },
 buttonStyle: {
   textTransform: 'none',
   fontSize: 12,
   WebkitBoxShadow: 'none',
   MozBoxShadow: 'none',
   boxShadow: 'none',
   borderStyle: 'solid',
   borderRadius: 70,
   borderWidth: 1,
   fontWeight: 400,
   marginLeft: '5%',
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
 buttonProgress: {
   color: '#2688fb',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)'
 },

 closeButton: {
   position: 'absolute',
   right: theme.spacing(1),
   top: theme.spacing(1),
   color: theme.palette.grey[500],
 },
 titleStyle: {
   margin: 0,
   padding: theme.spacing(2),
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between'
 },
 dialogContentStyle: {
   padding: theme.spacing(2),
 },
 dialogActionStyle: {
   margin: 0,
   padding: theme.spacing(1),
 },
 textField: {
   position: 'relative',
   fontSize: 12,
   width: '100%',
   padding: '5px 10px',
   color: '#04011D'
 },
 input: {
   '&::placeholder': {
      color: '#A1A9B3',
      fontSize: 14
    },
 },
 mediaInput: {
   display: 'none'
 },
 imgStyle: {
   objectFit: 'cover',
   width: 540,
   height: 320
 },
 vidStyle: {
   width: 540,
   height: 320
 },
 drawerWidth: {
   width: 400,
 },

 formRoot:{
  maxHeight: '100%'
},

}));

const Users = () => {
  const classes = useStyles();

  const theme = useTheme();
  const getSize = useMediaQuery(theme.breakpoints.up('md'));

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
    defaultMatches: true
  });

  const [postLoading, setPostLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [usersList, setUsersList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [suspendLoading, setSuspendLoading] = useState(false);

  

  const [toggleDrawer, setToggleDrawer] = useState();

  /*  beamsClient.start()
    .then(() => beamsClient.addDeviceInterest('hello'))
    .then(() => console.log('Successfully registered and subscribed!'))
    .catch(e => console.error('Could not get device interest', e)); */


/*  const renderLeftArrow = () => getSize ? <Fab color="primary" aria-label="Previous"><ArrowLeftIcon /></Fab> :
<Fab size="small" color="primary" aria-label="Previous"><ArrowLeftIcon /></Fab>;
const renderRightArrow = () => getSize ? <Fab color="primary" aria-label="Next"><ArrowRightIcon /></Fab> :
<Fab size="small" color="primary" aria-label="Next"><ArrowRightIcon /></Fab>; */


  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }

/*  BeamsClient.getUserId()
  .then(userId => {
    // Check if the Beams user matches the user that is currently logged in
    if (userId !== userData.userid) {
        // Unregister for notifications
        return BeamsClient.stop();
    }
  })
  .catch(console.error); */

  useEffect(() => {

    handleUsersList();


  }, []);



  const handleUsersList = () => {
    if(!loading) {
      setLoading(true);

      SERVICES.get(`user/all`)
      .then(response => {
           setLoading(false);
           setUsersList(response.data.data);
           setFilteredUsers(response.data.data);
      })
      .catch(function (error) {
        setLoading(false);
        const errRes = error.response;
        if(errRes.status === 401 && errRes.data.message === 'You dont have permission for this action') {
          localStorage.removeItem('stansAdmin');
          localStorage.removeItem('stansonlyadmin');
          history.push('/');
        }
        console.log(errRes);
      })
    }
  }

  const handleFilter = query => {
    let newList = [];
    console.log(query);
    newList = query ? usersList.filter(users => String(users.fullname).includes(query)) : usersList;
    console.log(newList);
    setFilteredUsers(newList);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setSuccess(false);
};

const handleFailed = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setFailed(false);
};


  return (
    <div className={classes.root}>
      <Hidden mdDown>
        <Topbar title={'Users'} />
      </Hidden>
      <div className={classes.body}>
          {loading && <Icon className="fas fa-circle-notch fa-spin" style={{ color: '#2688FB', fontSize: 40, position: 'relative', top: 40, left: '50%', }} />}
          <UsersTable usersList={filteredUsers} handleFilter={handleFilter} handleSuccess={handleSuccess} handleFailed={handleFailed} setSuccessMsg={setSuccessMsg} setServerError={setServerError} />
      </div>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccess}>
        <Alert onClose={handleSuccess} severity="success">
          {successMsg}
       </Alert>
      </Snackbar>

      <Snackbar open={failed} autoHideDuration={6000} onClose={handleFailed}>
        <Alert onClose={handleFailed} severity="error">
          {serverError}
       </Alert>
      </Snackbar>

    </div>

  );
};

export default Users;
