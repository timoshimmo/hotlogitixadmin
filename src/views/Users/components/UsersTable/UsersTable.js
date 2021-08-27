import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
//import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles, makeStyles } from '@material-ui/styles';
//import { useHistory } from 'react-router-dom';
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
  Avatar,
  Typography,
  Drawer,
} from '@material-ui/core';
import { TableToolbar, TableHeader, UsersToolbar } from './components';

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

const schema = {
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
   maxWidth: '100%',
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
  fontSize: 11,
  color: 'red'
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

permitStyle: {
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
  backgroundColor: '#4caf50',
  borderColor: '#fff',
  color: '#fff',
  '&:hover': {
     WebkitBoxShadow: 'none',
     MozBoxShadow: 'none',
     boxShadow: 'none',
     backgroundColor: '#388e3c',
     color: "#fff",
   },
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


const UsersTable = props => {

  const { className, usersList, handleFilter, ...rest } = props;

  const classes = useStyles();
//  let history = useHistory();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('fullname');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [toggleDrawer, setToggleDrawer] = useState();
  const [resFullname, setFullname] = useState('');
  const [resEmail, setEmail] = useState('');
  const [resPhoneNo, setPhoneNo] = useState('');

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));

}, [formState.values]);

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
      setFullname(selectedData[0].fullname);
      setEmail(selectedData[0].email);
      setPhoneNo(selectedData[0].mobileNo);

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
                <TableToolbar />
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
                                       onClick={()=>handlOpenDrawer(row.id)}
                                     >
                                      <StyledTableCell component="th" id={row.id} scope="row">
                                        {row.fullname}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row.email}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row.mobileNo}
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
        <Drawer anchor="right" open={toggleDrawer} onClose={handleCloseDrawer}>
            <div className={classes.formRoot} style={{ paddingBottom: 20, paddingTop: 20, paddingRight: 20}}>
              <form className={classes.form} autoComplete="off">
                 <div className={classes.popTitle}>
                     <Typography variant="h6">Profile Picture</Typography>
                 </div>
                 <div className={classes.imgArrangeStyle}>
                     <Avatar alt="avatar" src="" className={classes.profileAvatar} />
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
                        disabled
                        name="fullname"
                        type="text"
                        value={resFullname}
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
                  </FormControl>

                  <InputLabel shrink htmlFor="email">
                    Email
                  </InputLabel>
                  <FormControl className={classes.formComponent}>
                    <TextField
                        id="email-input"
                        className={classes.textField}
                        fullWidth
                        disabled
                        name="email"
                        type="text"
                        value={resEmail}
                        InputProps={{
                          disableunderline: "true",
                          classes: {
                            notchedOutline: classes.notchStyle,
                            input: classes.inputStyle
                          },
                          style: {fontSize: 12},
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
                        disabled
                        name="phoneno"
                        type="text"
                        value={resPhoneNo}
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
                  </FormControl>

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
