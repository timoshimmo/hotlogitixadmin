import React, { useState, useEffect } from 'react';
import { loadCSS } from 'fg-loadcss';
import { Link as RouterLink, withRouter } from 'react-router-dom';
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
  InputLabel,
  useMediaQuery,
  useTheme
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import MuiAlert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

//const clientId = '631148650233-8jnn4i4t1ttk4ohuq8t4207en3rk6fju.apps.googleusercontent.com';

const schema = {
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

const schForgot = {
  forgotUsername: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 20
    }
  }
};

function TabContainer(props) {
  const { children, value, index } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      style={{ padding: 8 * 3, width: '100%' }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#F4F6F8',
    height: '100vh'
  },
  grid: {
    height: '100%'
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
    justifyContent: 'center',
    paddingLeft: '20%',
    paddingRight: '20%',
    paddingBottom: '5%',
    backgroundColor: '#F4F6F8',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '8%',
      paddingRight: '8%'
    }
  },
  forgotBody: {
    flexGrow: 1,
    display: 'flex',
    paddingTop: '7%',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      paddingTop: '7%'
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
    fontSize: 12,
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
    color: '#2688fb',
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
    backgroundColor: green[500],
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
  },
  lastFormComponent: {
    width: '100%',
    marginBottom: 1,
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

  titleTextStyle: {
    fontSize: '1.5rem',
    color: '#04011D',
    fontWeight: 500,
    [theme.breakpoints.down(375)]: {
      fontSize: '1.25rem',
      fontWeight: 500,
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

  formContent: {
    backgroundColor: '#F4F6F8'
  },
  iconsStyle: {
    fontSize: '20px !important',
    [theme.breakpoints.down(375)]: {
      fontSize: '16px !important',
    }
  },
  forgotArea: {
    display: 'flex',
    margin: '0px 0px 10px',
    justifyContent: 'flex-end',
  },

  backArea: {
    display: 'flex',
    margin: '10px 0px 10px',
    justifyContent: 'center',
  },
  btnForgot: {
    textTransform: 'none',
    fontSize: 12,
    color: '#2688FB',
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#2688FB',
      WebkitBoxShadow: 'none',
      MozBoxShadow: 'none',
      boxShadow: 'none',
    }
  },

  btnForgotTextPadding: {
    padding: 0
  },
  noAcctArea: {
    display: 'flex',
    justifyContent: 'center'
  },
  rememberForgot: {
    fontSize: 12,
    textAlign: 'center'
  },
  btnBackRoot: {
    minWidth: 0
  }
}));

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [forgotForm, setForgotForm] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [loading, setLoading] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [serverError, setServerError] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [openForgot, setOpenForgot] = React.useState(false);
  const [forgotLoading, setForgotLoading] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [forgottenError, setForgottenError] = React.useState(null);
  const theme = useTheme();


  useEffect(() => {

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('stansAdmin');
      localStorage.removeItem('stansonlyadmin');
    }

    loadCSS(
     'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
     document.querySelector('#font-awesome-css'),
   );

    const errors = validate(formState.values, schema);
    const errForgot = validate(forgotForm.values, schForgot);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

    setForgotForm(forgotForm => ({
      ...forgotForm,
      isValid: errForgot ? false : true,
      errors: errForgot || {}
    }));
  }, [formState.values, forgotForm.values]);

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

  const handleForgotChange = event => {
    event.persist();
    setForgotForm(forgotForm => ({
      ...forgotForm,
      values: {
        ...forgotForm.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...forgotForm.touched,
        [event.target.name]: true
      }
    }));

  /*};

  function handleChangeTab(event, newValue) {
    setValue(newValue);
  }

  */

  const handleSignIn = event => {
      event.preventDefault();

    if (!loading) {
      setLoading(true);

      const obj = {
        username: formState.values.username,
        password: formState.values.password,
        remember_me: true
      };

      axios.post('https://api.stansonly.com/admin/login', obj)
        .then(response => {
          const res = response.data;
          if (res.status === 'success') {
            localStorage.setItem('stansonlyadmin', res.data.token);
            localStorage.setItem('stansAdmin', JSON.stringify({ username: res.data.username, userid: res.data.id }));
            axios.defaults.headers.common['x-access-token'] = res.data.token;
            console.log(res);
            console.log(res.data.token);
            setLoading(false);
            history.push('/users');

          /*  setLoading(false);
            const resError = "Something went wrong please try again";
            setServerError(resError);
            setOpen(true); */
          }
          else {
            console.log(response);
          }

        })
      .catch(error => {
          setLoading(false);
          const resError = error.response ? error.response.data.message : "Something went wrong please try again";
          setServerError(resError);
          setOpen(true);
        })

    }

  }

  const handleforgotUsername = event => {

    event.preventDefault();

    if (!forgotLoading) {
      setForgotLoading(true);

      console.log("Username: " + forgotForm.values.forgotUsername);

      const obj = {
        username: forgotForm.values.forgotUsername,
      };

      axios.post('https://api.stansonly.com/user/forgot', obj)
        .then(response => {
          const res = response.data;
          setForgotLoading(false);
          setSuccessOpen(true);
          setOpenForgot(false);
          console.log(res);
        /*  if (res.status === 'success') {
            localStorage.setItem('user', JSON.stringify({ email: res.data.email, id: res.data._id, firstName: res.data.firstName, lastName: res.data.lastName }));
            localStorage.setItem('westpaytoken', res.data.token);
            history.push('/dashboard');
          }
          else {
            console.log(response.error);
          } */
        })
        .catch(error => {
          setForgotLoading(false);
          console.log(error);
          console.log(error.response);
          const resError = error.response ? error.response.data.message : "Something went wrong please try again";
          setForgottenError(resError);
          setOpenForgot(true);
        })

    }

  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const forgotError = field =>
    forgotForm.touched[field] && forgotForm.errors[field] ? true : false;

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
            md={4}
          >
            <div className={classes.quote}>
              <div className={classes.quoteInner}>
                <Typography className={classes.quoteText} variant="button" display="block" gutterBottom>
                 Stansonly Users
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
            md={8}
            xs={12}
            className={classes.formContent}
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
                <Paper className={classes.formPaper} elevation={1}>
                  <TabContainer value={value} index={0}>
                    <div className={classes.formBody}>
                      <Typography
                        variant="h5"
                        display="block"
                        gutterBottom
                        align="center"
                        className={classes.titleTextStyle}
                      >
                        Welcome to Stansonly Admin
                      </Typography>
                      <Typography
                        variant="body2"
                        display="block"
                        className={classes.subtitleSpacing}
                        align="center"
                      >
                        Sign in to start performing admin services!
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
                               className={classes.subtitleSpacing}
                              >
                              <Typography
                                color="textSecondary"
                                variant="body2"
                                style={{ fontSize: 12 }}
                              >
                                  {serverError}
                              </Typography>
                           </MuiAlert>
                        </Collapse>
                       <form
                          className={classes.form}
                          autoComplete="off"
                        >

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
                            <FormControl error={hasError('password')} className={classes.lastFormComponent}>
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
                                type={showPassword ? "text" : "password"}
                                aria-describedby="password-error"
                                />
                                <FormHelperText id="password-error" classes={{ error: classes.helper }}>
                                  {  hasError('password') ? formState.errors.password[0] : null }
                                </FormHelperText>
                            </FormControl>
                            <div className={classes.forgotArea}>
                              <Button onClick={() => setValue(1)} color="primary" className={classes.btnForgot} classes= {{ text: classes.btnForgotTextPadding }}>Forgot password?</Button>
                            </div>
                            <Button
                              className={classes.signUpButton}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              onClick={handleSignIn}
                              disabled={ loading }
                            >
                              Sign In
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
                              to="/signup"
                              variant="h6"
                              className={classes.redirectLink}

                            >
                              Sign up
                            </Link>
                          </Typography>
                        </form>
                    </div>
                  </TabContainer>
                  <TabContainer value={value} index={1}>
                    <div className={classes.content}>
                      <div className={classes.forgotBody}>
                      <form className={classes.form}>
                        <Typography
                          variant="h5"
                          display="block"
                          gutterBottom
                          align="center"
                          className={classes.titleTextStyle}
                        >
                          Forgot Password?
                        </Typography>
                        <Typography
                          variant="body2"
                          display="block"
                          className={classes.subtitleSpacing}
                          align="center"
                        >
                          Enter your username below to receive instructions to reset your password
                        </Typography>
                        <Collapse in={openForgot}>
                          <MuiAlert
                            severity="error"
                            action={
                               <IconButton
                                 aria-label="close"
                                 color="inherit"
                                 size="small"
                                 onClick={() => {
                                   setOpenForgot(false);
                                 }}
                               >
                                 <CloseIcon fontSize="inherit" />
                               </IconButton>
                             }
                            >
                            {forgottenError}
                         </MuiAlert>
                      </Collapse>
                      <Collapse in={successOpen}>
                          <MuiAlert
                            severity="success"
                            >
                          Your password has been successfully updated. Sign in to continue
                          </MuiAlert>
                          <div className={classes.backArea}>
                            <Button onClick={() => setValue(0)} color="primary" className={classes.btnForgot} classes= {{ text: classes.btnForgotTextPadding }}>Back to Sign In</Button>
                          </div>
                    </Collapse>
                      <Collapse in={!successOpen}>
                        <InputLabel shrink htmlFor="forgotUsername">
                          Username
                        </InputLabel>
                        <FormControl error={forgotError('forgotUsername')} className={classes.formComponent}>
                          <TextField
                            id="forgot-input"
                            className={classes.textField}
                            fullWidth
                            name="forgotUsername"
                            onChange={handleForgotChange}
                            type="text"
                            InputProps={{
                              disableUnderline: true,
                              style: {fontSize: 12}
                            }}
                            aria-describedby="forgot-error"
                          />

                          <FormHelperText id="forgot-error" classes={{ error: classes.helper }}>
                            {  forgotError('forgotUsername') ? forgotForm.errors.forgotUsername[0] : null }
                          </FormHelperText>
                        </FormControl>
                        <Button
                          className={classes.signUpButton}
                          disabled={ forgotLoading}
                          fullWidth
                          size="large"
                          onClick={ handleforgotUsername }
                          variant="contained"
                        >
                          Send
                          {forgotLoading && <CircularProgress size={28} className={classes.buttonProgress} />}
                        </Button>
                        <div className={classes.noAcctArea}>
                          <Typography
                            color="textSecondary"
                            variant="body2"
                            className={classes.rememberForgot}
                          >
                            Remember?{' '}
                            <Button onClick={() => setValue(0)} className={classes.btnForgot} classes= {{ text: classes.btnForgotTextPadding, root: classes.btnBackRoot }}>Go Back</Button>
                          </Typography>
                        </div>
                      </Collapse>
                      </form>
                      </div>
                    </div>
                  </TabContainer>
                </Paper>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
};

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
