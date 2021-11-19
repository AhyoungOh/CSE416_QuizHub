import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import Input from './Input';
// import './style.scss';
import { useHistory } from 'react-router-dom';
import { Container, Card, Stack, Button } from '@mui/material';
import { UserContext } from '../../App';

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
        ? `${process.env.REACT_APP_API_SERVER}/api/creatorHome`
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
        ? `${process.env.REACT_APP_API_SERVER}/api/creatorHome/${platformData._id}`
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
        ? `${process.env.REACT_APP_API_SERVER}/api/creatorHome/${platformData._id}`
        : `http://localhost:4000/api/creatorHome/${platformData._id}`
    );
    setVisible(false);
    fetchData();
    history.push('/creatorHome');
  };

  if (platformData === undefined) {
    return (
      <div
        className='write'
        // onClick={() => {
        //   setVisible(false);
        // }}
      >
        {/* <Card>
          <Container> */}
        <Stack
          component='form'
          sx={{
            width: '25ch',
          }}
          spacing={2}
          noValidate
          autoComplete='off'
        >
          <Input
            title={'Platform Title'}
            value={platformName}
            setValue={setPlatformName}
          />
          <Input
            title={'Image Link'}
            value={platformImage}
            setValue={setPlatformImage}
          />
          <Input
            title={'Platform Description'}
            value={platformDescription}
            setValue={setPlatformDescription}
          />
        </Stack>
        <br></br>
        <Stack spacing={4} direction='row'>
          <Button
            variant='contained'
            color='success'
            onClick={createplatformData}
          >
            Create
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setVisible(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
        {/* </Container>
        <Stack
          component='form'
          sx={{
            width: '25ch',
          }}
          spacing={2}
          noValidate
          autoComplete='off'
        >
          <Input
            title={'Platform Title'}
            value={platformName}
            setValue={setPlatformName}
          />
          <Input
            title={'Image Link'}
            value={platformImage}
            setValue={setPlatformImage}
          />
          <Input
            title={'Platform Descirption'}
            value={platformDescription}
            setValue={setPlatformDescription}
          />
        </Stack>
        <br></br>
        <Stack spacing={4} direction='row'>
          <Button
            variant='contained'
            color='success'
            onClick={createplatformData}
          >
            Create
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              setVisible(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
        {/* </Container>
        </Card> */}
      </div>
    );
  } else {
    // edit part
    return (
      <div
        className='write'
        onClick={(e) => {
          if ([...e.target?.classList].includes('write')) setVisible(false);
        }}
      >
        <Stack
          component='form'
          sx={{
            width: '25ch',
          }}
          spacing={2}
          noValidate
          autoComplete='off'
        >
          <Input
            title={'Platform Title'}
            value={platformName}
            setValue={setPlatformName}
          />
          <Input
            title={'Image Link'}
            value={platformImage}
            setValue={setPlatformImage}
          />
          <Input
            title={'Platform sDescription'}
            value={platformDescription}
            setValue={setPlatformDescription}
          />
        </Stack>
        <br></br>
        <Stack spacing={4} direction='row'>
          <Button
            variant='contained'
            color='success'
            onClick={updateplatformData}
          >
            Save
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={deleteplatformData}
          >
            Delete
          </Button>
        </Stack>
        {/* {Input('Platform Title', title, setTitle)} */}
        {/* {Input('Image Link', imageLink, setImageLink)} */}
        {/* {Input('Content', contents, setContents)} */}
      </div>
    );
  }
}

export default Write;
