import axios from 'axios';
import React, { useState, useContext } from 'react';
import Input from './Input';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Typography,
} from '@mui/material';

// modal style
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

function Write({ platformData, setVisible, fetchData }) {
  const { user, dispatch } = useContext(UserContext);
  // for delete confirm modal
  const [show, setShow] = useState(false);
  const [platformName, setPlatformName] = useState(
    platformData?.platformName || ''
  );
  const [platformImage, setPlatformImage] = useState(
    platformData?.platformImage || ''
  );
  const [createdDate, setcreatedDate] = useState(
    platformData?.createdDate || ''
  );
  const [platformDescription, setPlatformDescription] = useState(
    platformData?.platformDescription || ''
  );
  const [creatorId, setcreatorUsername] = useState(
    platformData?.creatorUsername || ''
  );
  const history = useHistory();

  const createplatformData = async () => {
    console.log('user', user.id);
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/creatorHome`
        : `http://localhost:4000/api/creatorHome`,
      {
        platformName,
        creatorId: user.id,
        platformDescription,
        platformImage,
        // createdDate: Date.now(),
      }
    );
    setVisible(false);
    fetchData();
  };

  const updateplatformData = async () => {
    await axios.put(
      process.env.NODE_ENV === 'production'
        ? `/api/creatorHome/${platformData._id}`
        : `http://localhost:4000/api/creatorHome/${platformData._id}`,
      {
        _id: platformData._id,
        platformName,
        platformImage,
        platformDescription,
        createdDate: Date.now(),
        creatorId: user,
      }
    );
    setVisible(false);
    fetchData();
    history.push(`/creatorHome/${platformData._id}`);
  };

  const deleteplatformData = async () => {
    await axios.delete(
      process.env.NODE_ENV === 'production'
        ? `/api/creatorHome/${platformData._id}`
        : `http://localhost:4000/api/creatorHome/${platformData._id}`
    );
    setVisible(false);
    fetchData();
    history.push('/creatorHome');
  };

  // create new platform
  if (platformData === undefined) {
    return (
      <div>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            required
            fullWidth
            label='Title'
            type='text'
            placeholder='Enter platform title..'
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
          />
          <TextField
            autoFocus
            fullWidth
            margin='dense'
            label='Image Link'
            type='text'
            placeholder='Paste image url...'
            value={platformImage}
            onChange={(e) => setPlatformImage(e.target.value)}
          />
          <TextField
            autoFocus
            fullWidth
            margin='dense'
            label='Descirption'
            type='text'
            placeholder='Enter platform description...'
            value={platformDescription}
            onChange={(e) => setPlatformDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='success'
            onClick={createplatformData}
            sx={{ m: 1 }}
          >
            Create
          </Button>
          <Button
            variant='contained'
            color='inherit'
            onClick={() => {
              setVisible(false);
            }}
            sx={{ m: 2 }}
          >
            Cancel
          </Button>
        </DialogActions>
      </div>
    );
  } else {
    // edit platform
    return (
      <div
        onClick={(e) => {
          if ([...e.target?.classList].includes('write')) setVisible(false);
        }}
      >
        <DialogContent>
          <TextField
            required
            autoFocus
            fullWidth
            margin='dense'
            label='Title'
            type='text'
            placeholder='Enter platform title..'
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
          />
          <TextField
            autoFocus
            fullWidth
            margin='dense'
            label='Image Link'
            type='text'
            placeholder='Paste image url...'
            value={platformImage}
            onChange={(e) => setPlatformImage(e.target.value)}
          />
          <TextField
            autoFocus
            fullWidth
            margin='dense'
            label='Descirption'
            type='text'
            placeholder='Enter platform description...'
            value={platformDescription}
            onChange={(e) => setPlatformDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color='error'
            onClick={() => {
              setShow(true);
            }}
            sx={{ m: 1 }}
          >
            Delete Platform
          </Button>
          <Button
            variant='contained'
            color='success'
            onClick={updateplatformData}
            sx={{ m: 1 }}
          >
            Save
          </Button>
          {/* <Button
            variant='contained'
            onClick={() => {
              setVisible(false);
            }}
            sx={{ m: 2 }}
            color="inherit"
          >
            Cancel
          </Button> */}
        </DialogActions>
        <Modal open={show} onClose={() => setShow(false)}>
          <Box sx={style}>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Delete platform
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                  Are you sure you would like to delete platform {platformName}?
                  You will lose all your data.
                </Typography>
              </Grid>
              <Grid item />
            </Grid>
            <Grid container spacing={2} justifyContent='flex-end'>
              <Grid item>
                <Button
                  variant='text'
                  color='error'
                  onClick={deleteplatformData}
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
      </div>
    );
  }
}

export default Write;
