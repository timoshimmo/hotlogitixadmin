import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TablePagination,
  TableContainer,
  Box,
  Button
} from '@material-ui/core';
import { TableToolbar, TableHeader, OrdersToolbar } from './components';
import NumberFormat from 'react-number-format';
import AddIcon from '@material-ui/icons/Add';

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
    paddingTop: 0,
    paddingBottom: 0,
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
  buttonStyle: {
    textTransform: 'none',
    color: theme.palette.success.main,
    fontSize: 12,
    borderColor: theme.palette.success.main,
    "&:hover": {
      borderColor: theme.palette.success.main,
    }
  },
}));


const OrdersTable = props => {

  const { className, orderList, handleFilter, ...rest } = props;

  const classes = useStyles();
  let history = useHistory();

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('dateOTransaction');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);


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

  const handleOpenAssign = id => {

    let selectedData = orderList.filter(datas => datas.id === id);

    console.log("")

    history.push({
      pathname: '/assign',
      state:{ data: selectedData }
    });
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;

  return (

      <div
      {...rest}
      className={clsx(classes.root, className)}>

        <OrdersToolbar handleSearchChange={handleSearchChange} />

        <Card className={classes.cardRoot}>
          <CardContent className={classes.content}>
            <PerfectScrollbar>
                <TableToolbar />
                  <TableContainer>
                      <Table
                        aria-labelledby="tables"
                        aria-label="orders table">

                        <TableHeader
                         order={order}
                         orderBy={orderBy}
                         onRequestSort={handleRequestSort}
                       />
                          <TableBody>

                          { stableSort(orderList, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                  return (
                                    <StyledTableRow
                                       hover
                                       tabIndex={-1}
                                       key={row.id}
                                     >
                                      <StyledTableCell component="th" id={row.id} scope="row">
                                        {moment(row.date).format('DD/MM/YYYY hh:mm:ss A')}
                                      </StyledTableCell>
                                      <StyledTableCell style={{ maxWidth: 150, whiteSpace: 'nowrap' }}>
                                        <Box
                                           component="div"
                                           my={1}
                                           textOverflow="ellipsis"
                                           overflow="hidden"
                                           bgcolor="inherit"
                                         >
                                            {row.pickup.address}
                                          </Box>
                                      </StyledTableCell>
                                      <StyledTableCell style={{ maxWidth: 150, whiteSpace: 'nowrap' }}>
                                        <Box
                                           component="div"
                                           my={2}
                                           textOverflow="ellipsis"
                                           overflow="hidden"
                                           bgcolor="inherit"
                                         >
                                           {row.delivery.address}
                                         </Box>
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.weight}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        {row.distance}
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        <NumberFormat value={row.cost} displayType={'text'} thousandSeparator={true} />
                                      </StyledTableCell>
                                      <StyledTableCell align="center">
                                        <Button
                                          variant="outlined"
                                          startIcon={<AddIcon style={{ fontSize: 14 }} />}
                                          className={classes.buttonStyle}
                                          onClick={()=>handleOpenAssign(row.id)}>
                                            Assign
                                        </Button>
                                      </StyledTableCell>
                                   </StyledTableRow>
                                 );
                            })}

                            {emptyRows > 0 && (
                                <TableRow
                                  style={{
                                    height: 53 * emptyRows,
                                  }}
                                >
                                  <TableCell colSpan={7} />
                                </TableRow>
                              )}
                          </TableBody>
                       </Table>
                  </TableContainer>
            </PerfectScrollbar>
          </CardContent>
          <CardActions className={classes.actions}>
            <TablePagination
              component="div"
              count={orderList.length}
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

OrdersTable.propTypes = {
  className: PropTypes.string,
  orderList: PropTypes.array,
  handleFilter: PropTypes.func
};

export default OrdersTable;
