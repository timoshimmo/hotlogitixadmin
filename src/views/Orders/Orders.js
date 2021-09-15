import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Icon
} from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//import { history } from '../../helpers';
import { OrdersTable } from './components';
import DB from '../../util/firebaseinit';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    background: '#efefef'
  },
  body: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(6),
      paddingLeft: 0,
      paddingRight: 0,
    }
  },
  storyArea: {
    overflow: 'hidden'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center',
  },
  storyContainer: {
    border: '1px solid #F2F4F7',
    borderRadius: 8,
    padding: 15,
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(1),
      border: 'none',
      borderBottom: '1px solid #F2F4F7',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    }
  },
  composeContainer: {
    border: '1px solid #F2F4F7',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    }
  },
  postsContainer: {
    marginTop: 20
  },

  storyBack4: {
    height: 150,
    width: 125,
    padding: 10,
  },

  gridList: {
   flexWrap: 'nowrap',
   transform: 'translateZ(0)',
 },
 smallAvatar: {
   width: 25,
   height: 25,
   border: '1px solid #fff'
 },
 primaryAvtr: {
    color: '#fff',
    backgroundColor: '#2688FB',
    width: 25,
    height: 25
  },
  storyName: {
    color: '#fff',
    fontWeight: 300,
    height: '80%',
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: 13
  },
  iconStyle: {
    fontSize: 11
  },
  dividerSpacing: {
    marginLeft: 15,
    marginRight: 15
  },
  margin: {
   margin: 1,
   fontSize: 12,
   width: '100%'
 },
 divCompose: {
   width: '45%'
 },
 gridAction: {
   width: '55%',
 },
  liveroot: {
    height: 150,
    width: 125,
   },
 media: {
   height: 0,
   paddingTop: '56.25%', // 16:9
 },
 cardContent: {
   padding: '5px 16px 16px 16px'
 },
 likesBody: {
   marginTop: 10
 },
commentsBody: {
   marginTop: 15
 },
 primaryTextStyles: {
   color: '#04011D',
   fontWeight: 600
 },
 buttonStyle: {
   textTransform: 'none',
   fontSize: 12,
   WebkitBoxShadow: 'none',
   MozBoxShadow: 'none',
   boxShadow: 'none',
   borderStyle: 'solid',
   borderRadius: 70,
   borderWidth: 1,
   fontWeight: 400,
   marginLeft: '5%',
   backgroundColor: '#2688FB',
   borderColor: '#fff',
   color: '#fff',
   '&:hover': {
     WebkitBoxShadow: 'none',
     MozBoxShadow: 'none',
     boxShadow: 'none',
     backgroundColor: '#0573f0',
     color: "#fff",
    },
 },
 buttonProgress: {
   color: '#2688fb',
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)'
 },

 closeButton: {
   position: 'absolute',
   right: theme.spacing(1),
   top: theme.spacing(1),
   color: theme.palette.grey[500],
 },
 titleStyle: {
   margin: 0,
   padding: theme.spacing(2),
   display: 'flex',
   flexDirection: 'row',
   justifyContent: 'space-between'
 },
 dialogContentStyle: {
   padding: theme.spacing(2),
 },
 dialogActionStyle: {
   margin: 0,
   padding: theme.spacing(1),
 },
 textField: {
   position: 'relative',
   fontSize: 12,
   width: '100%',
   padding: '5px 10px',
   color: '#04011D'
 },
 input: {
   '&::placeholder': {
      color: '#A1A9B3',
      fontSize: 14
    },
 },
 mediaInput: {
   display: 'none'
 },
 imgStyle: {
   objectFit: 'cover',
   width: 540,
   height: 320
 },
 vidStyle: {
   width: 540,
   height: 320
 },

}));

const Orders = () => {
  const classes = useStyles();

  //const theme = useTheme();

  const [serverError, setServerError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ordersList, setOrdersList] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = React.useState(false);


  useEffect(() => {

    const handleOrdersList = () => {
      if(!loading) {
        setLoading(true);

        DB.collection("trips").where("assigned", "==", false)
        .get()
        .then((querySnapshot) => {
          var arr = [];
          querySnapshot.forEach((doc) => {
            arr.push({"id": doc.id, "date": doc.data().dateCreated, "pickup": doc.data().pickup, "delivery": doc.data().delivery,
              "weight": doc.data().package.weight, "distance": doc.data().distance, "cost": doc.data().transaction.cost,
              "transaction": doc.data().transaction, "package": doc.data().package});
          });

          console.log("ARRAY: ", arr);
          setOrdersList(arr);
          setFilteredOrders(arr);
        })
        .catch((error) => {
          setLoading(false);
          setServerError("Error retrieving orders list", error);
          console.log(error);
        })

    /*    SERVICES.get(`txn/all`)
        .then(response => {
             setLoading(false);
             setUsersList(response.data.data);
             setFilteredUsers(response.data.data);
        })
        .catch(function (error) {
          setLoading(false);
          const errRes = error.response;
          if(errRes.status === 401 && errRes.data.message === 'You dont have permission for this action') {
            localStorage.removeItem('stansAdmin');
            localStorage.removeItem('stansonlyadmin');
            history.push('/');
          }
          setServerError("Erroe retrieving transaction list");
          console.log(errRes);
        }) */
      }
    };

    handleOrdersList();

  }, []);

  const handleFilter = query => {
    let newList = [];
    console.log(query);
    newList = query ? ordersList.filter(orders => String(orders.from).includes(query)) : ordersList;
    console.log(newList);
    setFilteredOrders(newList);
  }

  const handleSuccess = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setSuccess(false);
};

const handleFailed = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setFailed(false);
};


  return (
    <div className={classes.root}>
      <div className={classes.body}>
          {loading && <Icon className="fas fa-circle-notch fa-spin" style={{ color: '#2688FB', fontSize: 40, position: 'relative', top: 40, left: '50%', }} />}
          <OrdersTable orderList={filteredOrders} handleFilter={handleFilter} />
      </div>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccess}>
        <Alert onClose={handleSuccess} severity="success">
          Your post was successfully sent!
       </Alert>
      </Snackbar>

      <Snackbar open={failed} autoHideDuration={6000} onClose={handleFailed}>
        <Alert onClose={handleFailed} severity="error">
          {serverError}
       </Alert>
      </Snackbar>

    </div>

  );
};

export default Orders;
