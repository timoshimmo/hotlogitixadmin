import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { makeStyles } from '@material-ui/core/styles';
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';

const headCells = [
  { id: 'reporter', numeric: false, disablePadding: false, label: 'Reporter' },
  { id: 'reported', numeric: false, disablePadding: false, label: 'Reported' },
  { id: 'target', numeric: false, disablePadding: false, label: 'Target' },
  { id: 'reson', numeric: false, disablePadding: false, label: 'Location' },
  { id: 'dateCreated', numeric: false, disablePadding: false, label: 'Date' },
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
