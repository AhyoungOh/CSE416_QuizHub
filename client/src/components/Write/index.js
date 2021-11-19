import axios from 'axios';
import React, { useState, useContext } from 'react';
import Input from './Input';
import { UserContext } from '../../App';
import { useHistory } from 'react-router-dom';
import { Stack, Button, TextField, DialogContent, DialogActions } from '@mui/material';

function Write({ platformData, setVisible, fetchData }) {
  const { user, dispatch } = useContext(UserContext);
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
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/creatorHome`
        : `http://localhost:4000/api/creatorHome`,
      {
        platformName,
        platformDescription,
        platformImage,
        createdDate: Date.now(),
        creatorId: user.id,
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
            margin="dense"
            required
            fullWidth
            label="Title"
            type="text" 
            placeholder="Enter platform title.."
            // value={platformName}
            onChange={setPlatformName}
          />
          <TextField
            autoFocus 
            fullWidth
            margin="dense"
            label="Image Link"
            type="text" 
            placeholder="Paste image url..."
            // value={platformImage}
            onChange={setPlatformImage}
          />
          <TextField
            autoFocus 
            fullWidth
            margin="dense"
            label="Descirption"
            type="text" 
            placeholder="Enter platform description..."
            // value={platformDescription}
            onChange={setPlatformDescription}
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
            color="inherit"
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
            margin="dense"
            label="Title"
            type="text" 
            placeholder="Enter platform title.."
            value={platformName}
            onChange={setPlatformName}
          />
          <TextField
            autoFocus 
            fullWidth
            margin="dense"
            label="Image Link"
            type="text" 
            placeholder="Paste image url..."
            value={platformImage}
            onChange={setPlatformImage}
          />
          <TextField
            autoFocus 
            fullWidth
            margin="dense"
            label="Descirption"
            type="text" 
            placeholder="Enter platform description..."
            value={platformDescription}
            onChange={setPlatformDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color='error'
            onClick={deleteplatformData}
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
      </div>
    );
  }
}

export default Write;
