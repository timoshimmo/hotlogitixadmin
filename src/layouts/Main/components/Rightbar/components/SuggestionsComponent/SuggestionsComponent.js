import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  ListItem,
  Grid,
  Avatar
} from '@material-ui/core';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

const useStyles = makeStyles(theme => ({
  suggestedContainer: {
    border: '1px solid #F2F4F7',
    borderRadius: 8,
    padding: 15
  },
  cardroot: {
    maxWidth: 390,
    marginBottom: 20
  },
  media: {
    height: 140,
    backgroundColor: '#e8e8e8'
  },
  large: {
   width: theme.spacing(9),
   height: theme.spacing(9),
   marginTop: '-50px',
   border: '3px solid #fff'
 },
 listItem: {
   display: 'flex',
   paddingTop: 0,
   paddingBottom: 0,
   '&:hover': {
      backgroundColor: 'transparent'
    },
    '&:focus': {
      backgroundColor: 'transparent'
    }
 },
 coverBackStyle: {

 }
}));

/*
<Card className={classes.cardroot} elevation={1}>
  <CardActionArea>
    <CardMedia
      className={classes.media}
      image="/images/backImg2.jpg"
      title="User 2"
    />
      <CardContent>
        <Grid container spacing={1} direction="row" justify="flex-start">
          <Grid item style={{marginRight: 20}}>
            <Avatar alt="avatar" src="/images/avt2.jpg" className={classes.large} />
          </Grid>
          <Grid item style={{width: 200}}>
            <Typography variant="h6" component="h6" style={{ fontSize: 16 }}>
              Justina Cyril
            </Typography>
            <Typography variant="body2" style={{ color: '#A1A9B3', fontSize: 12 }} component="span">
              @justine
            </Typography>
          </Grid>
        </Grid>

      </CardContent>
    </CardActionArea>
  </Card>
to={{ pathname: `/profile/${props.obj.userid.username}`, state:{ type: 'user', userid: props.obj.userid.id } }}
*/

const SuggestionsComponent = props => {

    const classes = useStyles();
    let history = useHistory();

    const handleRedirect = () => {
      history.push({
        pathname: `/profile/${props.obj._id}`,
        state: { type: 'user', userid: props.obj._id }
      }); 
    }

    return (
      <ListItem
        className={classes.listItem}
        disableGutters
        disableripple="true"
        disabletouchripple="true"
        key={props.obj.idx}
      >
        <Card className={classes.cardroot} elevation={1}>
          <CardActionArea
            onClick={handleRedirect}
            >
            <CardMedia
              className={classes.media}
              image={props.obj.coverPicUrl !== undefined ? props.obj.coverPicUrl : ""}
              title={props.obj.username}
            />
              <CardContent>
                <Grid container spacing={1} direction="row" justify="flex-start">
                  <Grid item style={{marginRight: 20}}>
                    {
                       props.obj.profilePicUrl !== undefined ?
                       <Avatar alt="avatar" src={props.obj.profilePicUrl} className={classes.large} />
                       :
                       <Avatar alt="avatar" src="" className={classes.large} />
                    }
                  </Grid>
                  <Grid item style={{width: 200}}>
                    <Typography variant="h6" component="h6" style={{ fontSize: 16 }}>
                      {props.obj.fullname}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#A1A9B3', fontSize: 12 }} component="span">
                      @{props.obj.username}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
      </ListItem>
    );

};

SuggestionsComponent.propTypes = {
  className: PropTypes.string,
};

export default SuggestionsComponent;
