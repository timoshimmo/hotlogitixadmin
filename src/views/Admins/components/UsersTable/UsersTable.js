import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles, makeStyles } from '@material-ui/styles';
import validate from 'validate.js';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TextField,
  TableCell,
  TableRow,
  TablePagination,
  TableContainer,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Drawer,
  Chip
} from '@material-ui/core';
import { TableToolbar, TableHeader, UsersToolbar } from './components';
import SERVICES from '../../../../util/webservices';
import CircularProgress from '@material-ui/core/CircularProgress';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import MuiAlert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
//import axios from 'axios';

const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: '#FAFAFA',
    color: '#494949',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottom: '1px solid #D6D6D6',
    fontSize: 12,
  },
  body: {
    fontSize: 12,
    color: '#696F79',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottom: '1px solid #D6D6D6',
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
      backgroundColor: "#FFFFFF",
  },
}))(TableRow);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}


/*const schema = {
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
    },
    format: {
     pattern: /^[a-zA-Z0-9_]+$/,
     message: 'should only contain letters, numbers and underscore'
   }
  },
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

}; */

const addschema = {
  fullName: {
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
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 150
    }
  },
  phoneNo: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
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

const useStyles = makeStyles(theme => ({
  root: {},
  cardRoot: {
    marginTop: theme.spacing(2)
  },
  content: {
    padding: 0,
    minHeight: 265
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  formRoot:{
   maxHeight: '100%',
   width: 450
 },
 form: {
 display: 'flex',
 flexDirection: 'column',
 margin: 'auto',
 width: '100%',
 alignItems: 'center',
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

/*

<Grid container justify="flex-right" spacing={3}>
  <Grid
    item
    lg={3}
    style={{ paddingLeft: 25, paddingRight: 25 }}
    >
    <Button
      type="button"
       variant="contained"
      className={classes.unSubscribeButtonStyle}
      disabled={suspendLoading}
      onClick={handleTerminate}
      >
      Terminate
      {suspendLoading && <CircularProgress size={18} className={classes.buttonSaveProgress} />}
    </Button>

  </Grid>
   <Grid
     item
     lg={3}
     style={{ paddingLeft: 25, paddingRight: 25, paddingBottom: 30 }}
     >
     <Button
       type="button"
        variant="contained"
       className={classes.buttonStyle}
       disabled={suspendLoading}
       onClick={handleSuspend}
       >
       Suspend
       {suspendLoading && <CircularProgress size={18} className={classes.buttonSaveProgress} />}
     </Button>

   </Grid>
 </Grid>

*/


const UsersTable = props => {

  const { className, usersList, handleFilter, ...rest } = props;

  const classes = useStyles();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullname');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
//  const [suspendLoading, setSuspendLoading] = useState(false);
//  const [toggleDrawer, setToggleDrawer] = useState();

  const [toggleCreateDrawer, setToggleCreateDrawer] = useState();
  //const [loading, setLoading] = useState(false);
//  const [updateLoading, setUpdateLoading] = useState(false);
//  const [userID, setUserID] = useState('');
  //const [showNewPassword, setShowNewPassword] = useState(false);
//  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [serverError, setServerError] = useState(null);
//  const [success, setSuccess] = useState(false);
//  const [successMsg, setSuccessMsg] = useState('');
  const [failed, setFailed] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  /*const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  }); */

  const [addFormState, setAddFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
  //  const errors = validate(formState.values, schema);
    const addErrors = validate(addFormState.values, addschema);

  /*  setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    })); */

    setAddFormState(addFormState => ({
      ...addFormState,
      isValid: addErrors ? false : true,
      errors: addErrors || {}
    }));

}, [addFormState.values]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

/*  const handleCloseDrawer = () => {
    setToggleDrawer(false);
  }

  const handlOpenDrawer = id => {
      setToggleDrawer(true);
      let selectedData = usersList.filter(datas => datas.id === id);
      // let textsDatas = originalData.filter(textsData => textsData.postType === "text");
      console.log("SELECTED:" + JSON.stringify(selectedData));
    //  setSelectedList(selectedData);
    setFormState(formState => ({
      ...formState,
      values: {
          ...formState.values,
          fullname: selectedData[0].fullname,
          username: selectedData[0].username
      }
    }));
      setUserID(id);
  }
*/
  const handleCloseCreateDrawer = () => {
    setToggleCreateDrawer(false);
  }

  const handlOpenCreateDrawer = () => {
      setToggleCreateDrawer(true);

  }

/*  const handleChange = event => {
  event.persist();

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

}; */

const handleAddChange = event => {
  //event.persist();

  setAddFormState(addFormState => ({
    ...addFormState,
    values: {
      ...addFormState.values,
      [event.target.name]: event.target.value
    },
    touched: {
      ...addFormState.touched,
      [event.target.name]: true
    }
  }));

};

/*const handleClickShowNewPassword = () => {
  setShowNewPassword(!showNewPassword);
};

const handleClickShowConfirmPassword = () => {
  setShowConfirmPassword(!showConfirmPassword);
}; */

const handleClickShowPassword = () => {
  setShowPassword(!showPassword);
};

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleSearchChange = event => {
    handleFilter(event.target.value);
  }

/*  const handleSavePassword = event => {
  event.preventDefault();

  setLoading(true);

  const obj = {
     adminid: userID,
     newpassword: formState.values.newPassword,
  };

  SERVICES.post('admin/update/password', obj)
  .then(response => {
      const res = response.data;
      console.log(res);
      setLoading(false);
      setSuccessMsg('Password updated successfully');
      setSuccess(true);
      setToggleDrawer(false);

  })
.catch(error => {
    setLoading(false);
    const resError = error.response ? error.response.data.message : "Something went wrong please try again";
    console.log(resError);
    setServerError(resError);
    setFailed(true);
  })

}

const handleUpdateAdmin = event => {
  event.preventDefault();

  setUpdateLoading(true);

  const obj = {
     adminid: userID,
     fullname: formState.values.fullname,
     username: formState.values.username,
  };

  SERVICES.post('admin/update/admin', obj)
  .then(response => {
      const res = response.data;
      console.log(res);
      setUpdateLoading(false);
      setSuccessMsg('Admin info updated successfully');
      setSuccess(true);
      setToggleDrawer(false);
      window.location.reload(true);

  })
  .catch(error => {
    setUpdateLoading(false);
    const resError = error.response ? error.response.data.message : "Something went wrong please try again";
    console.log(resError);
    setServerError(resError);
    setFailed(true);
  })

}
*/
const handleSignUp = () => {

  if(!addLoading) {
    setAddLoading(true);

    const obj = {
        fullname: addFormState.values.fullName,
        email: addFormState.values.email,
        password: addFormState.values.password,
        phoneNo: addFormState.values.phoneNo,
        role: 0
    };

    SERVICES.post(`admin/register`, obj)
    .then(response => {
      console.log(response);
        setAddLoading(false);
        setToggleCreateDrawer(false);
        window.location.reload(true);
    })
    .catch(function (error) {
        setAddLoading(false);
        const resError = error.response ? error.response.data.message : "Something went wrong please try again";
        setServerError(resError);
        setFailed(true);
    })
  }
}


/*  const handleSuspend = () => {
    if(!suspendLoading) {
      setSuspendLoading(true);

      SERVICES.get(`user/suspend`)
      .then(response => {
           setSuspendLoading(false);
           setSuccessMsg('User is suspended');
           handleSuccess();

      })
      .catch(function (error) {
        setSuspendLoading(false);
        const errRes = error.response ? error.response.data.message : "Something went wrong please try again";
        if(errRes.status === 401 && errRes.data.message === 'You dont have permission for this action') {
          localStorage.removeItem('stansAdmin');
          localStorage.removeItem('stansonlyadmin');
          history.push('/');
        }
        console.log(errRes);
        setServerError(errRes);
        handleFailed();
      })
    }
  }

  const handleTerminate = () => {
    if(!suspendLoading) {
      setSuspendLoading(true);

      SERVICES.get(`user/terminate`)
      .then(response => {
           setSuspendLoading(false);
           setSuccessMsg('User is terminated');
           handleSuccess();

      })
      .catch(function (error) {
        setSuspendLoading(false);
        const errRes = error.response ? error.response.data.message : "Something went wrong please try again";
        if(errRes.status === 401 && errRes.data.message === 'You dont have permission for this action') {
          localStorage.removeItem('stansAdmin');
          localStorage.removeItem('stansonlyadmin');
          history.push('/');
        }
        console.log(errRes);
        setServerError(errRes);
        handleFailed();
      })
    }
  }
*/
/*  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false; */

  const hasAddError = field =>
    addFormState.touched[field] && addFormState.errors[field] ? true : false;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersList.length) : 0;

  return (

      <div
      {...rest}
      className={clsx(classes.root, className)}>

        <UsersToolbar handleSearchChange={handleSearchChange} />
        <Card className={classes.cardRoot}>
          <CardContent className={classes.content}>
            <PerfectScrollbar>
                <TableToolbar handlOpenCreateDrawer={handlOpenCreateDrawer} />
                  <TableContainer>
                      <Table
                        aria-labelledby="tables"
                        aria-label="users table">

                        <TableHeader
                         order={order}
                         orderBy={orderBy}
                         onRequestSort={handleRequestSort}
                       />
                          <TableBody>

                          { stableSort(usersList, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                  return (
                                    <StyledTableRow
                                       hover
                                       tabIndex={-1}
                                       key={row.id}
                                     >
                                      <StyledTableCell component="th" id={row.id} scope="row">
                                        {row.fullname}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row.mobileNo}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row.email}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row.role < 1 ?
                                          <Chip
                                            label="Admin"
                                            variant="outlined"
                                            size="small"
                                            classes={{ root: classes.adminStyles, label: classes.adminLabelStyle }}
                                          />
                                          :
                                          <Chip
                                            label="Super Admin"
                                            variant="outlined"
                                            size="small"
                                            classes={{ root: classes.superAdminStyles, label: classes.superAdminLabelStyle }}
                                          />
                                      }
                                      </StyledTableCell>
                                   </StyledTableRow>
                                 );
                            })}
                            {emptyRows > 0 && (
                                <StyledTableRow
                                  style={{
                                    height: 53 * emptyRows,
                                  }}
                                >
                                  <StyledTableCell colSpan={7} />
                                </StyledTableRow>
                              )}
                          </TableBody>
                       </Table>
                  </TableContainer>
            </PerfectScrollbar>
          </CardContent>
          <CardActions className={classes.actions}>
            <TablePagination
              component="div"
              count={usersList.length}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
        </CardActions>
        </Card>

        <Drawer anchor="right" open={toggleCreateDrawer} onClose={handleCloseCreateDrawer}>
          <div className={classes.formRoot} style={{ paddingBottom: 20, paddingTop: 20}}>
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
            <form className={classes.form} autoComplete="off">
              <div className={classes.popTitle}>
                  <Typography variant="h6">Create Admin User</Typography>
              </div>
              <div className={classes.formArea}>
                <InputLabel shrink htmlFor="fullName">
                  Full name
                </InputLabel>
                <FormControl error={hasAddError('fullName')} className={classes.formComponent}>
                  <TextField
                      id="fullname-input"
                      className={classes.textField}
                      fullWidth
                      name="fullName"
                      type="text"
                      onChange={handleAddChange}
                      InputProps={{
                        disableunderline: "true",
                        classes: {
                          notchedOutline: classes.notchStyle,
                          input: classes.inputStyle
                        },
                        style: {fontSize: 12}
                      }}
                      aria-describedby="fullname-error"
                    />
                    <FormHelperText id="fullname-error" classes={{ error: classes.helper }}>
                      {  hasAddError('fullName') ? addFormState.errors.fullName[0] : null }
                    </FormHelperText>
                  </FormControl>

                  <InputLabel shrink htmlFor="username">
                    Email
                  </InputLabel>
                  <FormControl error={hasAddError('username')} className={classes.formComponent}>
                    <TextField
                        id="email-input"
                        className={classes.textField}
                        fullWidth
                        name="email"
                        type="text"
                        onChange={handleAddChange}
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
                        {  hasAddError('email') ? addFormState.errors.email[0] : null }
                      </FormHelperText>
                  </FormControl>
                  <InputLabel shrink htmlFor="phoneno">
                    Phone No.
                  </InputLabel>
                  <FormControl error={hasAddError('phoneNo')} className={classes.formComponent}>
                    <TextField
                        id="phoneno-input"
                        className={classes.textField}
                        fullWidth
                        name="phoneNo"
                        type="text"
                        onChange={handleAddChange}
                        InputProps={{
                          disableunderline: "true",
                          classes: {
                            notchedOutline: classes.notchStyle,
                            input: classes.inputStyle
                          },
                          style: {fontSize: 12}
                        }}
                        aria-describedby="phoneno-error"
                      />
                      <FormHelperText id="phoneno-error" classes={{ error: classes.helper }}>
                        {  hasAddError('phoneNo') ? addFormState.errors.phoneNo[0] : null }
                      </FormHelperText>
                  </FormControl>
                    <InputLabel shrink htmlFor="password">
                      Password
                    </InputLabel>
                    <FormControl error={hasAddError('password')} className={classes.formComponent}>
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
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>,
                      disableunderline: "true",
                      classes: {
                        notchedOutline: classes.notchStyle,
                        input: classes.inputStyle
                      },
                      style: {fontSize: 12}
                      }}
                      name="password"
                      onChange={handleAddChange}
                      type={showPassword ? "text" : "password"}
                      aria-describedby="password-error"
                      />
                      <FormHelperText id="password-error" classes={{ error: classes.helper }}>
                        {  hasAddError('password') ? addFormState.errors.password[0] : null }
                      </FormHelperText>
                  </FormControl>
                  <Button
                    className={classes.buttonStyle}
                    fullWidth
                    size="large"
                    type="button"
                    onClick={handleSignUp}
                    variant="contained"
                    disabled={ addLoading }
                  >
                    Create Admin
                    {addLoading && <CircularProgress size={20} className={classes.buttonSaveProgress} />}
                  </Button>
              </div>
            </form>
          </div>
        </Drawer>

      </div>
  );
}

UsersTable.propTypes = {
  className: PropTypes.string,
  usersList: PropTypes.array,
  handleFilter: PropTypes.func
};

export default UsersTable;
