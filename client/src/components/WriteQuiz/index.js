import axios from 'axios';
import React, { useState } from 'react';
import Input from './Input';
import './style.scss';
import { isNumber } from '../../utils/validate';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../ImageUpload';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  Modal,
  Box,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Slider,
  Card
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

function WriteQuiz({ quizData, setQuizVisible, platformId, fetchData }) {
  // for delete confirm modal
  const [show, setShow] = useState(false);
  // const [platformId, setPlatformId] = useState(quizData?.platformId || '');
  const [quizName, setQuizName] = useState(quizData?.quizName || '');
  const [quizImage, setQuizImage] = useState(quizData?.quizImage || '');
  const [createdDate, setCreatedDate] = useState(quizData?.createdDate || '');
  const [quizDescription, setQuizDescription] = useState(
    quizData?.quizDescription || ''
  );
  const [quizNumberOfTrials, setQuizNumberOfTrials] = useState(
    quizData?.quizNumberOfTrials ?? ''
  );
  const [quizTimeLimitMinutes, setQuizTimeLimitMinutes] = useState(
    quizData?.quizTimeLimit?.minutes ?? ''
  );
  const [quizTimeLimitSeconds, setQuizTimeLimitSeconds] = useState(
    quizData?.quizTimeLimit?.seconds ?? ''
  );
  const [quizRewardType, setQuizRewardType] = useState(
    quizData?.quizRewardType || ''
  );
  // const [quizCertificate, setQuizCertificate] = useState(
  //   quizData?.quizCertificate || ''
  // );
  // const [quizBadge, setQuizBadge] = useState(quizData?.quizBadge || '');
  const [quizCertificateQualification, setQuizCertificateQualification] =
    useState(quizData?.quizCertificateQualification ?? '');
  const [quizBadgeQualification, setQuizBadgeQualification] = useState(
    quizData?.quizBadgeQualification ?? ''
  );
  const [quizEnableLeaderboard, setQuizEnableLeaderboard] = useState(
    quizData?.quizEnableLeaderboard || ''
  );
  // console.log('quizData.quizEnableleaderboard', quizData.quizEnableLeaderboard);
  // console.log('quizEnableLeaderboard', quizEnableLeaderboard);
  const [badgevisible, setBadgevisible] = useState(false);
  const [certificatevisible, setCertificatevisible] = useState(false);
  const history = useHistory();
  const createquizData = async () => {
    if (!isNumber(quizNumberOfTrials)) {
      alert('please fill out the quiz number of trials');
      return;
    }
    if (!isNumber(quizTimeLimitMinutes)) {
      alert('please fill out the quiz time minutes');
      return;
    }
    if (!isNumber(quizTimeLimitSeconds)) {
      alert('please fill out the quiz time seconds');
      return;
    }
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/quiz/${platformId}`
        : `http://localhost:4000/api/quiz/${platformId}`,
      {
        platformId,
        quizImage,
        quizName,
        createdDate: Date.now(),
        quizNumberOfTrials,
        quizTimeLimitMinutes,
        quizTimeLimitSeconds,
        quizRewardType,
        // quizCertificate,
        // quizBadge,
        quizCertificateQualification,
        quizBadgeQualification,
        quizEnableLeaderboard,
        quizDescription,
      }
    );
    setQuizVisible(false);
    fetchData();
    history.push(`/creatorHome/${platformId}`);
  };
  const updatequizData = async () => {
    if (!isNumber(quizNumberOfTrials)) {
      alert('please fill out the quiz number of trials');
      return;
    }
    if (!isNumber(quizTimeLimitMinutes)) {
      alert('please fill out the quiz time minutes');
      return;
    }
    if (!isNumber(quizTimeLimitSeconds)) {
      alert('please fill out the quiz time seconds');
      return;
    }

    await axios.put(
      process.env.NODE_ENV === 'production'
        ? `/api/quiz/detail/${quizData._id}`
        : `http://localhost:4000/api/quiz/detail/${quizData._id}`,
      {
        _id: quizData._id,
        platformId,
        quizImage,
        quizName,
        createdDate: Date.now(),
        quizNumberOfTrials,
        quizTimeLimitMinutes,
        quizTimeLimitSeconds,
        quizRewardType,
        // quizCertificate,
        // quizBadge,
        quizCertificateQualification,
        quizBadgeQualification,
        quizEnableLeaderboard,
        quizDescription,
      }
    );
    setQuizVisible(false);
    fetchData();
    history.push(`/quiz/detail/${quizData._id}`);
  };

  const deletequizData = async () => {
    await axios.delete(
      process.env.NODE_ENV === 'production'
        ? `/api/quiz/deatil/${quizData._id}`
        : `http://localhost:4000/api/quiz/detail/${quizData._id}`
    );
    setQuizVisible(false);
    fetchData();
    history.push(`/creatorHome/${platformId}`);
  };
  console.log('certificate', certificatevisible);
  console.log('badge', badgevisible);

  if (quizData === undefined) {
    return (
      // create a new quiz
      <div className='write'>
        <Paper
          sx={{
            display: 'flex',
            flexWrapped: 'wrap',
            flexDirection: 'column',
            minWidth: '500px',
          }}
        >
          <Grid container sx={{ margin: '10px' }}>
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Title'
            type='text'
            placeholder='Enter quiz title..'
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            // sx={{ m: 1 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Image'
            type='text'
            placeholder='Paster image url...'
            value={quizImage}
            onChange={(e) => setQuizImage(e.target.value)}
            // sx={{ m: 1 }}
          />
          <ImageUpload quizId={quizData._id} />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Desciprion'
            type='text'
            placeholder='Enter quiz description...'
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            // sx={{ m: 1 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Number Of Trials'
            type='number'
            placeholder='Enter the number of trials...'
            value={quizNumberOfTrials}
            onChange={(e) => setQuizNumberOfTrials(e.target.value)}
            // sx={{ m: 1 }}
          />
          <Box
            component='form'
            sx={{
              '& .MuiTextField-root': { m: 1, width: '30ch' },
            }}
            noValidate
            autoComplete='off'
          >
            <TextField
              required
              autoFocus
              // fullWidth
              margin='dense'
              label='Time limit in minutes'
              type='number'
              placeholder='Enter the time limit in minutes...'
              value={quizTimeLimitMinutes}
              onChange={(e) => setQuizTimeLimitMinutes(e.target.value)}
              // sx={{ m: 1 }}
            />
            <TextField
              required
              autoFocus
              // fullWidth
              margin='dense'
              label='Time limit in seconds...'
              type='number'
              placeholder='Enter the time limit in seconds...'
              value={quizTimeLimitSeconds}
              onChange={(e) => setQuizTimeLimitSeconds(e.target.value)}
              // sx={{ m: 1 }}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Reward Type </InputLabel>
            <Select
              required
              autoFocus
              value={quizRewardType}
              label='Leaderboard Enable'
              onChange={(e) => setQuizRewardType(e.target.value)}
            >
              <MenuItem
                value={'none'}
                onClick={() => {
                  setCertificatevisible(false);
                  setBadgevisible(false);
                }}
              >
                No Reward
              </MenuItem>
              <MenuItem
                value={'certificate'}
                onClick={() => {
                  setCertificatevisible(true);
                  setBadgevisible(false);
                }}
              >
                Certificate
              </MenuItem>
              <MenuItem
                value={'badge'}
                onClick={() => {
                  setBadgevisible(true);
                  setCertificatevisible(false);
                }}
              >
                Badge
              </MenuItem>
              {/* <MenuItem
                value={'both'}
                onClick={() => {
                  setCertificatevisible(true);
                  setBadgevisible(true);
                }}
              >
                Both */}
              {/* </MenuItem> */}
            </Select>
          </FormControl>
          {certificatevisible ? (
            <TextField
              // required
              autoFocus
              margin='dense'
              label='Quiz Certificate Reward Qualification'
              type='number'
              placeholder='Enter the number for certificate reward qualification'
              value={quizCertificateQualification}
              onChange={(e) => setQuizCertificateQualification(e.target.value)}
            />
          ) : null}
          {badgevisible ? (
            <TextField
              // required
              autoFocus
              margin='dense'
              label='Quiz Badge Reward Qualification'
              type='number'
              placeholder='Enter the number for badge reward qualification'
              value={quizBadgeQualification}
              onChange={(e) => setQuizBadgeQualification(e.target.value)}
            />
          ) : null}

          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
              Leaderboard Enable
            </InputLabel>
            <Select
              required
              autoFocus
              value={quizEnableLeaderboard}
              label='Leaderboard Enable'
              onChange={(e) => setQuizEnableLeaderboard(e.target.value)}
            >
              <MenuItem value={true}>Yes Leaderboard</MenuItem>
              <MenuItem value={false}>No Leaderboard</MenuItem>
            </Select>
          </FormControl>
          <Grid
            container
            justifyContent='flex-end'
            spacing={2}
            sx={{ padding: '25px' }}
          >
            <Grid item>
              <Button variant='contained' onClick={createquizData}>
                Create quiz
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant='outlined'
                color='inherit'
                onClick={() => {
                  history.push(`/creatorHome/${platformId}`);
                }}
                // onClick={() => {
                //   setQuizVisible(false);
                // }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
          </Grid>
        </Paper>
      </div>
    );
  } else {
    // edit quiz
    return (
      <div
        className='write'
        onClick={(e) => {
          if ([...e.target?.classList].includes('write')) setQuizVisible(false);
        }}
      >
        {/* <Paper
          sx={{
            display: 'flex',
            flexWrapped: 'wrap',
            flexDirection: 'column',
            minWidth: '500px',
          }}
        > */}
        <Card sx={{ borderRadius: '18px', maxWidth: '1000px'}}>
          <Grid container spacing={1} sx={{ margin: '20px' }} direction='column'>
            <Grid item>
              <TextField
                required
                autoFocus
                // fullWidth
                margin='dense'
                label='Title'
                type='text'
                placeholder='Enter quiz title..'
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                // sx={{ m: 3 }}
              />
            </Grid>
            <Grid item container direction='row' alignItems='center' spacing={1}>
              <Grid item>
                <TextField
                  required
                  autoFocus
                  // fullWidth
                  margin='dense'
                  label='Image'
                  type='text'
                  placeholder='Paster image url...'
                  value={quizImage}
                  onChange={(e) => setQuizImage(e.target.value)}
                  // sx={{ m: 3 }}
                />
              </Grid>
              <Grid item>
                <ImageUpload quizId={quizData._id} />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                required
                autoFocus
                // fullWidth
                margin='dense'
                label='Desciprion'
                type='text'
                placeholder='Enter quiz description...'
                value={quizDescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                // sx={{ m: 3 }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                autoFocus
                // fullWidth
                margin='dense'
                label='Number Of Trials'
                type='number'
                placeholder='Enter the number of trials...'
                value={quizNumberOfTrials}
                onChange={(e) => setQuizNumberOfTrials(e.target.value)}
                // sx={{ m: 3 }}
              />
            </Grid>
            <Grid item container direction='row' spacing={1}>
              <Grid item sx={{ maxWidth: '40%'}}>
                <TextField
                  required
                  autoFocus
                  // fullWidth
                  margin='dense'
                  label='Time limit in minutes'
                  type='number'
                  placeholder='Enter time limit in minutes...'
                  value={quizTimeLimitMinutes}
                  onChange={(e) => setQuizTimeLimitMinutes(e.target.value)}
                  // sx={{ m: 3 }}
                />
              </Grid>
              <Grid item sx={{ maxWidth: '40%'}}>
                <TextField
                  required
                  autoFocus
                  // fullWidth
                  margin='dense'
                  label='Time limit in seconds...'
                  type='number'
                  placeholder='Enter time limit in seconds...'
                  value={quizTimeLimitSeconds}
                  onChange={(e) => setQuizTimeLimitSeconds(e.target.value)}
                  // sx={{ m: 3 }}
                />
              </Grid>
            </Grid>
            {/* </Box> */}
            <Grid item>
              <FormControl sx={{ width: '80%' }}>
                <InputLabel id='demo-simple-select-label'>Reward Type </InputLabel>
                <Select
                  required
                  autoFocus
                  value={quizRewardType}
                  label='Leaderboard Enable'
                  onChange={(e) => setQuizRewardType(e.target.value)}
                >
                  <MenuItem value={'none'}>No Reward</MenuItem>
                  <MenuItem value={'certificate'}>Certificate</MenuItem>
                  <MenuItem value={'badge'}>Badge</MenuItem>
                  {/* <MenuItem value={'both'}>Both</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item container direction='row' spacing={1}>
              <Grid item sx={{ maxWidth: '40%'}}>
                <TextField
                  required
                  autoFocus
                  margin='dense'
                  label='Quiz Reward Qualification'
                  type='number'
                  placeholder='Enter the number for reward qualification'
                  value={quizCertificateQualification}
                  onChange={(e) => setQuizCertificateQualification(e.target.value)}
                />
              </Grid>
              <Grid item sx={{ maxWidth: '40%'}}>
                <TextField
                  // required
                  autoFocus
                  margin='dense'
                  label='Quiz Badge Reward Qualification'
                  type='number'
                  placeholder='Enter the number for badge reward qualification'
                  value={quizBadgeQualification}
                  onChange={(e) => setQuizBadgeQualification(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item>
              <FormControl sx={{ width: '80%' }}>
                <InputLabel id='demo-simple-select-label'>
                  Leaderboard Enable
                </InputLabel>
                <Select
                  required
                  autoFocus
                  value={quizEnableLeaderboard}
                  label='Leaderboard Enable'
                  onChange={(e) => setQuizEnableLeaderboard(e.target.value)}
                >
                  <MenuItem value={true}>Yes Leaderboard</MenuItem>
                  <MenuItem value={false}>No Leaderboard</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              container
              spacing={2}
              sx={{ paddingTop: '10px' }}
            >
              <Grid item>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Delete
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' onClick={updatequizData}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Modal open={show} onClose={() => setShow(false)}>
          <Box sx={style}>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Delete quiz
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                  Are you sure you would like to delete quiz {quizName}? You
                  will lose all your data.
                </Typography>
              </Grid>
              <Grid item />
            </Grid>
            <Grid container spacing={2} justifyContent='flex-end'>
              <Grid item>
                <Button variant='text' color='error' onClick={deletequizData}>
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

export default WriteQuiz;
