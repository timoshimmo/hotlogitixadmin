import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TableContainer,
  Button,
  Tab
} from '@material-ui/core';
import { TableToolbar, TableHeader, UsersToolbar } from './components';
import NumberFormat from 'react-number-format';

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
  }
}));


const UsersTable = props => {

  const { className, usersList, handleFilter, ...rest } = props;

  const classes = useStyles();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('dateOTransaction');
  const [selectedCards, setSelectedCards] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [page, setPage] = useState(0);
  const [selectedList, setSelectedList] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, usersList.length - page * rowsPerPage);

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
                                     >
                                      <TableCell component="th" id={row.id} scope="row">
                                        {row.userid.username}
                                      </TableCell>
                                      <TableCell>
                                        {row.purpose}
                                      </TableCell>
                                      <TableCell>
                                        {row.recipientid.username}
                                      </TableCell>
                                      <TableCell>
                                        <NumberFormat value={row.amount} displayType={'text'} thousandSeparator={true} />
                                      </TableCell>
                                      <TableCell>
                                        {moment(row.dateofTransaction).format('DD/MM/YYYY hh:mm:ss A')}
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
      </div>
  );


}

export default UsersTable;
