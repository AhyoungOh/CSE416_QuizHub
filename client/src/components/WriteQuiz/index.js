import axios from 'axios';
import React, { useState, useRef } from 'react';
import Input from './Input';
import './style.scss';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  TextField,
  Paper,
  Button,
  Typography,
  Modal,
  Box,
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
    quizData?.quizNumberOfTrials || ''
  );
  const [quizTimeLimitMinutes, setQuizTimeLimitMinutes] = useState(
    quizData?.quizTimeLimit?.minutes || ''
  );
  const [quizTimeLimitSeconds, setQuizTimeLimitSeconds] = useState(
    quizData?.quizTimeLimit?.seconds || ''
  );
  const [quizRewardType, setQuizRewardType] = useState(
    quizData?.quizRewardType || ''
  );
  const [quizCertificate, setQuizCertificate] = useState(
    quizData?.quizCertificate || ''
  );
  const [quizBadge, setQuizBadge] = useState(quizData?.quizBadge || '');
  const [quizCertificateQualification, setQuizCertificateQualification] =
    useState(quizData?.quizCertificateQualification || '');
  const [quizBadgeQualification, setQuizBadgeQualification] = useState(
    quizData?.quizBadgeQualification || ''
  );
  const [quizEnableLeaderboard, setQuizEnableLeaderboard] = useState(
    quizData?.quizEnableLeaderboard || ''
  );

  const groupid = useRef(0);
  const history = useHistory();

  const createquizData = async () => {
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/quiz/${platformId}`
        : `http://localhost:4000/api/quiz/${platformId}`,
      {
        platformId,
        quizName,
        quizImage,
        createdDate: Date.now(),
        quizNumberOfTrials,
        quizTimeLimitMinutes,
        quizTimeLimitSeconds,
        quizRewardType,
        quizCertificate,
        quizBadge,
        quizCertificateQualification,
        quizBadgeQualification,
        quizEnableLeaderboard,
        quizDescription,
      }
    );
    setQuizVisible(false);
    fetchData();
    //history.push(`/creatorHome/${platformId}`);
    createCertificate();
  };

  const updatequizData = async () => {
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
        quizCertificate,
        quizBadge,
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

  const createCertificate = async () => {
    const apicall = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token token=ac4e7119623388f9afad927bb881138f',
      },
    };

    const apidata = {};
    const creategroupdata = {
      group: {
        name: quizName,
        course_name: quizName,
        course_description: quizDescription,
        course_link: 'https://cse416-quizhub.netlify.app',
        attach_pdf: true,
        certificate_design_id: null,
        badge_design_id: null,
      },
    };

    try {
      await axios
        .post(
          `https://api.accredible.com/v1/issuer/groups`,
          creategroupdata,
          apicall
        )
        .then((response) => {
          console.log(response);
          groupid.current = response.data.group.id;
        });
      await axios
        .post(
          `https://api.accredible.com/v1/designers/certificate/initialize`,
          apidata,
          apicall
        )
        .then((response) => {
          console.log(response);
          history.push(
            `/createcertificate/${response.data.token}/${groupid.current}/${platformId}`
          );
        });
    } catch (e) {
      console.error(e);
    }
  };
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
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Title'
            type='text'
            placeholder='Enter quiz title..'
            // value={quizName}
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
            // value={quizImage}
            onChange={(e) => setQuizImage(e.target.value)}
            // sx={{ m: 1 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Desciprion'
            type='text'
            placeholder='Enter quiz description...'
            // value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            // sx={{ m: 1 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Number Of Trials'
            type='text'
            placeholder='Enter the number of trials...'
            // value={quizNumberOfTrials}
            onChange={(e) => setQuizNumberOfTrials(e.target.value)}
            // sx={{ m: 1 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Time limit in minutes'
            type='text'
            placeholder='Enter the number of trials...'
            // value={quizTimeLimitMinutes}
            onChange={(e) => setQuizTimeLimitMinutes(e.target.value)}
            // sx={{ m: 1 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Time limit in seconds...'
            type='text'
            placeholder='Enter the number of trials...'
            // value={quizTimeLimitSeconds}
            onChange={(e) => setQuizTimeLimitSeconds(e.target.value)}
            // sx={{ m: 1 }}
          />
          {/* I commented because of the UI design all the below code is needed */}
          <TextField
            required
            autoFocus
            margin='dense'
            label='Quiz RewardType'
            type='boolean'
            placeholder='Enter the type of reward...'
            onChange={(e) => setQuizRewardType(e.target.value)}
            // sx={{ m: 1 }}
          />
          <Input
            title={'Quiz Reward Qualification'}
            value={quizCertificateQualification}
            setValue={setQuizCertificateQualification}
          />
          <Input
            title={'Quiz Enable Leaderboard'}
            value={quizEnableLeaderboard}
            setValue={setQuizEnableLeaderboard}
          />
          <Grid
            container
            justifyContent='flex-end'
            spacing={2}
            sx={{ padding: '25px' }}
          >
            <Grid item>
              <Button variant='contained' onClick={createquizData}>
                Create quiz and Navigate to Certificate Designer
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
        <Paper
          sx={{
            display: 'flex',
            flexWrapped: 'wrap',
            flexDirection: 'column',
            minWidth: '500px',
          }}
        >
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
            sx={{ m: 3 }}
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
            sx={{ m: 3 }}
          />
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
            sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Number Of Trials'
            type='text'
            placeholder='Enter the number of trials...'
            value={quizNumberOfTrials}
            onChange={(e) => setQuizNumberOfTrials(e.target.value)}
            sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Time limit in minutes'
            type='text'
            placeholder='Enter the number of trials...'
            value={quizTimeLimitMinutes}
            onChange={(e) => setQuizTimeLimitMinutes(e.target.value)}
            sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Time limit in seconds...'
            type='text'
            placeholder='Enter the number of trials...'
            value={quizTimeLimitSeconds}
            onChange={(e) => setQuizTimeLimitSeconds(e.target.value)}
            sx={{ m: 3 }}
          />
          {/* I commented because of the UI design all the below code is needed */}
          <Input
            title={'Quiz RewardType'}
            value={quizRewardType}
            setValue={setQuizRewardType}
          />
          <Input
            title={'Quiz Reward Qualification'}
            value={quizCertificateQualification}
            setValue={setQuizCertificateQualification}
          />
          <Input
            title={'Quiz Enable Leaderboard'}
            value={quizEnableLeaderboard}
            setValue={setQuizEnableLeaderboard}
          />
          <Grid
            container
            justifyContent='flex-end'
            spacing={2}
            sx={{ padding: '25px' }}
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
        </Paper>
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
