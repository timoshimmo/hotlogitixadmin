import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import clsx from 'clsx';
import { Link as RouterLink, withRouter, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Typography,
  Paper,
  InputAdornment,
  FormControl,
  InputLabel
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import MuiAlert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Icon from '@material-ui/core/Icon';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const schema = {
  fullname: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 5,
      maximum: 100
    },
    format: {
     pattern: /^[a-zA-Z ]+$/,
     message: 'should only contain letters'
   }
  },
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 20
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 15,
      message: 'must be at least 6 characters'
    }
  }
};
//

//^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)” + “(?=.*[-+_!@#$%^&*., ?]).+$

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F4F6F8',
    minHeight: '100vh'
  },
  grid: {
    minHeight: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundImage: 'linear-gradient(0deg, rgba(0, 12, 25, 1), rgba(83, 92, 101, 0), rgba(85, 94, 103, 1)), url(/images/humphrey-muleba-unsplash.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    padding: '40px 20px'
  },
  quoteInner: {
    textAlign: 'left',
    flexBasis: '600px'
  },
  quoteText: {
    color: '#fff',
    fontWeight: 300,
    fontSize: 13
  },
  name: {
    color: '#fff'
  },
  bio: {
    color: '#fff'
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    paddingTop: '5%',
    justifyContent: 'flex-start',
    paddingLeft: '20%',
    paddingRight: '20%',
    paddingBottom: '5%',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '8%',
      paddingRight: '8%'
    }
  },
  formPaper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10%',
    paddingLeft: '15%',
    paddingRight: '15%',
    paddingBottom: '10%',
    [theme.breakpoints.down(375)]: {
      paddingLeft: '10%',
      paddingRight: '10%',
    }
  },
  formBody: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  form: {
    width: '100%'
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    position: 'relative',
    backgroundColor: '#F2F4F7',
    border: '1px solid #fff',
    width: '100%',
    borderRadius: '70px',
    transition: theme.transitions.create(['background-color']),
    padding: '5px 20px',
    '&$focused': {
      backgroundrColor: '#F2F6FC',
    },
    '&:hover': {
     backgroundColor: '#F2F6FC',
   },
  },
  focused: {},
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 70,
    borderColor: '#fff',
    textTransform: 'none',
    fontSize: 14,
    fontWeight: 400,
    color: '#fff',
    font: 'Helvetica Neue',
    WebkitBoxShadow: 'none',
  	MozBoxShadow: 'none',
  	boxShadow: 'none',
    backgroundColor: '#2688FB',
    '&:hover': {
      backgroundColor: '#0573f0',
      color: "#fff",
      WebkitBoxShadow: 'none',
      MozBoxShadow: 'none',
      boxShadow: 'none',
    }
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonProgress: {
    color: theme.palette.primary,
    position: 'absolute',
    top: '45%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  card: {
    display: 'flex',
    marginBottom: 15
  },
  cover: {
    width: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  contentWarning: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  btnTwitter: {
    color: '#1DA1F2',
    backgroundColor: theme.palette.primary.contrastText,
    borderColor: '#1DA1F2',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 70,
    textTransform: 'none',
    fontSize: 12,
    padding: '10px 0px',
    fontWeight: 400,
    font: 'Helvetica Neue',
    width: '100%',
    '&:hover': {
      backgroundColor: '#1DA1F2',
      color: theme.palette.primary.contrastText,
    },
  },
  btnFacebook: {
    color: '#4267B2',
    backgroundColor: theme.palette.primary.contrastText,
    borderColor: '#4267B2',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 70,
    textTransform: 'none',
    fontSize: 12,
    padding: '10px 0px',
    fontWeight: 400,
    font: 'Helvetica Neue',
    width: '100%',
    '&:hover': {
      backgroundColor: '#4267B2',
      color: theme.palette.primary.contrastText,
    },
  },
  btnGoogle: {
    color: '#4885ed',
    backgroundColor: theme.palette.primary.contrastText,
    borderColor: '#4885ed',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 70,
    textTransform: 'none',
    fontSize: 12,
    padding: '10px 0px',
    fontWeight: 400,
    font: 'Helvetica Neue',
    width: '100%',
    '&:hover': {
      backgroundColor: '#4885ed',
      color: theme.palette.primary.contrastText,
    },
  },
  dividerContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  dividerStyle: {
    width: '48%',
    color: '#f3f3f3',
    backgroundColor: '#f3f3f3',
    borderColor: '#f3f3f3',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  orStyle: {
    color: '#A2A9B5',
    marginLeft: 5,
    marginRight: 5,
    fontWeight: 300,
    fontSize: 13,
    [theme.breakpoints.down(375)]: {
        fontSize: 12,
    }
  },
  formComponent: {
    width: '100%',
    marginBottom: theme.spacing(2),
    fontSize: 10
  },
  inputLabel: {
    color: '#04011D',
    fontSize: 14,
    fontWeigt: 300,
  },
  already: {
    fontSize: 12,
    color: '#BFC9D5',
    textAlign: 'center'
  },
  redirectLink: {
    color: '#010E1C',
    fontSize: 13,
    textDecoration: 'none'
  },
  socialGrid: {
    marginTop: 10,
    marginBottom: 10
  },
  subtitleSpacing: {
    marginBottom: 20,
    fontSize: 13,
    [theme.breakpoints.down(375)]: {
        fontSize: 12,
    }
  },
  helper: {
    fontSize: 11
  },
  iconsStyle: {
    fontSize: '20px !important',
    [theme.breakpoints.down(375)]: {
      fontSize: '16px !important',
    }
  },
  titleTextStyle: {
    fontSize: '1.5rem',
    color: '#04011D',
    fontWeight: 500,
    [theme.breakpoints.down(375)]: {
      fontSize: '1.25rem',
      fontWeight: 500,
    }
  }
}));

/*const clientId = '631148650233-8jnn4i4t1ttk4ohuq8t4207en3rk6fju.apps.googleusercontent.com';
const firebaseConfig = {
    apiKey: "AIzaSyCfTbVa9cunVXvSocm0CkAYEY5F8Inx3zU",
    authDomain: "stansonly.firebaseapp.com",
    projectId: "stansonly",
    storageBucket: "stansonly.appspot.com",
    messagingSenderId: "631148650233",
    appId: "1:631148650233:web:3a62ec0bfa9a23dbe30c28"
  };

firebase.initializeApp(firebaseConfig);

*/
const SignUp = props => {
  const classes = useStyles();
  let history = useHistory();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [serverError, setServerError] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState(false);

  useEffect(() => {
    loadCSS(
     'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
     document.querySelector('#font-awesome-css'),
   );

    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const getReference = () => {
		  let text = "";
		  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

		  for( let i=0; i < 10; i++ )
			  text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
	 }

  const handleSignUp = () => {

    if(!loading) {
      setLoading(true);

      const obj = {
          fullname: formState.values.fullname,
          username: formState.values.username,
          password: formState.values.password,
      };

      axios.post('https://api.stansonly.com/admin/register', obj)
      .then(response => {
        setLoading(false);
        const res = response.data;
        console.log(res);
        if(res.status === "success") {
          setSuccess(true);
        //  history.push('/signin');
        }
        else {
          setOpen(true);
          setServerError(res.data.message);
        }
      })
      .catch(function (error) {
        console.log(error.response);
        setLoading(false);
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        setServerError(resError);
      })
    }
  }



  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

    return (

      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
        >
          <Grid
            className={classes.quoteContainer}
            item
            lg={4}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="button" display="block" gutterBottom>
                 Stansonly Admin
                </Typography>
                <div className={classes.person}>
                  <Typography
                    className={classes.name}
                    variant="h6"
                    display="block"
                    gutterBottom
                  >
                    Jordan Smart
                  </Typography>
                  <Typography
                    className={classes.bio}
                    variant="caption"
                    display="block"
                    gutterBottom
                  >
                    Cras eu elit congue, placerat dui ut, tincidunt nisl. Nulla leo elit, pharetra bibendum justo quis, cursus consectetur erat. Nulla leo elit, pharetra bibendum justo quis, cursus consectetur erat
                  </Typography>
                </div>
              </div>
            </div>
          </Grid>
          <Grid
            item
            lg={8}
            xs={12}
          >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <img
                alt="Logo"
                src="/images/Stansoly_new_blue.png"
                height="60"
                width="80"
              />
            </div>
            <div className={classes.contentBody}>
            <Collapse in={success}>
                  <MuiAlert
                    severity="success"
                    >
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      component="h6"
                      variant="h6"
                    >
                      Admin account has been successfully created.
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="span">

                      Go right ahead and sign in to start performing admin services
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="body2"
                      className={classes.already}
                    >
                       Back to sign{'   '}
                      <Link
                        component={RouterLink}
                        to="/signin"
                        variant="h6"
                        className={classes.redirectLink}

                      >
                        Sign in
                      </Link>
                    </Typography>
                  </MuiAlert>
              </Collapse>
              <Collapse in={!success}>
                <Paper className={classes.formPaper} elevation={1}>
                  <div className={classes.formBody}>
                    <Typography
                      variant="h5"
                      display="block"
                      gutterBottom
                      align="center"
                      className={classes.titleTextStyle}
                    >
                      Welcome to Stansonly
                    </Typography>
                    <Typography
                      variant="body2"
                      display="block"
                      gutterBottom
                      className={classes.subtitleSpacing}
                      align="center"
                    >
                      Sign up to start performing admin services!
                    </Typography>
                     <Collapse in={open}>
                        <MuiAlert
                          severity="error"
                          action={
                             <IconButton
                               aria-label="close"
                               color="inherit"
                               size="small"
                               onClick={() => {
                                 setOpen(false);
                               }}
                             >
                               <CloseIcon fontSize="inherit" />
                             </IconButton>
                           }
                          >
                          <Typography
                            color="textSecondary"
                            variant="body2"
                            className={classes.helper}
                          >
                              {serverError}
                          </Typography>
                       </MuiAlert>
                    </Collapse>
                     <form
                        className={classes.form}
                        autoComplete="off"
                      >
                      <InputLabel shrink htmlFor="fullname">
                        Full name
                      </InputLabel>
                      <FormControl error={hasError('fullname')} className={classes.formComponent}>
                        <TextField
                            id="fullname-input"
                            className={classes.textField}
                            fullWidth
                            name="fullname"
                            type="text"
                            onChange={handleChange}
                            disabled={socialLoading}
                            InputProps={{
                              disableUnderline: true,
                              style: {fontSize: 12}
                            }}
                            aria-describedby="fullname-error"
                          />
                          <FormHelperText id="fullname-error" classes={{ error: classes.helper }}>
                            {  hasError('fullname') ? formState.errors.fullname[0] : null }
                          </FormHelperText>
                        </FormControl>

                        <InputLabel shrink htmlFor="username">
                          Username
                        </InputLabel>
                        <FormControl error={hasError('username')} className={classes.formComponent}>
                          <TextField
                              id="username-input"
                              className={classes.textField}
                              fullWidth
                              name="username"
                              type="text"
                              onChange={handleChange}
                              disabled={socialLoading}
                              InputProps={{
                                disableUnderline: true,
                                style: {fontSize: 12}
                              }}
                              aria-describedby="username-error"
                            />
                            <FormHelperText id="username-error" classes={{ error: classes.helper }}>
                              {  hasError('username') ? formState.errors.username[0] : null }
                            </FormHelperText>
                        </FormControl>
                          <InputLabel shrink htmlFor="password">
                            Password
                          </InputLabel>
                          <FormControl error={hasError('password')} className={classes.formComponent}>
                          <TextField
                            id="password-input"
                            className={classes.textField}
                            fullWidth
                            InputProps={{
                              endAdornment: <InputAdornment position="end">
                              <IconButton
                                size='small'
                                aria-label="toggle password visibility"
                                onClick={e => handleClickShowPassword()}
                              >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>,
                              disableUnderline: true,
                              style: {fontSize: 12}
                            }}
                            name="password"
                            onChange={handleChange}
                            disabled={socialLoading}
                            type={showPassword ? "text" : "password"}
                            aria-describedby="password-error"
                            />
                            <FormHelperText id="password-error" classes={{ error: classes.helper }}>
                              {  hasError('password') ? formState.errors.password[0] : null }
                            </FormHelperText>
                        </FormControl>
                        <Button
                          className={classes.signUpButton}
                          fullWidth
                          size="large"
                          type="button"
                          onClick={handleSignUp}
                          variant="contained"
                          disabled={ loading }
                        >
                          Sign Up
                          {loading && <CircularProgress size={28} className={classes.buttonProgress} />}
                        </Button>

                        <Typography
                          color="textSecondary"
                          variant="body2"
                          className={classes.already}
                        >
                          Already have an account?{' '}
                          <Link
                            component={RouterLink}
                            to="/signin"
                            variant="h6"
                            className={classes.redirectLink}

                          >
                            Sign in
                          </Link>
                        </Typography>
                      </form>
                  </div>
                </Paper>
              </Collapse>
            </div>
          </div>
        </Grid>
        </Grid>
      </div>
    );

};

export default withRouter(SignUp);
