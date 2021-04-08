import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: '100%'
  },
  content: {
    height: '100%',
    minHeight: '100%',
    backgroundColor: '#F4F6F8'
  }
}));

const Minimal = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
