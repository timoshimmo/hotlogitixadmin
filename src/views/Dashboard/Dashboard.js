import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import { OverviewArea, TripRequestArea, OrderSummaryArea } from './components'


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    background: '#efefef'
  },
  grid: {
    minHeight: '100%',
    padding: 40
  },
  areaTitle: {
    fontSize: 18,
    color: theme.palette.primary.main,
    fontWeight: 600,
    marginBottom: 20
  },
  middleAreaTitle: {
    fontSize: 18,
    color: theme.palette.primary.main,
    fontWeight: 600,
    marginTop: 30,
    marginBottom: 20
  }
}));

const Dashboard = () => {

    const classes = useStyles();

    return(
      <div className={classes.root}>
        <Grid
          className={classes.grid}
          container
          direction="column">
          <Grid
            item
            lg={12}>

            <Typography
              variant="h4"
              gutterBottom
              className={classes.areaTitle}
            >
              Overview
            </Typography>

          </Grid>
          <Grid
            item
            lg={12}>
              <OverviewArea />
          </Grid>
          <Grid
            item
            lg={12}>

            <Typography
              variant="h4"
              gutterBottom
              className={classes.middleAreaTitle}
            >
              New Orders
            </Typography>

          </Grid>
          <Grid
            item
            lg={12}>
              <TripRequestArea />
          </Grid>
          <Grid
            item
            lg={12}>

            <Typography
              variant="h4"
              gutterBottom
              className={classes.middleAreaTitle}
            >
              Orders Summary
            </Typography>
          </Grid>
          <Grid
            item
            lg={12}>
              <OrderSummaryArea />
          </Grid>
        </Grid>
      </div>
    );
}

export default Dashboard;
