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
  CardActionArea,
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
    maxWidth: '50%',
    // minHeight: '400px',
    display: { xs: 'none', sm: 'block' },
  },
  infoWrapper: {
    diplay: 'flex',
    flexDirection: 'column',
    padding: '20px',
  },
  title: {
    fontWeight: 'bold',
  },
  startButton: {
    padding: '10px',
    minWidth: '300px',
    borderRadius: '10px',
    marginLeft: '10px',
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
      await axios
        .get(
          process.env.NODE_ENV == 'production'
            ? `/api/quiz/detail/${id}`
            : `http://localhost:4000/api/quiz/detail/${id}`
        )

        .then((response) => {
          const trialNum =
            user?.consumerQuizHistoryList?.find((e) => {
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
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  return (
    <div>
      <Grid container direction='column' spacing={1} alignItems='center'>
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
        <Grid item xs={12} m={10}>
          <Card sx={{ borderRadius: '18px' }}>
            {/* TODO: adjust the the layout of the picture */}
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
                  {/* TODO: add platform name and platform avatar */}
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <AccessAlarmRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography>
                            {time_min}:{time_sec} minutes
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AssignmentRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography>{num_questions} questions</Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <MilitaryTechRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          reward ? (
                            <Typography>{reward}</Typography>
                          ) : (
                            <Typography>No reward</Typography>
                          )
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HistoryRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={<Typography>{trials} trials</Typography>}
                      />
                    </ListItem>
                  </List>
                </Box>
                {leaderboardVisible ? (
                  <Button
                    href={`/leaderboard/${quizId}`}
                    sx={{ marginLeft: '10px' }}
                  >
                    See Leaderboard
                  </Button>
                ) : null}
                <Button
                  variant='contained'
                  onClick={() => clickStartBtn()}
                  className={classes.startButton}
                  color='primary'
                >
                  Start the Quiz
                </Button>
              </Box>
            </Card>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ConsumerQuizPreview;
