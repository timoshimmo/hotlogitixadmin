import React, { useState, useEffect }from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Grid,
  Avatar,
  List,
  Icon
} from '@material-ui/core';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import { SuggestionsComponent } from './components';
import SERVICES from '../../../../util/webservices';
import CircularProgress from '@material-ui/core/CircularProgress';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { RightTopbar } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    maxHeight: '100vh',
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    position: 'sticky',
    right: 0,
    top: 0,
  },
  bodyStyle: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    right: 0
  },
  buttonProgress: {
    color: '#2688fb',
    position: 'absolute',
    top: '30%',
    left: '40%',
    transform: 'translate(-40%, -30%)',
  },
  noDataBody: {
    marginTop: 40
  },
  listStyle: {
    maxHeight: '100%',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));


/*
<div className={classes.suggestedContainer}>


</div>

*/
const Rightbar = props => {

  //  const { open, variant, onClose, className, ...rest } = props;
    const { className, ...rest } = props;
    const classes = useStyles();

    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState(null);

    let userData = {};
    if (typeof localStorage !== 'undefined') {
        const user = localStorage.getItem('user');
        if(user !== null) {
          const data = JSON.parse(user);
          userData = data;
        }
    }

    useEffect(() => {
        handleSuggestions();
    }, []);

    const handleSuggestions = () => {

      if(!loading) {
        setLoading(true);

        SERVICES.get(`user/suggestions/${userData.userid}`)
        .then(response => {
            setLoading(false);
            if(response.data.status === "success") {
                setSuggestions(response.data.data);
            }
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          console.log(error.response);
          const resError = error.response ? error.response.data.message : "Something went wrong please try again";
          setServerError(resError);
        });
      }


    }

    const handleFilter = (obj, userid) => {

      if(!loading) {
        setLoading(true);

        SERVICES.post(`user/filter/${userData.userid}`, obj)
        .then(response => {
            setLoading(false);
            if(response.data.status === "success") {
                setSuggestions(response.data.data);
            }
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          console.log(error.response);
          const resError = error.response ? error.response.data.message : "Something went wrong please try again";
          setServerError(resError);
        });
      }


    }

    const suggestedUsers = () => {
        return suggestions.map(function(object, i) {
            return <SuggestionsComponent obj={object} idx={i}  />;
        })
    }

    return (

      <div className={classes.root}>
        <RightTopbar refreshAction={handleSuggestions} filterData={handleFilter} />
        <div className={classes.bodyStyle}>
          {loading ? (<Icon className="fas fa-circle-notch fa-spin" style={{ color: '#2688FB', fontSize: 40, position: 'relative', top: 40, left: '45%', }} />)
            :
            (
              suggestions.length > 0 ?
              (
                <List className={classes.listStyle}>
                    {suggestedUsers()}
                </List>
              )
              :
              (
                <Grid container spacing={1} justify="center" className={classes.noDataBody}>
                  <Grid item>
                      <AccountBoxIcon color="secondary" />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" component="span" color="textSecondary">
                        No Profile Found
                    </Typography>
                  </Grid>
                </Grid>
              )
            )
          }
        </div>
      </div>
    );

};

Rightbar.propTypes = {
  className: PropTypes.string,
};

export default Rightbar;
