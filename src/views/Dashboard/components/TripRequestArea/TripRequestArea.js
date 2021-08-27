import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  TablePagination
} from '@material-ui/core';
import DB from '../../../../util/firebaseinit';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';

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

/*
function createMeetingUpdate(date, event, assignee, priority, contact, status) {
  return { date, event, assignee, priority, contact, status };
}

const rows = [
  createMeetingUpdate('12/09/2021', 'Street Lighting Poles', 'Mr. Nyemike Onukwu', 0, '09099048059', 0),
  createMeetingUpdate('12/09/2021', 'Sidewalk drainage zone B', 'Mr. Tokmang Wang', 1, '08057527307', 1),
  createMeetingUpdate('12/09/2021', 'Waste management for Block G', 'Mr. Tobi Musa', 2, '08011223317', 1),
  createMeetingUpdate('12/09/2021', 'Water pipe repairs for Apt 4 Zone A', 'Mr. Afam Ojemeni', 0, '09081346172', 2),
  createMeetingUpdate('12/09/2021', 'Sidewalk drainage zone F', 'Mr. Mubarak Nurideen', 2, '08090233942', 0),
];

*/

const useStyles = makeStyles(theme => ({

  table: {
    maxWidth: '100%',
  },
  highStyles: {
    color: theme.palette.priority.red,
    borderColor: theme.palette.priority.red,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    fontSize: 11
  },
  mediumStyles: {
    color: theme.palette.priority.blue,
    borderColor: theme.palette.priority.blue,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    fontSize: 11
  },
  lowStyles: {
    color: theme.palette.priority.green,
    borderColor: theme.palette.priority.green,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
    fontSize: 11
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
  content: {
    padding: 0,
    minHeight: 265
  },
  actions: {
    justifyContent: 'flex-end'
  },
}));

const MeetingUpdateArea = () => {

  const classes = useStyles();
  const [orderList, setOrderList] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  useEffect(() => {
    DB.collection("trips").where("assigned", "==", false)
    .onSnapshot((querySnapshot) => {
      var arr = [];
      querySnapshot.forEach((doc) => {
          arr.push({"id": doc.id, "date": doc.data().dateCreated, "from": doc.data().pickup.address, "to": doc.data().delivery.address,
            "weight": doc.data().package.weight, "distance": doc.data().distance, "cost": doc.data().transaction.cost});
        });
        console.log("ARRAY: ", arr);
        setOrderList(arr);
    });
  }, []);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;


  return (
    <Card className={classes.cardRoot}>
      <CardContent className={classes.content}>
        <TableContainer>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>DATE</StyledTableCell>
                <StyledTableCell>FROM</StyledTableCell>
                <StyledTableCell>TO</StyledTableCell>
                <StyledTableCell align="center">PKG WEIGHT (GRAMS)</StyledTableCell>
                <StyledTableCell align="center">DISTANCE (METERS)</StyledTableCell>
                <StyledTableCell align="center">COST({'\u20A6'})</StyledTableCell>
                <StyledTableCell align="center">ACTION</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow
                    key={row.id}
                    hover
                    >
                    <StyledTableCell component="th" scope="row">
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
                          {row.from}
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
                         {row.to}
                       </Box>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                        {row.weight}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.distance}</StyledTableCell>
                    <StyledTableCell align="center">
                      {row.cost}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="outlined"
                        startIcon={<AddIcon style={{ fontSize: 14 }} />}
                        className={classes.buttonStyle}>
                          Assign
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
              ))}
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
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={orderList.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10]}
        />
    </CardActions>
    </Card>
  );

}

export default MeetingUpdateArea;
