import axios from 'axios';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import useApiCall from '../../../hooks/useApiCall';
import {
  TextField,
  Grid,
  Box,
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

  // states
  const [edit, setEdit] = useState(false); // for edit dialogue
  const [show, setShow] = useState(false); // for delete account modal
  const [email, setEmail] = useState(user.email ? user.email : '');
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

  // saveButtonHandler: handle saving on changes and setEdit(false)
  const saveButtonHandler = async () => {
    try {
      await axios.put(
        process.env.NODE_ENV == 'production'
          ? `/api/consumer/${user?.id}`
          : `http://localhost:4000/api/consumer/${user?.id}`,
        {
          consumerEmail: email,
          consumerDescription: description,
          consumerIsPrivate: isPrivate,
          consumerPassword: consumerPassword,
          consumerImage: consumerImg,
        }
      );
      dispatch({
        type: 'edit',
        payload: {
          consumer: {
            email: email,
            description: description,
            isPrivate: isPrivate,
            img: consumerImg,
          },
        },
      });
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
        process.env.NODE_ENV == 'production'
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
    setEmail(user.email ? user.email : '');
    setDescription(user.description ? user.description : '');
    setIsPrivate(user.isPrivate ? user.isPrivate : false);
    setConsumerPassword(user.consumerPassword ? user.consumerPassword : '');
    setEdit(false);
  };
  console.log('user', user);
  return (
    // email, private account toggle, description
    // save button, edit button, cancel button, delete account button
    <div>
      {/* TODO: fix the listing and display of the information */}
      <Grid
        container
        direction='column'
        spacing={2}
        sx={{ paddingLeft: '400px' }}
      >
        <Grid item container justifyContent='flex-start' spacing={2}>
          <Grid item>
            <Typography>Email</Typography>
          </Grid>
          <Grid item>
            <Typography>{user.email}</Typography>
          </Grid>
        </Grid>
        <Grid item container justifyContent='flex-start' spacing={2}>
          <Grid item>
            <Typography>Private account</Typography>
          </Grid>
          <Grid item>
            <Typography>{user.isPrivate ? 'private' : 'public'}</Typography>
          </Grid>
        </Grid>
        <Grid item container justifyContent='flex-start' spacing={2}>
          <Grid item>
            <Typography>Self-introduction</Typography>
          </Grid>
          <Grid item>
            <Typography>{user.description}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction='row'
          spacing={2}
          justifyContent='flex-start'
        >
          <Grid item>
            <Button variant='contained' onClick={() => setEdit(true)}>
              Edit
            </Button>
          </Grid>
          <Grid item>
            <Button variant='text' color='error' onClick={() => setShow(true)}>
              Delete Account
            </Button>
          </Grid>
        </Grid>
      </Grid>
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
            label='profile-image'
            defaultValue={consumerImg ? consumerImg : 'Enter your image'}
            rows={3}
            fullWidth
            multiline
            onChange={(e) => setConsumerImg(e.target.value)}
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
