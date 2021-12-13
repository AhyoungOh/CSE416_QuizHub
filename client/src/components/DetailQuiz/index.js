import Quiz from '../Quiz';
import Question from '../Question';
import React, { useState, useRef ,useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  Box,
  Grid,
  Button,
  IconButton,
  Card,
  CardMedia,
  ListItem,
  ListItemIcon,
  ListItemText,
  CardContent,
  Typography,
  Fab,
  Tooltip,
  Link,
  Collapse,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

const useStyles = makeStyles({
  buttonsContainer: {
    paddingTop: '30px',
    paddingBottom: '20px',
    paddingLeft: '20px',
  },
  cardContainer: {
    paddingTop: '10px',
    paddingBottom: '20px',
  },
  cardMedia: {
    maxWidth: '50%',
    maxHeight: '500px',
    display: { xs: 'none', sm: 'block' },
  },
  infoWrapper: {
    diplay: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  title: {
    fontFamily: 'Nunito',
  },
  emphasized: {
    fontWeight: 'bold', 
    fontFamily: 'Open Sans',
  },
  normal: {
    color: '#6E798C',
    fontFamily: 'Open Sans',
  },
});

function DetailQuiz({ quizData, setQuizVisible }) {
  const owned = [];
  const history = useHistory();

  const groupid = useRef(0);
  const isGroup = useRef(0);

  const classes = useStyles();

  // states
  const [groupExists, setGroupExists]= useState(false);
  const [checked, setChecked] = useState(false);

  for (let i = 0; i < Object.keys(quizData.quizQuestions).length; i++) {
    owned.push(quizData.quizQuestions[i].questionQuestion + ', ');
  }

  console.log('quizData', quizData);

  const apicall = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=38040def040af70134a08e39a3db35d3',
    },
  };

  const apidata = {};

  function findGroup(group){
    if(group.course_description==quizData.quizDescription){
      return true
    }
    else{
      return false
    }
  }

  const checkGroup = async () =>{
    try {
      await axios
        .get(
          `https://api.accredible.com/v1/issuer/all_groups?name=${quizData.quizName}`,
          apicall
        )
        .then((response) => {
          console.log(response);
          const allgroups=response.data.groups.filter(findGroup)
          console.log(allgroups)
          if(allgroups.length!=0){
            setGroupExists(true)
          }
        });
    } catch (e) {
      console.error(e);
    }  
  }

  useEffect(() => {
    checkGroup()
  }, []);


  const creategroupdata = {
    group: {
      name: quizData.quizName,
      course_name: quizData.quizName,
      course_description: quizData.quizDescription,
      course_link: 'https://cse416-quizhub.netlify.app',
      attach_pdf: true,
      certificate_design_id: null,
      badge_design_id: null,
    },
  };

  const createCertificate = async () => {
    try {
      console.log(isGroup.current);
      if (isGroup.current == 0) {
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
        isGroup.current = 1;
      }
      console.log(isGroup.current);
      console.log(groupid);

      await axios
        .post(
          `https://api.accredible.com/v1/designers/certificate/initialize`,
          apidata,
          apicall
        )
        .then((response) => {
          console.log(response);
          history.push(
            `/createcertificate/${response.data.token}/${groupid.current}/${
              quizData._id
            }/${0}`
          );
        });
    } catch (e) {
      console.error(e);
    }
  };

  const createBadge = async () => {
    try {
      console.log(isGroup.current);
      if (isGroup.current == 0) {
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
        } catch (e) {
          console.error(e);
        }
        isGroup.current = 1;
      }
      console.log(groupid);

      await axios
        .post(
          `https://api.accredible.com/v1/designers/badge/initialize`,
          apidata,
          apicall
        )
        .then((response) => {
          console.log(response);
          history.push(
            `/createbadge/${response.data.token}/${groupid.current}/${quizData._id}`
          );
        });
    } catch (e) {
      console.error(e);
    }
  };

  const createCertificateandBadge = async () => {
    try {
      console.log(isGroup.current);
      if (isGroup.current == 0) {
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
        isGroup.current = 1;
      }
      console.log(isGroup.current);
      console.log(groupid);

      await axios
        .post(
          `https://api.accredible.com/v1/designers/certificate/initialize`,
          apidata,
          apicall
        )
        .then((response) => {
          console.log(response);
          history.push(
            `/createcertificate/${response.data.token}/${groupid.current}/${
              quizData._id
            }/${1}`
          );
        });
    } catch (e) {
      console.error(e);
    }
  };

  const QuestionComponents = quizData.quizQuestions.map((questionData) => {
    return (
      <Grid item sx={{ minWidth: '800px' }}>
        <Question
          questionNumber={questionData.questionNumber}
          questionQuestion={questionData.questionQuestion}
          questionAnswer={questionData.questionAnswer}
          questionOptions={questionData.questionOptions}
          setquestionData={() => {
            history.push(`/question/detail/${questionData._id}`);
          }}
        />
      </Grid>
    );
  });

  const questionPreviewList = (
    <Grid
      container
      direction='column'
      spacing={2}
      justifyContent='center'
      alignItems='center'
      sx={{ maxWidth: '1000px' }}
    >
      <Grid item>
        <IconButton onClick={() => setChecked(false)}>
          <ExpandLessRoundedIcon />
        </IconButton>
      </Grid>
      {QuestionComponents}
    </Grid>
  );

  const questionNumber = [];
  for (let i = 0; i < Object.keys(quizData.quizQuestions).length; i++) {
    questionNumber.push(quizData.quizQuestions[i].quesitonNumber);
  }

  const updateQuizData = () => {
    setQuizVisible(true);
  };

  const updateQuestionData = () => {
    history.push(`/question/${quizData._id}`);
  };

  const gotoLeaderboard = () => {
    history.push(`/leaderboard/${quizData._id}`);
  };

  console.log('quizData.quizTimeLimit', quizData.quizTimeLimit);
  return (
    <div>
      <Grid containter sx={{ paddingLeft: '50px', paddingTop: '70px' }}>
        <Button
          onClick={() => {
            history.push(`/creatorHome/${quizData.platformId}`);
          }}
          // startIcon={<KeyboardBackspaceRoundedIcon />}
          sx={{ color: 'gray' }}
        >
          Back to platform page
        </Button>
      </Grid>
      {/* TODO: change it to creator preview quiz card */}
      <Grid container justifyContent='center' className={classes.cardContainer} spacing={2} sx={{ paddingTop: '80px', paddingLeft: '40px', paddingRight: '40px' }}>
        <Grid item alignSelf='center'>
          <Card sx={{ borderRadius: '18px' }}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component='img'
                className={classes.cardMedia}
                image={quizData.quizImage}
                alt={quizData.quizName}
              />
              <Box className={classes.infoWrapper}>
                <CardContent sx={{ flex: 1 }}>
                  {/* <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                    {quizCreatedDate.slice(0, 10)}
                  </Typography> */}
                  <Typography variant='h4' className={classes.title}>
                    {quizData.quizName}
                  </Typography>
                  <Typography variant='subtitle1'>{quizData.quizDescription}</Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px' }}>
                  <ListItem>
                    <ListItemIcon>
                      <AccessAlarmRoundedIcon sx={{ color: '#004080' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Grid container>
                          {
                          quizData.quizTimeLimit ? <Grid item>
                            <Typography className={classes.emphasized}>{quizData.quizTimeLimit.minutes}{quizData.quizTimeLimit.seconds === 0 || quizData.quizTimeLimit.seconds == null ? '' : (quizData.quizTimeLimit.seconds/60).toFixed(2).toString().substring(1)}</Typography>
                          </Grid> : null 
                          }
                          <Grid item>
                            <Typography className={classes.normal}>&nbsp;minutes</Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AssignmentRoundedIcon sx={{ color: '#004080' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Grid container>
                          <Grid item>
                            <Tooltip placement='top' title='See created questions'>
                              <Link color='common.black' underline='hover' onClick={() => setChecked(true)}className={classes.emphasized} sx={{ cursor: 'pointer' }}>
                                {quizData.quizQuestions.length}
                              </Link>
                            </Tooltip>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.normal}>&nbsp;questions</Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <MilitaryTechRoundedIcon sx={{ color: '#004080' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        quizData.quizRewardType == 'both' && groupExists ? 
                          <Grid container>
                            <Grid item>
                              <Typography className={classes.emphasized}>Badge</Typography>
                            </Grid>
                            <Grid item>
                              <Typography className={classes.normal}>&nbsp;/&nbsp;</Typography>
                            </Grid>
                            <Grid item>
                              <Typography className={classes.emphasized}>Certificate</Typography>
                            </Grid>
                          </Grid> 
                          : quizData.quizRewardType == 'both' ?
                            <Tooltip placement='top' title='Create badge and certificate'>
                              <Link onClick={createCertificateandBadge} underline="none" color='common.black' className={classes.emphasized} sx={{ cursor: 'pointer' }}>
                                <Grid container>
                                  <Grid item>
                                    <Typography className={classes.emphasized}>Badge</Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography className={classes.normal}>&nbsp;/&nbsp;</Typography>
                                  </Grid>
                                  <Grid item>
                                    <Typography className={classes.emphasized}>Certificate</Typography>
                                  </Grid>
                                </Grid>
                              </Link>
                            </Tooltip>
                            : quizData.quizRewardType == 'none' ?
                            <Typography className={classes.normal}>No reward</Typography>
                              : quizData.quizRewardType == 'badge' && groupExists ?
                                // badge
                                <Typography className={classes.emphasized}>{quizData.quizRewardType}</Typography>
                                : quizData.quizRewardType == 'badge' ?
                                  <Tooltip title='Create badge'>
                                    <Link onClick={createBadge} underline="none" color='common.black' className={classes.emphasized} sx={{ cursor: 'pointer' }}>{quizData.quizRewardType}</Link>
                                  </Tooltip>
                                    // certificate
                                  : quizData.quizRewardType == 'certificate' && groupExists ?
                                    <Typography className={classes.emphasized}>{quizData.quizRewardType}</Typography>
                                    : 
                                      <Tooltip title='Create certificate'>
                                        <Link onClick={createCertificate}underline="none" color='common.black' className={classes.emphasized} sx={{ cursor: 'pointer' }}>{quizData.quizRewardType}</Link>
                                      </Tooltip>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <HistoryRoundedIcon sx={{ color: '#004080' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Grid container>
                          <Grid item>
                            <Typography className={classes.emphasized}>{quizData.quizNumberOfTrials}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.normal}>&nbsp;trials</Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <EmojiEventsRoundedIcon sx={{ color: '#004080' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        // quizEnableLeaderboard
                        <div>
                          <Grid container direction='row'>
                            <Grid item>
                              <Tooltip title='Check out leaderboard'>
                                <Link onClick={gotoLeaderboard} underline="none" color='common.black' className={classes.emphasized} sx={{ cursor: 'pointer' }}>
                                  Leaderboard 
                                </Link>
                              </Tooltip>
                            </Grid>
                            <Grid item>
                              { quizData.quizEnableLeaderboard ? 
                                <Tooltip title='Leaderboard is visiable to the public'>
                                  <Typography className={classes.normal}>&nbsp;enabled</Typography>
                                </Tooltip>
                                :
                                <Typography className={classes.normal}>&nbsp;disabled</Typography>
                              }
                            </Grid>
                          </Grid>
                        </div>
                      }
                    />
                  </ListItem>
                </Box>
                <Button variant='contained' onClick={updateQuestionData} sx={{ marginLeft: '20px' }}>
                  Add Quesiton
                </Button>
              </Box>
            </Card>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '40px' }}>
        <Collapse in={checked}>
          {questionPreviewList}
        </Collapse>
      </Box>
      <Tooltip placement='top' title='Edit quiz'>
        <Fab color='primary' onClick={updateQuizData} sx={{ position: 'fixed', right: '3%', bottom: '3%' }}>
          <EditRoundedIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default DetailQuiz;
