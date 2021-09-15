import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Hidden,
  Typography,
  Button,
  Drawer,
  Grid,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
  TextField
} from '@material-ui/core';
import validate from 'validate.js';
import SERVICES from '../../util/webservices';
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MuiAlert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Leftbar, Topbar } from './components';
import firebase from "firebase/app";

const passSchema = {
  newPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 15,
      message: 'must be at least 6 characters'
    }
  },
  confirmPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 15,
      message: 'must be at least 6 characters'
    },
    equality: "newPassword"
  }

};

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    maxHeight: '100vh',
    backgroundColor: '#fff',
    maxWidth: '100% !important',
    overflowX: 'hidden !important',
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
    backgroundColor: theme.palette.primary.main,
    flexDirection: 'column',
    alignItems: 'center',
    width: '17%',
    position: 'sticky',
    right: 0,
    top: 0,
    borderRight: '1px solid #F2F4F7',
  },
  mainDiv: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    width: '83%',
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
  },
  inputInfoStyle: {
    fontSize: 10
  },
  formRoot:{
   maxHeight: '100%',
   width: 450,
 },
 form: {
 display: 'flex',
 flexDirection: 'column',
 margin: 'auto',
 width: '100%',
 paddingTop: 20
},
formControl: {
 marginTop: theme.spacing(2),
 minWidth: 120,
},

formComponent: {
  width: '100%',
  marginBottom: theme.spacing(2),
  fontSize: 10
},

textField: {
  position: 'relative',
  backgroundColor: '#F2F4F7',
  border: '1px solid #fff',
  width: '100%',
  borderRadius: '70px',
  transition: theme.transitions.create(['background-color']),
  padding: '5px 10px',
  '&$focused': {
    backgroundrColor: '#F2F6FC',
  },
  '&:hover': {
   backgroundColor: '#F2F6FC',
 },
},
focused: {},
helper: {
  fontSize: 11
},
formArea: {
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  width: '100%',
  marginTop: 15,
  paddingLeft: 25,
  paddingRight: 25
},
mediaInput: {
  display: 'none'
},

buttonSaveProgress: {
  color: '#2688fb',
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
},
popTitle: {
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
  marginBottom: 15
},
imgArrangeStyle: {
  position: 'relative',
  display: 'flex',
  marginBottom: 15,
  width: '100%',
  justifyContent: 'center'
},

profileAvatar: {
  width: 140,
  height: 140,
  border: '4px solid #fff',
  background: '#e1e1e1',
},
popIconUpload: {
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: 14
},
popIconBtnUpload: {
  backgroundColor: theme.palette.text.secondary,
  position: 'absolute',
  top:'50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  opacity: 1,
  zIndex: 200
},
profileBack: {
  height: 250,
  background: '#f6f6f6',
  width: '100%'
},
buttonStyle: {
  marginTop: theme.spacing(1),
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 70,
  borderColor: '#fff',
  textTransform: 'none',
  fontSize: 14,
  minHeight: 50,
  fontWeight: 400,
  marginBottom: 25,
  color: '#fff',
  font: 'Helvetica Neue',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: "#fff",
  }
},
unSubscribeButtonStyle: {
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
  backgroundColor: "#d32f2f",
  borderColor: '#fff',
  color: '#fff',
  '&:hover': {
     WebkitBoxShadow: 'none',
     MozBoxShadow: 'none',
     boxShadow: 'none',
     backgroundColor: '#c62828',
     color: "#fff",
   },
},

adminStyles: {
  color: '#3f51b5',
  borderColor: '#3f51b5'
},
adminLabelStyle: {
  color: '#3f51b5',
  fontSize: 11
},
superAdminStyles: {
  color: '#ff3d00',
  borderColor: '#ff3d00'
},
superAdminLabelStyle: {
  color: '#ff3d00',
  fontSize: 11
},
inputStyle: {
  padding: '7px 10px 7px 10px'
},
notchStyle: {
  border: 'none'
},
}));

const Main = props => {
  const { children } = props;

  const classes = useStyles();
  const [toggleDrawer, setToggleDrawer] = useState();
  const [loading, setLoading] = useState(false);
//  const [emailLoading, setEmailLoading] = useState(false);
  const [passLoading, setPassLoading] = useState(false);
  //const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [failed, setFailed] = useState(false);

  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const user = firebase.auth().currentUser;

  useEffect(() => {
    const errors = validate(formState.values, passSchema);

    if (user !== null) {
      const displayName = user.displayName;
      const email = user.email;
      const phoneNumber = user.phoneNumber;

      setEmail(email);
      setFullname(displayName);
      setPhoneNumber(phoneNumber);
    }

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

}, [formState.values]);

const handleCloseDrawer = () => {
   setToggleDrawer(false);
 }

 const handlOpenDrawer = () => {
    setToggleDrawer(true);
 }

 const handleChange = event => {
   //event.persist();
   if(event.target.name === "fullName") {
     setFullname(event.target.value);
   }
   if(event.target.name === "emailAddress") {
     setEmail(event.target.value);
   }
   if(event.target.name === "phoneNo") {
     setPhoneNumber(event.target.value);
   }
 }

 const handlePassChange = event => {
   //event.persist();

   setFormState(formState => ({
     ...formState,
     values: {
       ...formState.values,
       [event.target.name]: event.target.value
     },
     touched: {
       ...formState.touched,
       [event.target.name]: true
     }
   }));
 }

 const handleClickShowNewPassword = () => {
   setShowNewPassword(!showNewPassword);
 };

 const handleClickShowConfirmPassword = () => {
   setShowConfirmPassword(!showConfirmPassword);
 };


 const handleUpdateAdmin = event => {
   event.preventDefault();
   if (user !== null) {
     const userid = user.uid;
     setPassLoading(true);

     const obj = {
        fullname: fullname,
        phoneNo: phoneNumber,
        email: email,
        uid: userid
     };

     SERVICES.post(`admin/update`, obj)
     .then(response => {
       console.log(response);
        setLoading(false);
        setSuccessMsg("Profile Updated Successfully");
        setSuccess(true);
     })
     .catch(error => {
       setLoading(false);
       setServerError('Error: There was a problem', error);
       setFailed(true);
     });
   }
 }

 const handleSavePassword = event => {
    event.preventDefault();
    setPassLoading(true);

    const newPassword = formState.values.newPassword;

    user.updatePassword(newPassword).then(() => {
      setPassLoading(false);
      window.location.reload(true);
    }).catch((error) => {
      setPassLoading(false);
      setServerError('Error: There was a problem', error);
      setFailed(true);
    });
 }

 const hasError = field =>
     formState.touched[field] && formState.errors[field] ? true : false;

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
          <Hidden mdDown>
            <Topbar title={'HotLogistix'} handlOpenDrawer={handlOpenDrawer}/>
          </Hidden>
            <main className={classes.content}>
              {children}
            </main>
        </div>
      </div>
      <Drawer anchor="right" open={toggleDrawer} onClose={handleCloseDrawer}>
          <div className={classes.formRoot} style={{ paddingBottom: 20, paddingTop: 20}}>
            <form className={classes.form} autoComplete="off">
              <div className={classes.formArea}>
                <Collapse in={failed}>
                  <MuiAlert
                    severity="error"
                    action={
                       <IconButton
                         aria-label="close"
                         color="inherit"
                         size="small"
                         onClick={() => {
                           setFailed(false);
                         }}
                       >
                         <CloseIcon fontSize="inherit" />
                       </IconButton>
                     }
                    >
                    {serverError}
                 </MuiAlert>
              </Collapse>
              <Collapse in={success}>
                <MuiAlert
                  severity="success"
                  action={
                     <IconButton
                       aria-label="close"
                       color="inherit"
                       size="small"
                       onClick={() => {
                         setSuccess(false);
                       }}
                     >
                       <CloseIcon fontSize="inherit" />
                     </IconButton>
                   }
                  >
                  {successMsg}
               </MuiAlert>
            </Collapse>
                <div className={classes.popTitle}>
                    <Typography variant="h6">Admin Details</Typography>
                </div>
                <InputLabel shrink htmlFor="fullName">
                  Fullname
                </InputLabel>
                <FormControl className={classes.formComponent}>
                  <TextField
                      id="fullname-input"
                      className={classes.textField}
                      fullWidth
                      name="fullName"
                      type="text"
                      defaultValue={fullname}
                      InputProps={{
                        disableunderline: "true",
                        classes: {
                          notchedOutline: classes.notchStyle,
                          input: classes.inputStyle
                        },
                        style: {fontSize: 12}
                      }}
                    />
                    <FormHelperText className={classes.inputInfoStyle}>
                      Your fullname
                    </FormHelperText>
                </FormControl>

                <InputLabel shrink htmlFor="emailAddress">
                  Email
                </InputLabel>
                <FormControl className={classes.formComponent}>
                  <TextField
                      id="email-input"
                      className={classes.textField}
                      fullWidth
                      name="emailAddress"
                      type="text"
                      onChange={handleChange}
                      defaultValue={email}
                      InputProps={{
                        disableunderline: "true",
                        classes: {
                          notchedOutline: classes.notchStyle,
                          input: classes.inputStyle
                        },
                        style: {fontSize: 12}
                      }}
                    />
                    <FormHelperText className={classes.inputInfoStyle}>
                      Your registered email used to login
                    </FormHelperText>
                </FormControl>

                <InputLabel shrink htmlFor="phoneNo">
                  Phone Number
                </InputLabel>
                <FormControl className={classes.formComponent}>
                  <TextField
                      id="phoneNo-input"
                      className={classes.textField}
                      fullWidth
                      name="phoneNo"
                      type="text"
                      defaultValue={phoneNumber}
                      InputProps={{
                        disableunderline: "true",
                        classes: {
                          notchedOutline: classes.notchStyle,
                          input: classes.inputStyle
                        },
                        style: {fontSize: 12}
                      }}
                    />
                    <FormHelperText className={classes.inputInfoStyle}>
                      Your registered phone number
                    </FormHelperText>
                </FormControl>
                <Grid container>
                   <Grid
                     item
                     lg={12}
                     >
                     <Button
                       fullWidth
                       variant="contained"
                       className={classes.buttonStyle}
                       disabled={ loading }
                       onClick={handleUpdateAdmin}
                       >
                       Save
                       {loading && <CircularProgress size={20} className={classes.buttonSaveProgress} />}
                     </Button>

                   </Grid>
                 </Grid>
              </div>

               <div className={classes.formArea}>

                <div className={classes.popTitle}>
                    <Typography variant="h6">Change Admin Password</Typography>
                </div>
                <InputLabel shrink htmlFor="newPassword">
                  New Password
                </InputLabel>
                <FormControl error={hasError('newPassword')} className={classes.formComponent}>
                  <TextField
                      id="newpassword-input"
                      className={classes.textField}
                      fullWidth
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      onChange={handlePassChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                        <IconButton
                          size='small'
                          aria-label="toggle new password visibility"
                          onClick={handleClickShowNewPassword}
                        >
                          {showNewPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>,
                        disableunderline: "true",
                        classes: {
                          notchedOutline: classes.notchStyle,
                          input: classes.inputStyle
                        },
                        style: {fontSize: 12}
                      }}
                      aria-describedby="newpassword-error"
                    />
                    <FormHelperText id="newpassword-error" classes={{ error: classes.helper }}>
                      {  hasError('newPassword') ? formState.errors.newPassword[0] : null }
                    </FormHelperText>
                </FormControl>

                <InputLabel shrink htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <FormControl error={hasError('confirmPassword')} className={classes.formComponent}>
                  <TextField
                      id="confirmpassword-input"
                      className={classes.textField}
                      fullWidth
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={handlePassChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">
                        <IconButton
                          size='small'
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                        >
                          {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>,
                        disableunderline: "true",
                        classes: {
                          notchedOutline: classes.notchStyle,
                          input: classes.inputStyle
                        },
                        style: {fontSize: 12}
                      }}
                      aria-describedby="confirmpassword-error"
                    />
                    <FormHelperText id="confirmpassword-error" classes={{ error: classes.helper }}>
                      {  hasError('confirmPassword') ? formState.errors.confirmPassword[0] : null }
                    </FormHelperText>
                </FormControl>
              </div>
            </form>
            <Grid container>
               <Grid
                 item
                 lg={12}
                 style={{ textAlign: "right", paddingLeft: 25, paddingRight: 25, paddingTop: 10, paddingBottom: 40 }}
                 >
                 <Button
                   variant="contained"
                   fullWidth
                   className={classes.buttonStyle}
                   disabled={ passLoading || !formState.values.newPassword || !formState.values.confirmPassword || hasError('confirmPassword') }
                   onClick={handleSavePassword}
                   >
                   Save Password
                   {passLoading && <CircularProgress size={20} className={classes.buttonSaveProgress} />}
                 </Button>

               </Grid>
             </Grid>
          </div>
      </Drawer>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Main;
