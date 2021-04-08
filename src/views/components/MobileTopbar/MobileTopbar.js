import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';

import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles(theme => ({

  root: {
    flexGrow: 1
  },
  flexGrow: {
    flexGrow: 1
  },

  textField: {
    position: 'relative',
    backgroundColor: '#F2F6FC',
    border: '1px solid #fff',
    fontSize: 12,
    width: '100%',
    borderRadius: '70px',
    transition: theme.transitions.create(['background-color']),
    padding: '5px 20px'
  },
  input: {
    '&::placeholder': {
       color: '#A1A9B3',
       fontSize: 14
     },
  },
  grid: {
    height: '100%',
    width: '100%'
  },
  menuCol: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  txtSuggestions: {
    marginLeft: 20,
    color: theme.palette.text.primary,
    fontSize: 14
  },
  icon: {
    color: '#A1A9B3'
  },
  toolbar: {
    borderBottom: '1px solid #F2F4F7',
    width: '100%',
    backgroundColor: '#fff',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    flexGrow: 1,
  },
  smallAvatar: {
    width: 30,
    height: 30,
    border: '1px solid #fff'
  },
  title: {
    fontWeight: 500,
    fontSize: 17
  },

  }));

  function SearchIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 17.027 17.027">
        <g transform="translate(0.5 0.5)">
          <path class="a" d="M21.562,14.531A7.031,7.031,0,1,1,14.531,7.5,7.031,7.031,0,0,1,21.562,14.531Z" transform="translate(-7.5 -7.5)"/>
          <path class="a" d="M45.448,45.448l-3.823-3.823" transform="translate(-29.628 -29.628)"/>
        </g>
      </SvgIcon>
    );
  }


  const MobileTopbar = props => {

    const { className, title, ...rest } = props;

    const classes = useStyles();
    let history = useHistory();

  //  const [profilePic, setProfilePic] = useState(null);

  //  let token = localStorage.getItem('stansonlytoken');

  let userData = {};
  if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user');
      if(user !== null) {
        const data = JSON.parse(user);
        userData = data;
      }
  }

  const handleSearch = () => {
    history.push('/search');
  }

    return (

      <AppBar
        {...rest}
        className={clsx(classes.root, className)}
        position="fixed"
        elevation={0}
        style={{ color: '#04011D', backgroundColor: 'white' }}
      >

        <Toolbar
          disableGutters={true}
          className={classes.toolbar}
        >
          <Grid
            className={classes.grid}
            container
            spacing={1}
            alignItems='center'
          >

            <Grid
              item
            >
              <Avatar alt="avatar" src={userData.profilePicUrl} className={classes.smallAvatar} />
            </Grid>
            <Grid
              item
            >
            <Typography variant="body2" className={classes.title}>
               {title}
             </Typography>
            </Grid>
            <Grid
              item
              className={classes.menuCol}
            >
            <IconButton aria-label="Search" color="inherit" onClick={handleSearch}>
               <SearchIcon fontSize="small" style={{ fill:'none', stroke:'#2688fb', strokeLinecap:'round', strokeLinejoin:'round' }} />
             </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

    );

  };

  MobileTopbar.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string
  };

  export default MobileTopbar;
