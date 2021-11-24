// TODO: add ui for consumer quiz preview card
import axios from 'axios';
// import { Button, Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import useApiCall from '../../../hooks/useApiCall';
import { Paper, InputBase, Typography, Button, List, ListItem, ListItemIcon, ListItemText, Grid, Card, CardMedia, CardContent, CardActionArea, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

const useStyles = makeStyles({
  returnButton: {
    marginLeft: '120px',
    marginTop: '20px',
  },
  cardWrapper: {
    marginLeft: '100px',
    marginRight: '100px',
    marginBottom: '40px',
  },
  card: {
    borderRadius: '38px',
    minHeight: '500px',
    maxWidth: '1200px',
  },
  cardMedia: {
    margin: "20px",
    maxWidth: "40%",
    // minWidth: "50%",
    borderRadius: "19px",
  },
  title: {
    fontSize: '40px',
    fontWeight: 'bold',
    marginLeft: '20px',
  },
  subtitle: {
    marginLeft: '20px',
  },
});

function ConsumerQuizPreview() {
  const { id } = useParams(); //
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

  // if (!payload) {
  //   return <div>No Data</div>;
  // }
  // if (loading) {
  //   return <div>loading...</div>;
  // }
  // if (error) {
  //   return <div>error...</div>;
  // }
  const fetchData = async () => {
    try {
      await axios
        .get(
          process.env.NODE_ENV == 'production'
            ? `/api/quiz/detail/${id}`
            : `http://localhost:4000/api/quiz/detail/${id}`
        )
        .then((response) => {
          setName(response.data.quiz.quizName);
          setImage(response.data.quiz.quizImage);
          setDescription(response.data.quiz.quizDescription);
          setTrials(response.data.quiz.quizNumberOfTrials);
          setTimeMin(response.data.quiz.quizTimeLimit.minutes);
          setTimeSec(response.data.quiz.quizTimeLimit.seconds);
          setReward(response.data.quiz.quizRewardType);
          setNumQuestions(response.data.quiz.quizQuestions.length);
        });
    } catch (e) {
      console.error(e);
    }
  };

  // clickBtnHandler();
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Button 
            color="inherit"
            className={classes.returnButton}
            onClick={() => {
              history.push(`/consumerHome`);
            }}
          >
            Back to quizzes
          </Button>
        </Grid>
        <Grid item className={classes.cardWrapper}>
          <Card className={classes.card} xs={12} md={8}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {/* TODO: adjust the the layout of the picture */}
                <CardMedia
                  component="img"
                  image={image}
                  alt={name}
                  className={classes.cardMedia}
                />
                <CardContent>
                  <Typography variant="h5" className={classes.title}>{name}</Typography>
                  <Typography variant="subtitle1" className={classes.subtitle}>{description}</Typography>
                  {/* TODO: add platform name and platform avatar */}
                  <List sx={{ marginTop: '30px', marginLeft: '20px' }}>
                    <ListItem>
                      <ListItemIcon>
                        <AccessAlarmRoundedIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography>{time_min}:{time_sec} minutes</Typography>
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
                    <ListItem>
                      <ListItemIcon>
                        <MilitaryTechRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          reward ? <Typography>{reward}</Typography> : <Typography>No reward</Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HistoryRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography>{trials} trials</Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <Button 
                    variant="contained"
                    onClick={()=>{
                      history.push(`/consumerquizpage/${id}`);
                    }}
                    sx={{ marginLeft: '30px', marginTop: '10px'}}
                  >
                    Start
                  </Button>
                </CardContent>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ConsumerQuizPreview;
