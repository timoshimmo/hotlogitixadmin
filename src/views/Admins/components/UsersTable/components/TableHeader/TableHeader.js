import React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core/styles';
import {
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

const headCells = [
  { id: 'fullname', numeric: false, disablePadding: false, label: 'Full Name.' },
  { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
];

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
    backgroundColor: '#2688FB'

  },
  headerCells: {
    color: '#fff'
  },
  headerSortLabel: {
    color: '#fff',
    '&:active': {
      color: '#fff'
    },
    '&:hover': {
      color: '#fff'
    },
    '&.MuiTableSortLabel-root.MuiTableSortLabel-active': {
      color: '#fff'
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
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
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
          </TableCell>
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
