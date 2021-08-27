import React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { withStyles, makeStyles } from '@material-ui/styles';
import {
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

const headCells = [
  { id: 'date', numeric: false, disablePadding: false, label: 'DATE' },
  { id: 'from', numeric: false, disablePadding: false, label: 'FROM' },
  { id: 'to', numeric: false, disablePadding: false, label: 'TO' },
  { id: 'weight', numeric: true, disablePadding: false, label: 'PKG WEIGHT (GRAMS)'},
  { id: 'distance', numeric: true, disablePadding: false, label: 'DISTANCE (METERS)' },
  { id: 'cost', numeric: true, disablePadding: false, label: `COST(${'\u20A6'})` },
  { id: 'action', numeric: true, disablePadding: false, label: 'ACTION' },
];

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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  headerColor: {
    backgroundColor: '#FFFFFF'

  },
  headerCells: {
    color: '#363a46'
  },
  headerSortLabel: {
    color: '#363a46',
    '&:active': {
      color: '#363a46'
    },
    '&:hover': {
      color: '#fff#363a46'
    },
    '&.MuiTableSortLabel-root.MuiTableSortLabel-active': {
      color: '#363a46'
    }
  }
}));

function TableHeader(props) {
  const { order, orderBy, onRequestSort } = props;
  const classes = useStyles();
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.headerColor}>
        {headCells.map(headCell => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.headerCells}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              classes={{ root: classes.headerCells, active: classes.headerCells }}
              className={classes.headerSortLabel}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeader.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default TableHeader;
