import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Icon
} from '@material-ui/core';
//import SERVICES from '../../util/webservices';
//import { history } from '../../helpers';
import { UsersTable } from './components';
import DB from '../../util/firebaseinit';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    maxWidth: '100%',
    background: '#efefef'
  },
  body: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    paddingTop: theme.spacing(2),
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
 drawerWidth: {
   width: 400,
 },

 formRoot:{
  maxHeight: '100%'
},

}));

const Users = () => {
  const classes = useStyles();

//  const theme = useTheme();
  const [usersList, setUsersList] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
  //  const handleUsersList = () => {
      if(!loading) {
        setLoading(true);

        DB.collection("users").get().then((querySnapshot) => {
          var arr = [];
          querySnapshot.forEach((doc) => {
              arr.push({"id": doc.id, "fullname": doc.data().name, "mobileNo": doc.data().mobileNo, "email": doc.data().email});
          });
          console.log("USERS MAIN:" + JSON.stringify(arr));
          setLoading(false);
          setUsersList(arr);
          setFilteredUsers(arr);
      });

    /*  DB.collection("users").onSnapshot((querySnapshot) => {
          var arr = [];
          querySnapshot.forEach((doc) => {
              arr.push({"id": doc.id, "fullname": doc.data().name, "mobileNo": doc.data().mobileNo, "email": doc.data().email});
            });
            console.log("USERS MAIN:" + JSON.stringify(arr));
            setUsersList(arr);
        }); */
      }
  //  };
  //  handleUsersList();
  }, []);


  /* const handleUsersList = () => {
    if(!loading) {
      setLoading(true);

      SERVICES.get(`user/all`)
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
        console.log(errRes);
      })
    }
  } */

  const handleFilter = query => {
    let newList = [];
    console.log(query);
    newList = query ? usersList.filter(users => String(users.fullname).includes(query)) : usersList;
    console.log(newList);
    setFilteredUsers(newList);
  }


  return (
    <div className={classes.root}>
      <div className={classes.body}>
          {loading ?
            <Icon className="fas fa-circle-notch fa-spin" style={{ color: '#2688FB', fontSize: 40, position: 'relative', top: 40, left: '50%', }} />
            :
            <UsersTable usersList={filteredUsers} handleFilter={handleFilter} />
          }
      </div>

    </div>

  );
};

export default Users;
