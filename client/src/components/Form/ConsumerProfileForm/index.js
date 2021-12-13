import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import ConsumerAvatarUpload from '../../ImageUpload/ConsumerAvatarUpload';
import useApiCall from '../../../hooks/useApiCall';
import {
  TextField,
  Grid,
  Box,
  Paper,
  Typography,
  Button,
  Modal,
  Dialog,
  DialogActions,
  DialogContent,
  Switch,
  DialogTitle,
  FormControl,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function ConsumerProfileForm() {
  const history = useHistory();
  const { user, dispatch } = useContext(UserContext);
  // console.log(user);

  // states
  const [edit, setEdit] = useState(false); // for edit dialogue
  const [show, setShow] = useState(false); // for delete account modal

  const [email, setEmail] = useState(user.email ? user.email : null);
  const [description, setDescription] = useState(
    user.description ? user.description : ''
  );
  const [isPrivate, setIsPrivate] = useState(
    user.isPrivate ? user.isPrivate : false
  );
  const [consumerImg, setConsumerImg] = useState(
    user.consumerImage ? user.consumerImage : ''
  );
  const [consumerPassword, setConsumerPassword] = useState(
    user.consumerPassword ? user.consumerPassword : ''
  );
  function uploadFile(inputFile) {
    // const preview = document.querySelector('img');
    // const file = document.querySelector('input[type=file]').files[0];
    if (!inputFile) {
      return;
    }
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        setConsumerImg(reader.result);
      },
      false
    );

    if (inputFile) {
      reader.readAsDataURL(inputFile);
    }
  }
  // saveButtonHandler: handle saving on changes and setEdit(false)
  const saveButtonHandler = async () => {
    try {
      await axios.put(
        process.env.NODE_ENV === 'production'
          ? `/api/consumer/${user?.id}`
          : `/api/consumer/${user?.id}`,
        {
          consumerEmail: email,
          consumerDescription: description,
          consumerIsPrivate: isPrivate,
          consumerPassword: consumerPassword,
          consumerImage: consumerImg,
        }
      );
      const userInfo = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/auth`
          : `http://localhost:4000/api/auth`,
        { withCredentials: true }
      );
      dispatch({ type: 'signin', payload: userInfo.data });
      // dispatch({
      //   type: 'edit',
      //   payload: {
      //     consumer: {
      //       email: email,
      //       description: description,
      //       isPrivate: isPrivate,
      //       img: consumerImg,
      //     },
      //   },
      // });
      setEdit(false);
    } catch (e) {
      console.error(e);
    }
  };

  // isPrivate switch
  const handleOnChange = () => {
    setIsPrivate(!isPrivate);
  };

  // deleteButtonHandler: handle delete account, log user out, redirect the user to the homepage
  const deleteButtonHandler = async () => {
    try {
      // remove user data from the database
      await axios.delete(
        process.env.NODE_ENV === 'production'
          ? `/api/consumer/${user?.id}`
          : `http://localhost:4000/api/consumer/${user?.id}`
      );
      // try {
      //   await axios.delete(
      //     process.env.NODE_ENV == 'production'
      //       ? `/api/auth`
      //       : `http://localhost:4000/api/auth`
      //   );
      // log user out
      dispatch({ type: 'signout' });
      // redirect to homepage
      history.push('/');
      // } catch (e) {
      //   console.error(e);
      // }
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEdit = () => {
    setEmail(user.email ? user.email : null);
    setDescription(user.description ? user.description : '');
    setIsPrivate(user.isPrivate ? user.isPrivate : false);
    setConsumerPassword(user.consumerPassword ? user.consumerPassword : '');
    setEdit(false);
  };

  const getUserInfo = async () => {
    const userInfo = await axios.get(
      process.env.NODE_ENV === 'production'
        ? `/api/auth`
        : `http://localhost:4000/api/auth`,
      { withCredentials: true }
    );
    dispatch({ type: 'signin', payload: userInfo.data });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    setEmail(user.email ? user.email : null);
    setDescription(user.description ? user.description : '');
  }, [user]);

  if (!email) {
    return <></>;
  }
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap:'10px', justifyContent: 'center', paddingTop: '10px', paddingBottom: '20px', paddingRight: '40px', paddingLeft: '40px'}}>
        <Paper sx={{ borderRadius: '18px' }}>
          <Grid container alignItems='center' sx={{ margin: 2 }}>
            <Grid item sm={1} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
              <EmailRoundedIcon sx={{color: '#004080'}} />
            </Grid>
            <Grid item sm={11}>
              <Typography sx={{ fontFamily: 'Nunito', fontSize: '22px' }}>{user.email}</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ borderRadius: '18px', display: 'flex' }}>
          <Grid container alignItems='center' sx={{ margin: 2 }}>
            <Grid item sm={1} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
              <PersonPinRoundedIcon sx={{color: '#004080'}} />
            </Grid>
            <Grid item sm={11}>
              <Typography sx={{ fontFamily: 'Nunito', fontSize: '22px' }}>{user.description}</Typography>
            </Grid>
          </Grid>
        </Paper>
        {isPrivate ?
          <Paper sx={{ borderRadius: '18px', display: 'flex' }}>
            <Grid container alignItems='center' sx={{ margin: 2 }}>
              <Grid item sm={1} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <VisibilityOffRoundedIcon sx={{color: '#004080'}} />
              </Grid>
              <Grid item sm={11}>
                <Typography sx={{ fontFamily: 'Nunito', fontSize: '22px' }}>private account</Typography>
              </Grid>
            </Grid>
          </Paper>
          :
          <Paper sx={{ borderRadius: '18px', display: 'flex' }}>
            <Grid container alignItems='center' sx={{ margin: 2 }}>
              <Grid item sm={1} sx={{ paddingLeft: '10px', paddingRight: '10px' }}>
                <VisibilityRoundedIcon sx={{color: '#004080'}} />
              </Grid>
              <Grid item sm={11}>
                <Typography sx={{ fontFamily: 'Nunito', fontSize: '22px' }}>public account</Typography>
              </Grid>
            </Grid>
          </Paper>
        }
      </Box>
      <Box sx={{ display: 'flex', justifyContent:'center', gap: '10px', paddingRight: '40px', paddingLeft: '40px' }}>
        <Button variant='contained' onClick={() => setEdit(true)} sx={{ borderRadius: '15px' }}>
          Edit
        </Button>
        <Button variant='text' color='error' onClick={() => setShow(true)} sx={{ borderRadius: '15px' }}>
          Delete Account
        </Button>
      </Box>
      <Modal open={show} onClose={() => setShow(false)}>
        <Box sx={style}>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Delete account
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                Are you sure you would like to delete your account? You will
                lose all your data.
              </Typography>
            </Grid>
            <Grid item />
          </Grid>
          <Grid container spacing={2} justifyContent='flex-end'>
            <Grid item>
              <Button
                variant='text'
                color='error'
                onClick={deleteButtonHandler}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained' onClick={() => setShow(false)}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Dialog open={edit} keepMounted onClose={() => setEdit(false)}>
        <DialogTitle>
          <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
            Edit Account Information
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs={10}>
              <TextField
                autoFocus
                margin='dense'
                required
                label='Email'
                type='email'
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                defaultValue={email ? email : 'Enter your email address'}
              />
            </Grid>
            <Grid item xs={2}>
              <ConsumerAvatarUpload consumerId={user.id} />
            </Grid>
          </Grid>
          <TextField
            autoFocus
            margin='dense'
            label='Self-introduction'
            defaultValue={
              description ? description : 'Enter your self-introduction'
            }
            rows={3}
            fullWidth
            multiline
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            autoFocus
            margin='dense'
            label='Password'
            defaultValue={
              consumerPassword ? consumerPassword : 'Enter your password'
            }
            rows={3}
            fullWidth
            multiline
            onChange={(e) => setConsumerPassword(e.target.value)}
          />
          <FormControl>
            <FormControlLabel
              control={<Switch checked={isPrivate} onChange={handleOnChange} />}
              label='Private Account'
            />
            <FormHelperText>
              Other player won't be able to see your account if you set it to
              private.
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {/* TODO: fix the spacing */}
          <Button variant='contained' onClick={saveButtonHandler}>
            Save
          </Button>
          <Button variant='outlined' onClick={cancelEdit}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConsumerProfileForm;
