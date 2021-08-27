import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';

const schema = {
  fullName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 5,
      maximum: 100,
      message: 'must be at least 5 characters'
    },
    format: {
     pattern: /^[a-zA-Z ]+$/,
     message: 'should only contain letters'
   }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 150
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
    backgroundImage: 'linear-gradient(0deg, rgba(0, 12, 25, 1), rgba(83, 92, 101, 0), rgba(85, 94, 103, 1)), url(/images/start_image.jpg)',
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
    flexDirection: 'column',
    background: 'linear-gradient(150deg, rgba(80, 86, 104, 1), rgba(80, 86, 104, 1), rgba(54, 58, 70, 0))',
    backgroundRepeat: "no-repeat",
    backgroundSize: 'cover'
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
  buttonStyle: {
    marginTop: theme.spacing(3),
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 70,
    borderColor: '#fff',
    textTransform: 'none',
    fontSize: 14,
    minHeight: 50,
    fontWeight: 400,
    color: '#fff',
    font: 'Helvetica Neue',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: "#fff",
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
    textAlign: 'center',
    marginTop: 10
  },
  redirectLink: {
    color: theme.palette.text.primary,
    fontSize: 13,
    textDecoration: 'none'
  },
  socialGrid: {
    marginTop: 10,
    marginBottom: 10
  },
  titleTextStyle: {
    fontSize: '1.5rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
    [theme.breakpoints.down(375)]: {
      fontSize: '1.25rem',
      fontWeight: 500,
    }
  },
  subTitle: {
    marginBottom: 20,
    fontSize: 13,
    color: theme.palette.text.primary,
    [theme.breakpoints.down(375)]: {
        fontSize: 12,
    }
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
  inputStyle: {
    padding: '7px 10px 7px 10px'
  },
  notchStyle: {
    border: 'none'
  },
  inputRootStyle: {
    paddingRight: 0
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
const SignUp = () => {
  const classes = useStyles();
  //let history = useHistory();

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
//  const [socialLoading, setSocialLoading] = React.useState(false);

  useEffect(() => {

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

  const handleSignUp = () => {
    if(!loading) {
      setLoading(true);

      const obj = {
          fullname: formState.values.fullName,
          email: formState.values.email,
          password: formState.values.password,
          role: 0
      };

      axios.post('https://hotlogistixapi.herokuapp.com/admin/register', obj)
      .then(response => {
        setLoading(false);
        const res = response;
        console.log(res);
        setSuccess(true);
        /*if(res.status === "success") {

        //  history.push('/signin');
        } */
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        setServerError(resError);
      })
    }
  }

/*  const getReference = () => {
		  let text = "";
		  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

		  for( let i=0; i < 10; i++ )
			  text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
	 } */

/*  const handleSignUp = () => {

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


{loading && <CircularProgress size={28} className={classes.buttonProgress} />}


  <Collapse in={!success}>
*/

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
                src="/images/hotlogistix_logo_white.png"
                height="80"
                width="154"
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
                      Welcome to Hotlogistix Admin
                    </Typography>
                    <Typography
                      variant="body2"
                      display="block"
                      gutterBottom
                      className={classes.subTitle}
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
                      <InputLabel shrink htmlFor="fullName">
                        Full name
                      </InputLabel>
                      <FormControl error={hasError('fullName')} className={classes.formComponent}>
                        <TextField
                            id="fullname-input"
                            className={classes.textField}
                            fullWidth
                            name="fullName"
                            type="text"
                            onChange={handleChange}
                            InputProps={{
                              disableUnderline: true,
                              marginDense: true,
                              classes: {
                                notchedOutline: classes.notchStyle,
                                input: classes.inputStyle
                              },
                              style: {fontSize: 12}
                            }}
                            aria-describedby="fullname-error"
                          />
                          <FormHelperText id="fullname-error" classes={{ error: classes.helper }}>
                            {  hasError('fullName') ? formState.errors.fullName[0] : null }
                          </FormHelperText>
                        </FormControl>

                        <InputLabel shrink htmlFor="email">
                          Email
                        </InputLabel>
                        <FormControl error={hasError('email')} className={classes.formComponent}>
                          <TextField
                              id="email-input"
                              className={classes.textField}
                              fullWidth
                              name="email"
                              type="text"
                              onChange={handleChange}
                              InputProps={{
                                disableUnderline: true,
                                marginDense: true,
                                classes: {
                                  notchedOutline: classes.notchStyle,
                                  input: classes.inputStyle
                                },
                                style: {fontSize: 12}
                              }}
                              aria-describedby="email-error"
                            />
                            <FormHelperText id="email-error" classes={{ error: classes.helper }}>
                              {  hasError('email') ? formState.errors.email[0] : null }
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
                                onClick={handleClickShowPassword}
                              >
                                {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                              </IconButton>
                            </InputAdornment>,
                              disableUnderline: true,
                              marginDense: true,
                              classes: {
                                root: classes.inputRootStyle,
                                notchedOutline: classes.notchStyle,
                                input: classes.inputStyle
                              },
                              style: {fontSize: 12}
                            }}
                            name="password"
                            onChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            aria-describedby="password-error"
                            />
                            <FormHelperText id="password-error" classes={{ error: classes.helper }}>
                              {  hasError('password') ? formState.errors.password[0] : null }
                            </FormHelperText>
                        </FormControl>
                        <Button
                          className={classes.buttonStyle}
                          fullWidth
                          size="large"
                          type="button"
                          variant="contained"
                          onClick={handleSignUp}
                          disabled={loading}
                        >
                          Sign Up
                          {loading && <CircularProgress size={20} className={classes.buttonProgress} />}
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
