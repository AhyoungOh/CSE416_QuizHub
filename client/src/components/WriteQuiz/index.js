import axios from 'axios';
import React, { useState } from 'react';
import './style.scss';
import { isNumber } from '../../utils/validate';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../ImageUpload';
import {
  Grid,
  Link,
  Button,
  Typography,
  Modal,
  Box,
  Select,
  Switch,
  FormControl,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Card,
  CardMedia,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import BootstrapInput from './BootstrapInput.js';

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

const useStyles = makeStyles({
  textInput: {
    // height: '15px',
    fontSize: '12px',
  },
});

function WriteQuiz({ quizData, setQuizVisible, platformId, fetchData }) {
  // for delete confirm modal
  const [show, setShow] = useState(false);

  const default_img =
    'https://res.cloudinary.com/quizhub/image/upload/v1639090185/Default/primary_default_qdcn0l.png';

  const [quizName, setQuizName] = useState(quizData?.quizName || '');
  const [quizImage, setQuizImage] = useState(
    quizData?.quizImage || default_img
  );
  const [] = useState(quizData?.createdDate || '');
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
    quizData?.quizRewardType || 'none'
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
    quizData?.quizEnableLeaderboard || true
  );
  // console.log('quizData.quizEnableleaderboard', quizData.quizEnableLeaderboard);
  // console.log('quizEnableLeaderboard', quizEnableLeaderboard);
  const [badgevisible, setBadgevisible] = useState(
    quizRewardType == 'badge' || quizRewardType == 'both'
  );
  const [certificatevisible, setCertificatevisible] = useState(
    quizRewardType == 'certificate' || quizRewardType == 'both'
  );
  const history = useHistory();

  const createquizData = async () => {
    if (quizName === '') {
      alert('please fill out the quiz name');
      return;
    }
    if (quizDescription === '') {
      alert('please fill out the quiz description');
      return;
    }
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
    window.location.reload(false);
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
  // console.log('certificate', certificatevisible);
  // console.log('badge', badgevisible);

  if (quizData === undefined) {
    return (
      // create a new quiz
      <div className='write'>
        <Card
          sx={{ borderRadius: '18px', maxWidth: '1100px', display: 'flex' }}
        >
          <CardMedia
            component='img'
            sx={{
              heigt: '800px',
              maxWidth: '40%',
              display: { xs: 'none', sm: 'block' },
            }}
            image={quizImage}
            alt={quizName}
          />
          <Grid
            container
            direction='row'
            sx={{
              marginTop: '20px',
              marginBottom: '20px',
              marginLeft: '30px',
              marginRight: '10px',
            }}
          >
            <Grid
              item
              container
              spacing={1}
              direction='column'
              sx={{ width: '70%' }}
            >
              <Grid item>
                <FormControl variant='standard'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Title
                  </InputLabel>
                  <BootstrapInput
                    value={quizName}
                    type='text'
                    onChange={(e) => setQuizName(e.target.value)}
                    placeholder='Enter quiz title...'
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Image
                  </InputLabel>
                  <BootstrapInput
                    type='text'
                    onChange={(e) => setQuizImage(e.target.value)}
                    placeholder='Paster image url...'
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Description
                  </InputLabel>
                  <BootstrapInput
                    value={quizDescription}
                    type='text'
                    multiline
                    maxRows={3}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder='Enter quiz description...'
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Number Of trials
                  </InputLabel>
                  <BootstrapInput
                    value={quizNumberOfTrials}
                    type='number'
                    onChange={(e) => setQuizNumberOfTrials(e.target.value)}
                    placeholder='Enter the number of trials...'
                  />
                </FormControl>
              </Grid>
              <Grid item container direction='row' alignItems='flex-end'>
                <Grid item sx={{ width: '40%' }}>
                  <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Time limit
                    </InputLabel>
                    <BootstrapInput
                      value={quizTimeLimitMinutes}
                      type='number'
                      onChange={(e) => setQuizTimeLimitMinutes(e.target.value)}
                      placeholder='minutes'
                    />
                  </FormControl>
                </Grid>
                <Grid item sx={{ width: '40%' }}>
                  <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                    <BootstrapInput
                      value={quizTimeLimitSeconds}
                      type='number'
                      onChange={(e) => setQuizTimeLimitSeconds(e.target.value)}
                      placeholder='seconds'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item>
                <FormControl variant='standard' component='fieldset'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Reward type
                  </InputLabel>
                  <RadioGroup
                    value={quizRewardType}
                    onChange={(e) => {
                      setQuizRewardType(e.target.value);
                      if (e.target.value == 'certificate') {
                        setCertificatevisible(true);
                        setBadgevisible(false);
                      } else if (e.target.value == 'badge') {
                        setCertificatevisible(false);
                        setBadgevisible(true);
                      } else if (e.target.value == 'both') {
                        setCertificatevisible(true);
                        setBadgevisible(true);
                      } else {
                        // 'none'
                        setCertificatevisible(false);
                        setBadgevisible(false);
                      }
                    }}
                    row
                    aria-label='reward-type'
                    sx={{ paddingTop: '15px' }}
                  >
                    <FormControlLabel
                      value={'none'}
                      control={<Radio size='small' />}
                      label={
                        <Typography sx={{ fontSize: 16 }}>None</Typography>
                      }
                    />
                    <FormControlLabel
                      value={'certificate'}
                      control={<Radio size='small' />}
                      label={
                        <Typography sx={{ fontSize: 16 }}>
                          Certificate
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      value={'badge'}
                      control={<Radio size='small' />}
                      label={
                        <Typography sx={{ fontSize: 16 }}>Badge</Typography>
                      }
                    />
                    <FormControlLabel
                      value={'both'}
                      control={<Radio size='small' />}
                      label={
                        <Typography sx={{ fontSize: 16 }}>Both</Typography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* TODO: Slider on Modal for qualification */}
              <Grid item container direction='row' alignItems='flex-end'>
                {certificatevisible ? (
                  <Grid item sx={{ width: '40%' }}>
                    <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                      <InputLabel shrink htmlFor='bootstrap-input'>
                        Certificate Qualification
                      </InputLabel>
                      <BootstrapInput
                        value={quizCertificateQualification}
                        type='number'
                        onChange={(e) =>
                          setQuizCertificateQualification(e.target.value)
                        }
                        placeholder='questions'
                      />
                    </FormControl>
                  </Grid>
                ) : null}
                {badgevisible ? (
                  <Grid item sx={{ width: '40%' }}>
                    <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                      <InputLabel shrink htmlFor='bootstrap-input'>
                        Badge Qualification
                      </InputLabel>
                      <BootstrapInput
                        value={quizBadgeQualification}
                        type='number'
                        onChange={(e) =>
                          setQuizBadgeQualification(e.target.value)
                        }
                        placeholder='questions'
                      />
                    </FormControl>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Leaderboard
                  </InputLabel>
                  <FormGroup sx={{ paddingTop: '15px' }}>
                    <FormControlLabel
                      onChange={() =>
                        setQuizEnableLeaderboard(!quizEnableLeaderboard)
                      }
                      checked={quizEnableLeaderboard}
                      value='end'
                      control={<Switch />}
                      label={
                        quizEnableLeaderboard ? (
                          <Typography sx={{ fontSzie: 16 }}>enabled</Typography>
                        ) : (
                          <Typography sx={{ fontSzie: 16 }}>
                            disabled
                          </Typography>
                        )
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              item
              container
              spacing={1}
              direction='column'
              justifyContent='flex-end'
              alignItems='flex-end'
              sx={{ maxWidth: '30%' }}
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
        </Card>
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
        <Card
          sx={{ borderRadius: '18px', maxWidth: '1100px', display: 'flex' }}
        >
          <CardMedia
            component='img'
            sx={{
              heigt: '800px',
              maxWidth: '40%',
              display: { xs: 'none', sm: 'block' },
            }}
            image={quizImage}
            alt={quizName}
          />
          <Grid
            container
            direction='row'
            sx={{
              marginTop: '20px',
              marginBottom: '20px',
              marginLeft: '30px',
              marginRight: '10px',
            }}
          >
            <Grid
              item
              container
              spacing={1}
              direction='column'
              sx={{ width: '70%' }}
            >
              <Grid item>
                <FormControl variant='standard'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Title
                  </InputLabel>
                  <BootstrapInput
                    value={quizName}
                    type='text'
                    onChange={(e) => setQuizName(e.target.value)}
                    placeholder='Enter quiz title...'
                  />
                </FormControl>
              </Grid>
              <Grid
                item
                container
                direction='row'
                alignItems='flex-end'
                spacing={1}
              >
                <Grid item>
                  <FormControl variant='standard'>
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Image
                    </InputLabel>
                    <BootstrapInput
                      value={quizImage}
                      type='text'
                      onChange={(e) => setQuizImage(e.target.value)}
                      placeholder='Paster image url...'
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <ImageUpload quizId={quizData._id} />
                </Grid>
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Description
                  </InputLabel>
                  <BootstrapInput
                    value={quizDescription}
                    type='text'
                    multiline
                    maxRows={3}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    placeholder='Enter quiz description...'
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Number Of trials
                  </InputLabel>
                  <BootstrapInput
                    value={quizNumberOfTrials}
                    type='number'
                    onChange={(e) => setQuizNumberOfTrials(e.target.value)}
                    placeholder='Enter the number of trials...'
                  />
                </FormControl>
              </Grid>
              <Grid item container direction='row' alignItems='flex-end'>
                <Grid item sx={{ width: '40%' }}>
                  <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Time limit
                    </InputLabel>
                    <BootstrapInput
                      value={quizTimeLimitMinutes}
                      type='number'
                      onChange={(e) => setQuizTimeLimitMinutes(e.target.value)}
                      placeholder='minutes'
                    />
                  </FormControl>
                </Grid>
                <Grid item sx={{ width: '40%' }}>
                  <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                    <BootstrapInput
                      value={quizTimeLimitSeconds}
                      type='number'
                      onChange={(e) => setQuizTimeLimitSeconds(e.target.value)}
                      placeholder='seconds'
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item>
                <FormControl variant='standard' component='fieldset'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Reward type
                  </InputLabel>
                  <RadioGroup
                    value={quizRewardType}
                    onChange={(e) => {
                      setQuizRewardType(e.target.value);
                      if (e.target.value == 'certificate') {
                        setCertificatevisible(true);
                        setBadgevisible(false);
                      } else if (e.target.value == 'badge') {
                        setCertificatevisible(false);
                        setBadgevisible(true);
                      } else if (e.target.value == 'both') {
                        setCertificatevisible(true);
                        setBadgevisible(true);
                      } else {
                        // 'none'
                        setCertificatevisible(false);
                        setBadgevisible(false);
                      }
                    }}
                    row
                    aria-label='reward-type'
                    sx={{ paddingTop: '15px' }}
                  >
                    <FormControlLabel
                      disabled
                      value={'none'}
                      control={<Radio size='small' />}
                      label={
                        <Typography sx={{ fontSize: 16 }}>None</Typography>
                      }
                    />
                    <FormControlLabel
                      disabled
                      value={'certificate'}
                      control={<Radio size='small' />}
                      label={
                        <Typography sx={{ fontSize: 16 }}>
                          Certificate
                        </Typography>
                      }
                    />
                    <FormControlLabel
                      disabled
                      value={'badge'}
                      control={<Radio size='small' />}
                      label={
                        <Typography sx={{ fontSize: 16 }}>Badge</Typography>
                      }
                    />
                    <FormControlLabel
                      disabled
                      value={'both'}
                      control={<Radio size='small' />}
                      label={
                        <Typography sx={{ fontSize: 16 }}>Both</Typography>
                      }
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              {/* TODO: Slider on Modal for qualification */}
              <Grid item container direction='row' alignItems='flex-end'>
                {certificatevisible ? (
                  <Grid item sx={{ width: '40%' }}>
                    <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                      <InputLabel shrink htmlFor='bootstrap-input'>
                        Certificate Qualification
                      </InputLabel>
                      <BootstrapInput
                        value={quizCertificateQualification}
                        type='number'
                        onChange={(e) =>
                          setQuizCertificateQualification(e.target.value)
                        }
                        placeholder='questions'
                      />
                    </FormControl>
                  </Grid>
                ) : null}
                {badgevisible ? (
                  <Grid item sx={{ width: '40%' }}>
                    <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                      <InputLabel shrink htmlFor='bootstrap-input'>
                        Badge Qualification
                      </InputLabel>
                      <BootstrapInput
                        value={quizBadgeQualification}
                        type='number'
                        onChange={(e) =>
                          setQuizBadgeQualification(e.target.value)
                        }
                        placeholder='questions'
                      />
                    </FormControl>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <InputLabel required shrink htmlFor='bootstrap-input'>
                    Leaderboard
                  </InputLabel>
                  <FormGroup sx={{ paddingTop: '15px' }}>
                    <FormControlLabel
                      onChange={() =>
                        setQuizEnableLeaderboard(!quizEnableLeaderboard)
                      }
                      checked={quizEnableLeaderboard}
                      value='end'
                      control={<Switch />}
                      label={
                        quizEnableLeaderboard ? (
                          <Typography sx={{ fontSzie: 16 }}>enabled</Typography>
                        ) : (
                          <Typography sx={{ fontSzie: 16 }}>
                            disabled
                          </Typography>
                        )
                      }
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid
              item
              container
              spacing={1}
              direction='column'
              justifyContent='flex-end'
              alignItems='flex-end'
              sx={{ maxWidth: '30%' }}
            >
              <Grid item>
                <Button
                  color='error'
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Delete Quiz
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' onClick={updatequizData}>
                  Save
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
