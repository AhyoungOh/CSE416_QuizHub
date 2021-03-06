import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import { isNumber } from '../../utils/validate';
import { useHistory } from 'react-router-dom';
import ImageUpload from '../ImageUpload';
import {
  Grid,
  Button,
  Typography,
  Modal,
  Box,
  Slider,
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
import { styled } from '@mui/material/styles';
import BootstrapInput from './BootstrapInput.js';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

// modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 400,
  },
});

function WriteQuiz({ quizData, setQuizVisible, platformId, fetchData }) {
  // for delete confirm modal
  const [show, setShow] = useState(false);

  const [groupid, setGroupId] = useState('');

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
    quizData?.quizTimeLimit?.seconds ?? 0
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
      alert('Please fill out the title.');
      return;
    }
    if (quizDescription === '') {
      alert('Please fill out the description.');
      return;
    }
    if (
      !isNumber(quizNumberOfTrials) ||
      !Number.isInteger(+quizNumberOfTrials) ||
      quizNumberOfTrials <= 0
    ) {
      alert('Please enter a valid number for the number of trials.');
      return;
    }
    if (
      !isNumber(quizTimeLimitMinutes) ||
      !Number.isInteger(+quizTimeLimitMinutes) ||
      quizTimeLimitMinutes <= 0
    ) {
      alert('Please enter a valid number of minutes.');
      return;
    }
    if (
      !isNumber(quizTimeLimitSeconds) ||
      !Number.isInteger(+quizTimeLimitSeconds) ||
      quizTimeLimitSeconds < 0 ||
      quizTimeLimitSeconds >= 60
    ) {
      alert('Please enter a valid number of seconds in the range of 0 - 59.');
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
        quizCertificateQualification,
        quizBadgeQualification,
        quizEnableLeaderboard,
        quizDescription,
      }
    );
    setQuizVisible(false);
    fetchData();
    history.push(`/creatorHome/${platformId}`);
    // history.push(`/quiz/detail/${quizData._id}`);
  };

  const apicall = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=b3a628c312c7f9143f432dfec31ae02d',
    },
  };

  function findGroup(group) {
    if (group.course_description == quizData.quizDescription) {
      return true;
    } else {
      return false;
    }
  }
  const getGroupId = async () => {
    // find the group an get groupid
    // console.log(quizName);
    try {
      await axios
        .get(
          `https://api.accredible.com/v1/issuer/all_groups?name=${quizName}`,
          apicall
        )
        .then((response) => {
          console.log(response);
          const allgroups = response.data.groups.filter(findGroup);
          console.log(allgroups);
          if (allgroups.length != 0) {
            console.log(allgroups[0].id);
            setGroupId(allgroups[0].id);
          }
        });
    } catch (e) {
      console.error(e);
    }
  };
  const updateGroup = async (groupid) => {
    // update the group with groupid
    console.log('inside update group');
    const creategroupdata = {
      group: {
        name: quizName,
        course_name: quizName,
        course_description: quizDescription,
      },
    };
    try {
      await axios
        .put(
          `https://api.accredible.com/v1/issuer/groups/${groupid}`,
          creategroupdata,
          apicall
        )
        .then((response) => {
          console.log(response);
        });
    } catch (e) {
      console.error(e);
    }
  };
  const deleteGroup = async (groupid) => {
    // delete the group with groupid
    try {
      await axios
        .delete(
          `https://api.accredible.com/v1/issuer/groups/${groupid}`,
          apicall
        )
        .then((response) => {
          console.log(response);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log('inside use effect');
    console.log(quizName);
    getGroupId();
  }, []);

  const updatequizData = async () => {
    if (quizName === '') {
      alert('Please fill out the title.');
      return;
    }
    if (quizDescription === '') {
      alert('Please fill out the description.');
      return;
    }
    if (
      !isNumber(quizNumberOfTrials) ||
      !Number.isInteger(+quizNumberOfTrials) ||
      quizNumberOfTrials <= 0
    ) {
      alert('Please enter a valid number for the number of trials.');
      return;
    }
    if (
      !isNumber(quizTimeLimitMinutes) ||
      !Number.isInteger(+quizTimeLimitMinutes) ||
      quizTimeLimitMinutes <= 0
    ) {
      alert('Please enter a valid number of minutes.');
      return;
    }
    if (
      !isNumber(quizTimeLimitSeconds) ||
      !Number.isInteger(+quizTimeLimitSeconds) ||
      quizTimeLimitSeconds < 0 ||
      quizTimeLimitSeconds >= 60
    ) {
      alert('Please enter a valid number of seconds in the range of 0 - 59.');
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
        quizCertificateQualification,
        quizBadgeQualification,
        quizEnableLeaderboard,
        quizDescription,
      }
    );
    console.log('inside update quiz');
    console.log(quizName);
    console.log(groupid);
    updateGroup(groupid);

    setQuizVisible(false);
    fetchData();
    history.push(`/quiz/detail/${quizData._id}`);
    window.location.reload(false);
  };

  const deletequizData = async () => {
    console.log(groupid);
    deleteGroup(groupid);

    await axios.delete(
      process.env.NODE_ENV === 'production'
        ? `/api/quiz/detail/${quizData._id}`
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
              minWidth: '400px',
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
                  <CustomWidthTooltip
                    arrow
                    placement='right'
                    title='You can either paste the URL for the image or later upload image from your device by editing the quiz.'
                  >
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Image
                    </InputLabel>
                  </CustomWidthTooltip>
                  <BootstrapInput
                    type='text'
                    value={quizImage === default_img ? '' : quizImage}
                    onChange={(e) =>
                      setQuizImage(
                        e.target.value !== '' ? e.target.value : default_img
                      )
                    }
                    placeholder='Paster image url...'
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <Tooltip arrow title='Maximum 100 words' placement='right'>
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Description
                    </InputLabel>
                  </Tooltip>
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
                  <CustomWidthTooltip
                    arrow
                    placement='right'
                    title='Reward type cannot be changed once the quiz is created!'
                  >
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Reward type
                    </InputLabel>
                  </CustomWidthTooltip>
                  <RadioGroup
                    value={quizRewardType}
                    onChange={(e) => {
                      setQuizRewardType(e.target.value);
                      if (e.target.value === 'certificate') {
                        setCertificatevisible(true);
                        setBadgevisible(false);
                      } else if (e.target.value === 'badge') {
                        setCertificatevisible(false);
                        setBadgevisible(true);
                      } else if (e.target.value === 'both') {
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
              <Grid item container direction='row' alignItems='flex-end'>
                {certificatevisible ? (
                  <Grid item sx={{ width: '50%' }}>
                    <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                      <CustomWidthTooltip
                        title='Percentage of correctness to get the Certificate.'
                        placement='right'
                      >
                        <InputLabel shrink htmlFor='bootstrap-input'>
                          Certificate Qualification
                        </InputLabel>
                      </CustomWidthTooltip>
                      {/* <BootstrapInput value={quizCertificateQualification} type='number' onChange={(e) => setQuizCertificateQualification(e.target.value)} placeholder='questions' /> */}
                      <Box sx={{ width: 180, paddingTop: '20px' }}>
                        <Slider
                          aria-label='certificate-qualification'
                          defaultValue={quizCertificateQualification}
                          valueLabelDisplay='auto'
                          step={10}
                          marks
                          min={0}
                          max={100}
                          onChange={(e) =>
                            setQuizCertificateQualification(e.target.value)
                          }
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                ) : null}
                {badgevisible ? (
                  <Grid item sx={{ width: '50%' }}>
                    <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                      <InputLabel shrink htmlFor='bootstrap-input'>
                        Badge Qualification
                      </InputLabel>
                      {/* <BootstrapInput value={quizBadgeQualification} type='number' onChange={(e) => setQuizBadgeQualification(e.target.value)} placeholder='questions' /> */}
                      <Box sx={{ width: 180, paddingTop: '20px' }}>
                        <Slider
                          aria-label='badge-qualification'
                          defaultValue={quizBadgeQualification}
                          valueLabelDisplay='auto'
                          step={10}
                          marks
                          min={0}
                          max={100}
                          onChange={(e) =>
                            setQuizBadgeQualification(e.target.value)
                          }
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <CustomWidthTooltip
                    arrow
                    placement='right'
                    title='Enabling leaderboard will make it visible to the public!'
                  >
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Leaderboard
                    </InputLabel>
                  </CustomWidthTooltip>
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
          sx={{
            borderRadius: '18px',
            maxWidth: '1100px',
            maxHeight: '95%',
            display: 'flex',
          }}
        >
          <CardMedia
            component='img'
            sx={{
              heigt: '800px',
              minWidth: '400px',
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
                    <CustomWidthTooltip
                      arrow
                      placement='right'
                      title='You can either paste the URL for the image or upload an image from your device.'
                    >
                      <InputLabel required shrink htmlFor='bootstrap-input'>
                        Image
                      </InputLabel>
                    </CustomWidthTooltip>
                    <BootstrapInput
                      value={quizImage === default_img ? '' : quizImage}
                      type='text'
                      onChange={(e) =>
                        setQuizImage(
                          e.target.value !== '' ? e.target.value : default_img
                        )
                      }
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
                  <Tooltip arrow title='Maximum 100 words' placement='right'>
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Description
                    </InputLabel>
                  </Tooltip>
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
                  <CustomWidthTooltip
                    arrow
                    placement='right'
                    title='Reward type cannot be changed once the quiz is created.'
                  >
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Reward type
                    </InputLabel>
                  </CustomWidthTooltip>
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
              <Grid item container direction='row' alignItems='flex-end'>
                {certificatevisible ? (
                  <Grid item sx={{ width: '50%' }}>
                    <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                      <InputLabel shrink htmlFor='bootstrap-input'>
                        Certificate Qualification
                      </InputLabel>
                      {/* <BootstrapInput value={quizCertificateQualification} type='number' onChange={(e) => setQuizCertificateQualification(e.target.value)} placeholder='questions' /> */}
                      <Box sx={{ width: 180, paddingTop: '20px' }}>
                        <Slider
                          aria-label='certificate-qualification'
                          defaultValue={quizCertificateQualification}
                          valueLabelDisplay='auto'
                          step={10}
                          marks
                          min={0}
                          max={100}
                          onChange={(e) =>
                            setQuizCertificateQualification(e.target.value)
                          }
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                ) : null}
                {badgevisible ? (
                  <Grid item sx={{ width: '50%' }}>
                    <FormControl variant='standard' sx={{ maxWidth: '95%' }}>
                      <InputLabel shrink htmlFor='bootstrap-input'>
                        Badge Qualification
                      </InputLabel>
                      {/* <BootstrapInput value={quizBadgeQualification} type='number' onChange={(e) => setQuizBadgeQualification(e.target.value)} placeholder='questions' /> */}
                      <Box sx={{ width: 180, paddingTop: '20px' }}>
                        <Slider
                          aria-label='badge-qualification'
                          defaultValue={quizBadgeQualification}
                          valueLabelDisplay='auto'
                          step={10}
                          marks
                          min={0}
                          max={100}
                          onChange={(e) =>
                            setQuizBadgeQualification(e.target.value)
                          }
                        />
                      </Box>
                    </FormControl>
                  </Grid>
                ) : null}
              </Grid>
              <Grid item>
                <FormControl variant='standard'>
                  <CustomWidthTooltip
                    arrow
                    placement='right'
                    title='Enabling leaderboard will make it visible to the public!'
                  >
                    <InputLabel required shrink htmlFor='bootstrap-input'>
                      Leaderboard
                    </InputLabel>
                  </CustomWidthTooltip>
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
                <Button variant='contained' onClick={updatequizData}>
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='outlined'
                  color='error'
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  Delete Quiz
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
