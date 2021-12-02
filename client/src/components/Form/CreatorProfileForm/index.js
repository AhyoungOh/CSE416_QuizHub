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

// const useStyles = makeStyles({
//   dialogTitle: {
//     fontSize
//   },
// });

function CreatorProfileForm() {
  const history = useHistory();
  const { user, dispatch } = useContext(UserContext);
  // const classes = useStyles();
  // states
  const [edit, setEdit] = useState(false); // for edit dialogue
  const [show, setShow] = useState(false); // for delete account modal
  const [email, setEmail] = useState(user.email ? user.email : '');

  // saveButtonHandler: handle saving on changes and setEdit(false)
  const saveButtonHandler = async () => {
    try {
      await axios.put(
        process.env.NODE_ENV == 'production'
          ? `/api/creator/${user?.id}`
          : `http://localhost:4000/api/creator/${user?.id}`,
        {
          creatorEmail: email,
        }
      );
      setEdit(false);
    } catch (e) {
      console.error(e);
    }
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
      try {
        await axios.delete(
          process.env.NODE_ENV == 'production'
            ? `/api/auth`
            : `http://localhost:4000/api/auth`
        );
        // log user out
        dispatch({ type: 'signout' });
        // redirect to homepage
        history.push('/');
      } catch (e) {
        console.error(e);
      }
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  const cancelEdit = () => {
    setEmail(user.email ? user.email : '');
    setEdit(false);
  };

  return (
    <div>
      <Grid container direction='column' spacing={3}>
        <button onClick={() => history.replace('/creatorHome')}>
          Back to my home
        </button>
        <Grid item container justifyContent='center' spacing={2}>
          <Grid item>
            <Typography>Email</Typography>
          </Grid>
          <Grid item>
            <Typography>{user.email}</Typography>
          </Grid>
        </Grid>
        <Grid item container spacing={2} justifyContent='center'>
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
              <Typography
                id='modal-modal-title'
                variant='h6'
                sx={{ fontWeight: 'bold' }}
              >
                Delete account
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                Are you sure you would like to delete your account? You will
                lose all your data.
              </Typography>
            </Grid>
            <Grid item />
          </Grid>
          <Grid container direction='row' spacing={2}>
            <Grid item />
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
        </DialogContent>
        <DialogActions>
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

export default CreatorProfileForm;
