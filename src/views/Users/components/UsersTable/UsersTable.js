import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
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
  Avatar,
  Typography,
  Button,
  Drawer,
  Grid
} from '@material-ui/core';
import { TableToolbar, TableHeader, UsersToolbar } from './components';
import NumberFormat from 'react-number-format';
import SERVICES from '../../../../util/webservices';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const useStyles = makeStyles(theme => ({
  root: {},
  cardRoot: {
    marginTop: theme.spacing(2)
  },
  content: {
    padding: 0
  },
  table: {
    minWidth: 1050
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
   width: 400
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
  padding: '10px 20px',
  '&$focused': {
    backgroundrColor: '#F2F6FC',
  },
  '&:hover': {
   backgroundColor: '#F2F6FC',
 },
},
textArea: {
  position: 'relative',
  backgroundColor: '#F2F4F7',
  border: '1px solid #fff',
  width: '100%',
  borderRadius: '10px',
  transition: theme.transitions.create(['background-color']),
  padding: '10px 20px',
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
}));


const UsersTable = props => {

  const { className, usersList, handleFilter, handleSuccess, handleFailed, setSuccessMsg, setServerError, ...rest } = props;

  const classes = useStyles();
  let history = useHistory();

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('fullname');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [suspendLoading, setSuspendLoading] = useState(false);
  const [toggleDrawer, setToggleDrawer] = useState();

  const [profilePic, setProfilePic] = useState(null);
  const [resFullname, setFullname] = useState('');
  const [resEmail, setEmail] = useState('');
  const [resLocation, setLocation] = useState('');
  const [subscribePrice, setSubscribePrice] = useState('');
  const [resPhoneNo, setPhoneNo] = useState('');


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleCloseDrawer = () => {
    setToggleDrawer(false);
  }

  const handlOpenDrawer = id => {
      setToggleDrawer(true);
      let selectedData = usersList.filter(datas => datas.id === id);
      // let textsDatas = originalData.filter(textsData => textsData.postType === "text");
      console.log("SELECTED:" + JSON.stringify(selectedData));
    //  setSelectedList(selectedData);
      setProfilePic(selectedData[0].profilePicUrl);
      setFullname(selectedData[0].fullname);
      setLocation(selectedData[0].location);
      setEmail(selectedData[0].email);
      setPhoneNo(selectedData[0].mobileNumber);
      setSubscribePrice(selectedData[0].subscribePrice);

  }

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

  const handleSuspend = () => {
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
        const errRes = error.response;
        if(errRes.status === 401 && errRes.data.message === 'You dont have permission for this action') {
          localStorage.removeItem('stansAdmin');
          localStorage.removeItem('stansonlyadmin');
          history.push('/');
        }
        console.log(errRes);
        setServerError(error.response);
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
        const errRes = error.response;
        if(errRes.status === 401 && errRes.data.message === 'You dont have permission for this action') {
          localStorage.removeItem('stansAdmin');
          localStorage.removeItem('stansonlyadmin');
          history.push('/');
        }
        console.log(errRes);
        setServerError(error.response);
        handleFailed();
      })
    }
  }

  return (

      <div
      {...rest}
      className={clsx(classes.root, className)}>

        <UsersToolbar handleSearchChange={handleSearchChange} />
        <Card className={classes.cardRoot}>
          <CardContent className={classes.content}>
            <PerfectScrollbar>
                <TableToolbar />
                  <TableContainer>
                      <Table
                        className={classes.table}
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
                            .map((row, index) => {
                                  return (
                                    <TableRow
                                       hover
                                       role="button"
                                       tabIndex={-1}
                                       key={row.id}
                                       onClick={()=>handlOpenDrawer(row.id)}
                                     >
                                      <TableCell component="th" id={row.id} scope="row">
                                        {row.fullname}
                                      </TableCell>
                                      <TableCell>
                                        {row.email}
                                      </TableCell>
                                      <TableCell>
                                        {row.mobileNumber}
                                      </TableCell>
                                      <TableCell>
                                        {row.location}
                                      </TableCell>
                                      <TableCell>
                                        <NumberFormat value={row.subscribePrice} displayType={'text'} thousandSeparator={true} />
                                      </TableCell>
                                      <TableCell>
                                        {moment(row.dateOfBirth).format('DD MMMM YYYY')}
                                      </TableCell>
                                   </TableRow>
                                 );
                            })}
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
        <Drawer anchor="right" open={toggleDrawer} onClose={handleCloseDrawer}>
            <div className={classes.formRoot} style={{ paddingBottom: 40}}>
              <form className={classes.form} autoComplete="off">
                 <div className={classes.popTitle}>
                     <Typography variant="h6">Profile Picture</Typography>
                 </div>
                 <div className={classes.imgArrangeStyle}>
                     <Avatar alt="avatar" src={profilePic} className={classes.profileAvatar} />
                 </div>
                <div className={classes.formArea}>
                  <InputLabel shrink htmlFor="fullname">
                    Fullname
                  </InputLabel>
                  <FormControl className={classes.formComponent}>
                    <TextField
                        id="fullname-input"
                        className={classes.textField}
                        fullWidth
                        name="fullname"
                        type="text"
                        value={resFullname}
                        InputProps={{
                          disableUnderline: true,
                          style: {fontSize: 14}
                        }}
                        aria-describedby="fullname-error"
                      />
                  </FormControl>

                  <InputLabel shrink htmlFor="email">
                    Email
                  </InputLabel>
                  <FormControl className={classes.formComponent}>
                    <TextField
                        id="email-input"
                        className={classes.textArea}
                        fullWidth
                        name="email"
                        type="text"
                        value={resEmail}
                        InputProps={{
                          disableUnderline: true,
                          style: {fontSize: 14},
                          maxLength: 160
                        }}
                        aria-describedby="email-error"
                      />
                  </FormControl>
                  <InputLabel shrink htmlFor="weblink">
                    Phone No.
                  </InputLabel>
                  <FormControl className={classes.formComponent}>
                    <TextField
                        id="phoneno-input"
                        className={classes.textField}
                        fullWidth
                        name="phoneno"
                        type="text"
                        value={resPhoneNo}
                        InputProps={{
                          disableUnderline: true,
                          style: {fontSize: 14}
                        }}
                        aria-describedby="phoneno-error"
                      />
                  </FormControl>

                  <InputLabel shrink htmlFor="location">
                    Location
                  </InputLabel>
                  <FormControl className={classes.formComponent}>
                    <TextField
                        id="location-input"
                        className={classes.textField}
                        fullWidth
                        name="location"
                        type="text"
                        value={resLocation}
                        InputProps={{
                          disableUnderline: true,
                          style: {fontSize: 14}
                        }}
                        aria-describedby="location-error"
                      />
                  </FormControl>
                  <InputLabel shrink htmlFor="dob">
                    Subscription Price
                  </InputLabel>
                  <FormControl className={classes.formComponent}>
                    <TextField
                        id="subscribe-inline"
                        className={classes.textField}
                        fullWidth
                        name="subscribe"
                        type="text"
                        value={subscribePrice}
                        InputProps={{
                          disableUnderline: true,
                          style: {fontSize: 14}
                        }}
                        aria-describedby="subscribe-error"
                      />
                  </FormControl>

                </div>
              </form>
              <Grid container justify="center" spacing={3}>
                <Grid
                  item
                  lg={3}
                  style={{ paddingLeft: 25, paddingRight: 25, paddingBottom: 30 }}
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
            </div>
        </Drawer>
      </div>
  );


}

export default UsersTable;
