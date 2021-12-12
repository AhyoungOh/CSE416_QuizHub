// TODO: add ui for consumer quiz preview card
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import useApiCall from '../../../hooks/useApiCall';
import { UserContext } from '../../../App';
import {
  Paper,
  InputBase,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Tooltip,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

const useStyles = makeStyles({
  returnButton: {
    padding: '10px',
  },
  card: {
    borderRadius: '38px',
    display: 'flex',
    // minHeight: '400px',
    // maxWidth: '1200px',
  },
  cardMedia: {
    maxWidth: '40%',
    minHeight: '400px',
    display: { xs: 'none', sm: 'block' },
  },
  infoWrapper: {
    diplay: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  title: {
    // fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  startButton: {
    padding: '10px',
    minWidth: '300px',
    borderRadius: '10px',
    marginLeft: '10px',
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

function ConsumerQuizPreview() {
  const { id } = useParams();
  const quizId = id;
  const history = useHistory();
  const classes = useStyles();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [trials, setTrials] = useState(0);
  const [time_min, setTimeMin] = useState(0);
  const [time_sec, setTimeSec] = useState(0);
  const [reward, setReward] = useState(0);
  const [num_questions, setNumQuestions] = useState(0);
  const [leaderboardVisible, setLeaderboardVisible] = useState('');
  // const [usedTrialNum, setUsedTrialNum] = useState(0);
  const { user, dispatch } = useContext(UserContext);

  const clickStartBtn = async () => {
    if (trials <= 0) {
      alert('there is no more trials on this quiz');
      return;
    }

    const quiz = user.consumerQuizHistoryList.find((e) => e.quizId === id);

    if (quiz) {
      await axios.put(`/api/consumer/quiz/trial/${id}`);
    } else {
      await axios.post(`/api/consumer/quiz`, {
        quizzes: {
          quizId: id,
          answerchoices: [],
          quizTimeTaken: { minutes: 0, seconds: 0 },
          accomplishedDate: new Date(),
          usedTrialNumber: 1,
        },
      });
    }

    history.push(`/consumerquizpage/${id}`);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.NODE_ENV == 'production'
          ? `/api/quiz/detail/${id}`
          : `http://localhost:4000/api/quiz/detail/${id}`
      );

      const userInfo = await axios.get(
        process.env.NODE_ENV === 'production'
          ? `/api/auth`
          : `http://localhost:4000/api/auth`,
        { withCredentials: true }
      );

      const trialNum =
        userInfo.data.consumer?.consumerQuizHistoryList?.find((e) => {
          return e.quizId === id;
        })?.usedTrialNumber || 0;
      setName(response.data.quiz.quizName);
      setImage(response.data.quiz.quizImage);
      setDescription(response.data.quiz.quizDescription);
      setTrials(response.data.quiz.quizNumberOfTrials - trialNum);
      setTimeMin(response.data.quiz.quizTimeLimit.minutes);
      setTimeSec(response.data.quiz.quizTimeLimit.seconds);
      setReward(response.data.quiz.quizRewardType);
      setNumQuestions(response.data.quiz.quizQuestions.length);
      setLeaderboardVisible(response.data.quiz.quizEnableLeaderboard);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div>
      <Grid
        container
        direction='column'
        alignItems='center'
        spacing={1}
        sx={{ paddingTop: '80px', paddingLeft: '20px', paddingRight: '20px' }}
      >
        <Grid item>
          <Button
            color='inherit'
            className={classes.returnButton}
            onClick={() => {
              history.push(`/consumerHome`);
            }}
          >
            Back to quizzes
          </Button>
        </Grid>
        <Grid item alignSelf='center'>
          <Card sx={{ borderRadius: '18px' }}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component='img'
                image={image}
                alt={name}
                className={classes.cardMedia}
              />
              <Box className={classes.infoWrapper}>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant='h4' className={classes.title}>
                    {name}
                  </Typography>
                  <Typography variant='subtitle1'>{description}</Typography>
                </CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingBottom: '20px',
                  }}
                >
                  <ListItem>
                    <ListItemIcon>
                      <AccessAlarmRoundedIcon sx={{ color: '#004080' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Grid container>
                          <Grid item>
                            <Typography className={classes.emphasized}>
                              {time_min}
                              {time_sec === 0 || time_sec == null
                                ? ''
                                : (time_sec / 60)
                                    .toFixed(1)
                                    .toString()
                                    .substring(1)}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.normal}>
                              &nbsp;minutes
                            </Typography>
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
                            <Typography className={classes.emphasized}>
                              {num_questions}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.normal}>
                              &nbsp;questions
                            </Typography>
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
                        reward == 'both' ? (
                          <Grid container>
                            <Grid item>
                              <Typography className={classes.emphasized}>
                                Badge
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography className={classes.normal}>
                                &nbsp;/&nbsp;
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography className={classes.emphasized}>
                                Certificate
                              </Typography>
                            </Grid>
                          </Grid>
                        ) : reward == 'none' ? (
                          <Tooltip
                            placement='bottom'
                            title='Your score will still be recorded.'
                          >
                            <Typography className={classes.normal}>
                              No reward
                            </Typography>
                          </Tooltip>
                        ) : (
                          <Typography className={classes.emphasized}>
                            {reward}
                          </Typography>
                        )
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
                            <Typography className={classes.emphasized}>
                              {trials}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography className={classes.normal}>
                              &nbsp;trials
                            </Typography>
                          </Grid>
                        </Grid>
                      }
                    />
                  </ListItem>
                </Box>
                {leaderboardVisible ? (
                  <Button
                    href={`/leaderboard/${quizId}`}
                    sx={{ marginLeft: '10px' }}
                  >
                    See Leaderboard
                  </Button>
                ) : null}
                {num_questions >= 10 ? (
                  <Button
                    variant='contained'
                    onClick={() => clickStartBtn()}
                    className={classes.startButton}
                    color='primary'
                  >
                    Start the Quiz
                  </Button>
                ) : (
                  <Tooltip
                    placement='top'
                    title='The quiz is currently unavailable!'
                  >
                    <span>
                      <Button
                        disabled
                        variant='contained'
                        onClick={() => clickStartBtn()}
                        className={classes.startButton}
                        color='primary'
                      >
                        Start the Quiz
                      </Button>
                    </span>
                  </Tooltip>
                )}
              </Box>
            </Card>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ConsumerQuizPreview;
