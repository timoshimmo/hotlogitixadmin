import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  SvgIcon
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import DB from '../../../../util/firebaseinit';

function UsersIcon(props) {
  return (
    <SvgIcon {...props} width="30" height="29" viewBox="0 0 30 29">
      <path d="M24.5218 5.21612V2.53603M24.5218 5.21612L21.9729 4.38793M24.5218 5.21612L22.9465 7.38436M24.5218 5.21612L26.0971 7.38436M24.5218 5.21612L27.0707 4.38793M1.87354 26.6556C3.19155 24.3743 5.08672 22.4799 7.36864 21.1629C9.65057 19.8459 12.2389 19.1526 14.8736 19.1526C17.5083 19.1526 20.0966 19.846 22.3785 21.1631C24.6604 22.4801 26.5556 24.3745 27.8735 26.6559M22.7297 14.0215C22.0881 15.4816 21.0519 16.7338 19.7376 17.6373C18.4233 18.5408 16.883 19.0597 15.2899 19.1357C13.6968 19.2117 12.1141 18.8418 10.7198 18.0676C9.3254 17.2934 8.17466 16.1455 7.39694 14.7531C6.61921 13.3607 6.24533 11.7789 6.31733 10.1857C6.38934 8.59241 6.90438 7.05083 7.80454 5.73425C8.7047 4.41767 9.95429 3.3783 11.4128 2.73302C12.8713 2.08773 14.4809 1.8621 16.0607 2.08151" stroke="#1B75BC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
   </SvgIcon>
  );
}

function DriversIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512">
      <path d="m254 270c-74.439 0-135-60.561-135-135s60.561-135 135-135 135 60.561 135 135-60.561 135-135 135zm0-230c-52.383 0-95 42.617-95 95s42.617 95 95 95 95-42.617 95-95-42.617-95-95-95zm2 422c-13.807 0-25 11.193-25 25s11.193 25 25 25 25-11.193 25-25-11.193-25-25-25zm106 30c0-58.449-47.552-106-106-106s-106 47.551-106 106c0 11.046 8.954 20 20 20s20-8.954 20-20c0-36.393 29.607-66 66-66s66 29.607 66 66c0 11.046 8.954 20 20 20s20-8.954 20-20zm91 0c0-100.355-81.645-182-182-182h-30c-100.355 0-182 81.645-182 182 0 11.046 8.954 20 20 20s20-8.954 20-20c0-78.299 63.701-142 142-142h30c78.299 0 142 63.701 142 142 0 11.046 8.954 20 20 20s20-8.954 20-20z"/>
    </SvgIcon>
  );
}

function TripsIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 512 512">
      <g>
        <path d="M142.752,437.13c30.45,8.602,70.669,13.34,113.248,13.34s82.798-4.737,113.248-13.34   c37.253-10.523,56.142-25.757,56.142-45.275c0-19.519-18.889-34.751-56.142-45.274c-17.023-4.809-37.108-8.403-58.944-10.644   c42.761-72.986,85.136-155.627,85.136-196.498C395.44,62.552,332.888,0,256,0S116.56,62.552,116.56,139.439   c0,40.87,42.374,123.509,85.135,196.495c-21.836,2.241-41.918,5.837-58.942,10.647c-37.253,10.523-56.142,25.756-56.142,45.274   C86.61,411.373,105.499,426.606,142.752,437.13z M256,30c60.346,0,109.44,49.094,109.44,109.439   c0,30.996-38.352,112.248-102.59,217.35c-2.122,3.472-5.498,3.846-6.851,3.846c-1.352,0-4.729-0.374-6.851-3.846   c-64.238-105.102-102.59-186.353-102.59-217.35C146.56,79.094,195.654,30,256,30z M156.355,373.988   c17.885-4.555,39.314-7.752,62.413-9.415c1.603,2.644,3.198,5.266,4.783,7.859c6.966,11.398,19.096,18.201,32.448,18.201   c13.353,0,25.482-6.804,32.448-18.201c1.585-2.594,3.181-5.216,4.784-7.86c23.099,1.663,44.527,4.861,62.413,9.416   c27.416,6.983,37.432,14.844,39.491,17.866c-2.06,3.023-12.074,10.884-39.49,17.866c-27.213,6.932-62.602,10.749-99.646,10.749   s-72.433-3.817-99.645-10.749c-27.416-6.982-37.431-14.844-39.49-17.866C118.924,388.832,128.939,380.972,156.355,373.988z"/>
        <path d="M468.329,358.972c-7.263-3.989-16.382-1.336-20.369,5.924c-3.989,7.261-1.337,16.381,5.924,20.369   C471.752,395.081,482,405.963,482,415.121c0,11.201-15.87,28.561-60.413,43.694C377.582,473.767,318.775,482,256,482   s-121.582-8.233-165.587-23.185C45.87,443.683,30,426.322,30,415.121c0-9.158,10.248-20.04,28.116-29.857   c7.261-3.988,9.913-13.108,5.924-20.369c-3.989-7.26-13.106-9.913-20.369-5.924C23.749,369.916,0,388.542,0,415.121   c0,20.374,14.012,49.422,80.762,72.1C127.794,503.2,190.028,512,256,512s128.206-8.8,175.238-24.779   c66.75-22.678,80.762-51.726,80.762-72.1C512,388.542,488.251,369.916,468.329,358.972z"/>
        <path d="M312.047,129.865c0-30.903-25.143-56.045-56.047-56.045s-56.047,25.142-56.047,56.045   c0,30.904,25.143,56.046,56.047,56.046S312.047,160.77,312.047,129.865z M229.953,129.865c0-14.361,11.685-26.045,26.047-26.045   s26.047,11.684,26.047,26.045c0,14.361-11.685,26.046-26.047,26.046S229.953,144.227,229.953,129.865z"/>

      </g>
    </SvgIcon>
  );
}

function TransactionsIcon(props) {
  return (
    <SvgIcon {...props} width="30" height="29" viewBox="0 0 512.002 512.002">
      <g>
          <path d="m502.903 96.829c-6.634-7.842-15.924-12.632-26.161-13.487l-360.557-30.106c-10.238-.855-20.192 2.328-28.035 8.961-7.811 6.607-12.594 15.85-13.476 26.037l-7.254 68.056h-28.965c-21.204 0-38.455 17.251-38.455 38.455v225.702c0 21.204 17.251 38.455 38.455 38.455h361.813c21.205 0 38.456-17.251 38.456-38.455v-36.613l12.839 1.072c1.083.09 2.16.135 3.228.135 19.768 0 36.62-15.209 38.294-35.257l18.781-224.919c.854-10.237-2.329-20.193-8.963-28.036zm-464.448 79.461h361.813c10.176 0 18.456 8.279 18.456 18.455v20.566h-398.724v-20.566c0-10.176 8.279-18.455 18.455-18.455zm-18.455 59.021h398.724v41.489h-398.724zm380.268 203.591h-361.813c-10.176 0-18.455-8.279-18.455-18.455v-123.647h398.724v123.647c0 10.176-8.28 18.455-18.456 18.455zm91.667-315.702-18.781 224.919c-.847 10.141-9.788 17.706-19.927 16.856l-14.503-1.211v-169.019c0-21.204-17.251-38.455-38.456-38.455h-312.734l7.039-66.04c.008-.076.015-.151.021-.228.847-10.141 9.783-17.705 19.927-16.855l360.558 30.106c4.913.41 9.372 2.709 12.555 6.473s4.711 8.541 4.301 13.454z"/><path d="m376.873 326.532h-96.242c-5.523 0-10 4.477-10 10v62.789c0 5.523 4.477 10 10 10h96.242c5.523 0 10-4.477 10-10v-62.789c0-5.523-4.477-10-10-10zm-10 62.789h-76.242v-42.789h76.242z"/>
      </g>
   </SvgIcon>
  );
}

const useStyles = makeStyles(theme => ({
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80
  },
  gridAction: {
    paddingLeft: 20,
    paddingRight: 20
  },
  contentRoot: {
    width: '100%'
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: theme.palette.primary.main
  },
  buildingIconArea: {
    backgroundColor: theme.palette.background.lightBlue,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  maintenanceIconArea: {
    backgroundColor: theme.palette.error.veryLight,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  paymentsIconArea: {
    backgroundColor: theme.palette.success.veryLight,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  visitorsIconArea: {
    backgroundColor: theme.palette.background.light,
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  actionTitle: {
    fontWeight: 600,
    fontSize: 12,
    color: theme.palette.text.primary
  },
  actionSubtitle: {
    fontSize: 11,
    lineHeight: 1.3,
    color: theme.palette.text.secondary,
  },

  detailsTitle: {
    fontWeight: 600,
    fontSize: 12,
    color: theme.palette.secondary.main,
  },
  detailsSubtitle: {
    fontSize: 11,
    lineHeight: 1.3,
    color: theme.palette.secondary.main,
  },
  actionSubtitle2: {
    fontSize: 11,
    lineHeight: 1.3,
    color: theme.palette.primary.main,
  },
}));


const TripRequestArea = () => {

  const classes = useStyles();

  const [usersCount, setUsersCount] = useState(0);
  const [driversCount, setDriversCount] = useState(0);
  const [tripsCount, setTripsCount] = useState(0);
  const [totTransactions, setTotTransactions] = useState(0);

  useEffect(() => {

    DB.collection("users").onSnapshot((querySnapshot) => {
      setUsersCount(querySnapshot.docs.length);
    });

    DB.collection("riders").onSnapshot((querySnapshot) => {
      setDriversCount(querySnapshot.docs.length);
    });

    DB.collection("trips").onSnapshot((querySnapshot) => {
      setTripsCount(querySnapshot.docs.length);
    });

    DB.collection("trips").where("delivered", "==", true)
    .onSnapshot((querySnapshot) => {
      let total = 0;
      querySnapshot.forEach((doc) => {
          total += doc.data().transaction.cost;
        });
        setTotTransactions(total);
    });

  }, []);

  return (
    <Grid container direction="row" spacing={1}>
      <Grid
        item
        lg={3}
        xs={12}>

        <Card className={classes.actionButton} elevation={1}>
          <CardActionArea
              disableripple="true"
              disabletouchripple="true"
              style={{ height: '100%'}}
            >
              <CardContent className={classes.contentRoot}>
                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                    <Grid
                      item
                      lg={4}>
                      <div className={classes.buildingIconArea}>
                          <UsersIcon fontSize="small" style={{ fill:'none', stroke:"#1B75BC", strokeWidth:4 }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={8}>
                      <Typography
                        variant="body1"
                        color="primary"
                        className={classes.actionTitle}>
                        Total Users
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className={classes.actionSubtitle}>
                        {usersCount}
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
        </Card>
      </Grid>
      <Grid
        item
        lg={3}
        xs={12}>

        <Card className={classes.actionButton} elevation={1}>
          <CardActionArea
              disableripple="true"
              disabletouchripple="true"
              style={{ height: '100%'}}
            >
              <CardContent className={classes.contentRoot}>
                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                    <Grid
                      item
                      lg={4}>
                      <div className={classes.maintenanceIconArea}>
                          <DriversIcon fontSize="small" style={{ fill:'#BC421B', stroke:"#BC421B" }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={8}>
                      <Typography
                        variant="body1"
                        color="primary"
                        className={classes.actionTitle}>
                        Total Riders
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className={classes.actionSubtitle2}>
                        {driversCount}
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
        </Card>
      </Grid>
      <Grid
        item
        lg={3}
        xs={12}>
        <Card className={classes.actionButton} elevation={1}>
          <CardActionArea
              disableripple="true"
              disabletouchripple="true"
              style={{ height: '100%'}}
            >
              <CardContent className={classes.contentRoot}>
                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                    <Grid
                      item
                      lg={4}>
                      <div className={classes.paymentsIconArea}>
                          <TripsIcon fontSize="small" style={{ fill:'#4FBC1B', stroke:"#4FBC1B", strokeWidth: 4 }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={8}>
                      <Typography
                        variant="body1"
                        color="primary"
                        className={classes.actionTitle}>
                        Total Trips
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className={classes.actionSubtitle2}>
                        {tripsCount}
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
        </Card>
      </Grid>
      <Grid
        item
        lg={3}
        xs={12}>
        <Card className={classes.cardDetails} elevation={1}>
              <CardContent className={classes.contentRoot}>
                <Grid container direction="row" alignItems="center" className={classes.gridAction}>
                    <Grid
                      item
                      lg={4}>
                      <div className={classes.visitorsIconArea}>
                          <TransactionsIcon fontSize="small" style={{ color:'#FFFFFF', stroke:"#FFFFFF", strokeWidth: 3 }} />
                      </div>
                    </Grid>
                    <Grid
                      item
                      lg={8}>
                      <Typography
                        variant="body1"
                        color="primary"
                        className={classes.detailsTitle}>
                        Total Transactions
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        className={classes.detailsSubtitle}>
                        {'\u20A6'} <NumberFormat value={totTransactions} displayType={'text'} thousandSeparator={true} />
                      </Typography>
                    </Grid>
                </Grid>
              </CardContent>
        </Card>
      </Grid>
    </Grid>

  );


};

export default TripRequestArea;
