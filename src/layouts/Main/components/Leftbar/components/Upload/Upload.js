import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, Dialog, TextField, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import BarChartOutlinedIcon from '@material-ui/icons/BarChartOutlined';
import InsertPhotoOutlinedIcon from '@material-ui/icons/InsertPhotoOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import axios from 'axios';
import validate from 'validate.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import SERVICES from '../../../../../../util/webservices';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { v4 as uuidv4 } from "uuid";

import SvgIcon from '@material-ui/core/SvgIcon';


  /*


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPreview(null);
  };

  const handleImageUpload = event => {
    setMediaType('image');
    setPreview(URL.createObjectURL(event.target.files[0]));
    setUploadedImage(event.target.files[0]);
  };

  const handleVideoUpload = event => {
    setMediaType('video');
    setPreview(URL.createObjectURL(event.target.files[0]));
    setUploadedImage(event.target.files[0]);
  };

  const completeImageUpload = () => {
      setUploadinProgress(true);
      const formData = new FormData();
      formData.append("file", uploadedImage);
      formData.append("upload_preset", 'stansonly_upset'); // Replace the preset name with your own
      formData.append("api_key", "969454755235651"); // Replace API key with your own Cloudinary API key
      formData.append("timestamp", (Date.now() / 1000) | 0);
      return axios.post("https://api.cloudinary.com/v1_1/stansonlycloud/image/upload", formData, {
        headers: {
          "X-Requested-With": "XMLHttpRequest"
        }
      })
        .then(response => {
        //  setValue(2);
          setUploadinProgress(false);
          setImageUrl(response.data.url);
        })
    }

    onClick={handleClickOpen}

    Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth={true}>
        <DialogTitle disableTypography className={classes.titleStyle}>
           <Typography variant="h6">Create Post</Typography>
           <IconButton onClick={handleClose}>
               <CloseIcon />
           </IconButton>
       </DialogTitle>
       <DialogContent dividers>
         <form autoComplete="off">
           <TextField
               id="caption-title"
               className={classes.textField}
               fullWidth
               name="captionTitle"
               type="text"
               onChange={handleChange}
               InputProps={{
                 disableUnderline: true,
                 classes: { input: classes.input}
               }}
               placeholder="Enter Caption..."
             />
           {mediaType == 'image' ?
             ( <Paper elevation={0} square>
                 {preview ? <img src={preview} className={classes.imgStyle} /> : null}
              </Paper>)
             :
             ( <Paper elevation={0} square>
                 {preview ? <video className={classes.vidStyle} controls>
                   <source src={preview}
                           type="video/webm" />

                   <source src={preview}
                           type="video/mp4" />
               </video> : null}
              </Paper>)

           }
         </form>
       </DialogContent>
       <DialogActions>
         <Grid container>
            <Grid
              item
              lg={8}
              >
                <input accept="image/x-png,image/gif,image/jpeg" className={classes.mediaInput} id="uploadedImage" multiple type="file" onChange={e => handleImageUpload(e)} />
                <label htmlFor="uploadedImage">
                 <IconButton color="primary" aria-label="upload picture" component="span">
                   <ImageIcon fontSize="small" style={{ fontSize: 16, fill:'none', stroke:'#2688fb', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:1.5 }} />
                 </IconButton>
                </label>
                <input accept="video/mp4,video/x-m4v,video/*" className={classes.mediaInput} id="uploadedVideo" multiple type="file" onChange={e => handleVideoUpload(e)} />
                <label htmlFor="uploadedVideo">
                  <IconButton color="primary" aria-label="upload video" component="span">
                    <VideoIcon style={{ fontSize: 18, fill:'none', stroke:'#2688fb', strokeLinecap:'round', strokeLinejoin:'round', strokeWidth:2 }} />
                  </IconButton>
                </label>
            </Grid>
            <Grid
              item
              lg={4}
              style={{ textAlign: "right" }}
              >
                <Button
                  variant="contained"
                  style={{ marginLeft: '5%', fontSize: 12 }}
                  className={classes.buttonStyle}
                  disabled={ !formState.values.captionTitle || !preview || loading}
                  onClick={handleSubmitPost}
                  >
                  Post
                  {loading && <CircularProgress size={20} className={classes.buttonProgress} />}
                </Button>
            </Grid>
         </Grid>
       </DialogActions>
    </Dialog>

    const handleSubmitPost = event => {
        event.preventDefault();

        let userData = {};
        if (typeof localStorage !== 'undefined') {
            const user = localStorage.getItem('user');
            if(user !== null) {
              const data = JSON.parse(user);
              userData = data;
            }
        }

        if(!loading) {

            setLoading(true);
              const formData = new FormData();
              formData.append("file", uploadedImage);
              formData.append("upload_preset", 'stansonly_upset'); // Replace the preset name with your own
              formData.append("api_key", "969454755235651"); // Replace API key with your own Cloudinary API key
              formData.append("timestamp", (Date.now() / 1000) | 0);
              const obj = {
               method: 'POST',
               headers: new Headers({'X-Requested-With': 'XMLHttpRequest'}),
               body: formData

             };
            fetch("https://api.cloudinary.com/v1_1/stansonlycloud/auto/upload", obj)
                .then(responses => responses.json())
                .then(response => {

                  console.log("Media Data: " + JSON.stringify(response));
                  let orientationType = '';
                  if(response.width > response.height) {
                    orientationType = "landscape"
                  }
                  if(response.width < response.height) {
                    orientationType = "portrait"
                  }
                  if(response.width === response.height) {
                    orientationType = "square"
                  }

                  if(!response.error) {
                    const postobj = {
                      userid: userData.userid,
                      caption: formState.values.captionTitle,
                      mediaUrl: response.url,
                      mediaType: mediaType,
                      orientation: orientationType
                    };

                    //axios.post(`http://stansonlyapi.eu-west-1.elasticbeanstalk.com/posts/create`, postobj, { headers: { 'x-access-token': token } })

                    SERVICES.post(`posts/create`, postobj)
                    .then(res => {
                      setLoading(false);
                      setOpen(false);
                      setSuccess(true);
                      window.location.reload(true);
                      console.log(res.data);
                    })
                    .catch(error => {
                      console.log(error.response);
                      setLoading(false);
                      setFailed(true);
                      setServerError('Could upload post!');
                    });
                  }
                  else {
                    setLoading(false);
                    setFailed(true);
                    setServerError(response.error.message);
                  }


                });

        }
    }
*/

const schema = {

  captionTitle: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 1
    }
  },
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ImageIcon(props) {
  return (
    <SvgIcon {...props} width="22.173" height="22.173" viewBox="0 0 22.173 22.173">
      <g transform="translate(-6.6 -6.6)">
        <path d="M9.722,7.5H25.278A2.222,2.222,0,0,1,27.5,9.722V25.278A2.222,2.222,0,0,1,25.278,27.5H9.722A2.222,2.222,0,0,1,7.5,25.278V9.722A2.222,2.222,0,0,1,9.722,7.5Z" transform="translate(0 0)"/>
        <path d="M20.833,19.167A1.667,1.667,0,1,1,19.167,17.5,1.667,1.667,0,0,1,20.833,19.167Z" transform="translate(-5.556 -5.556)"/>
        <path d="M30.278,30.556,24.722,25,12.5,37.222" transform="translate(-2.778 -9.722)"/>
      </g>
    </SvgIcon>
  );
}

function VideoIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 33.229 21.8">
      <g transform="translate(-1.6 -11.6)">
        <path class="a" d="M50,17.5,40,24.643l10,7.143Z" transform="translate(-16.071 -2.143)"/>
        <path class="a" d="M5.357,12.5H21.071a2.857,2.857,0,0,1,2.857,2.857V29.643A2.857,2.857,0,0,1,21.071,32.5H5.357A2.857,2.857,0,0,1,2.5,29.643V15.357A2.857,2.857,0,0,1,5.357,12.5Z" transform="translate(0 0)"/>
      </g>
    </SvgIcon>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
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
    color:  theme.palette.text.primary
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
  buttonStyle: {
    textTransform: 'none',
    color: '#fff',
    WebkitBoxShadow: 'none',
    MozBoxShadow: 'none',
    boxShadow: 'none',
    borderStyle: 'solid',
    borderColor: '#fff',
    borderRadius: 70,
    borderWidth: 1,
    fontWeight: 400,
    backgroundColor: '#2688FB',
    '&:hover': {
       WebkitBoxShadow: 'none',
       MozBoxShadow: 'none',
       boxShadow: 'none',
       backgroundColor: '#0573f0',
       color: "#fff",
     },
  },

  buttonProgress: {
    color: '#2688FB',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },

}));


const Upload = props => {

    const { onDialogOpen, className, ...rest } = props;

    const classes = useStyles();

    const [formState, setFormState] = useState({
      isValid: false,
      values: {},
      touched: {},
      errors: {}
    });

    let token = localStorage.getItem('stansonlytoken');

    const [open, setOpen] = React.useState(false);
    const [uploadInProgress, setUploadinProgress] = React.useState(false);
    const [preview, setPreview] = React.useState(null);
    const [mediaType, setMediaType] = React.useState(null);
    const [previewVideo, setPreviewVideo] = React.useState(null);
    const [uploadedImage, setUploadedImage] = React.useState(null);
    const [imageUrl, setImageUrl] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [serverError, setServerError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    const handleChange = event => {
      event.persist();

      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          [event.target.name]:
            event.target.type === 'checkbox'
              ? event.target.checked
              : event.target.value
        },
        touched: {
          ...formState.touched,
          [event.target.name]: true
        }
      }));
    };

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
      <div
        {...rest}
        className={classes.root}
      >
        <Button
          className={classes.buttonStyle}
          style={{ fontSize: 13 }}
          fullWidth
          size="large"
          type="button"
          variant="contained"
          onClick={onDialogOpen}

        >
          Upload
        </Button>
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

Upload.propTypes = {
  onDialogOpen: PropTypes.func,
};

export default Upload;
