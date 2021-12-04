import { useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';
import useApiCall from '../../hooks/useApiCall';
import { Grid, Paper, Snackbar, Link, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  rowText: {
    paddingTop: '20px',
    paddingBottom: '20px',
    minWidth: '200px',
    maxWidth: '200px',
    textAlign: 'center',
  },
  titleText: {
    paddingTop: '20px',
    paddingBottom: '20px',
    textAlign: 'center',
  },
  paper: {
    borderRadius: '10px',
    maxWidth: '1000px',
  },
  titlePaper: {
    borderRadius: '10px',
    minWidth: '1000px',
  },
});

function compare(a, b){
  if(a < b) return -1; 
  if(a > b) return 1;
  return 0;
}

function Leaderboard() {
  const { quizId } = useParams();
  const classes = useStyles();
  const history = useHistory();
  // console.log(quizid);
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useContext(UserContext);
  console.log(user);

  const [loading, leaderboard, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/quiz/leaderboard/${quizId}`
      : `http://localhost:4000/api/quiz/leaderboard/${quizId}`,
    { withCredentials: true }
  );
  if (!leaderboard) {
    return <div>No Data</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }
  // console.log(leaderboard);

  const players = [];
  for (const data of leaderboard) {
    const row = {};
    row['id'] = data.data._id;
    row['username'] = data.data.consumerUsername;
    row['correct'] = data.data.consumerQuizHistoryList[data.quizIndex].correctedAnswerNum;
    row['min'] = data.data.consumerQuizHistoryList[data.quizIndex].quizTimeTaken.minutes;
    row['sec'] = data.data.consumerQuizHistoryList[data.quizIndex].quizTimeTaken.seconds;
    row['img'] = data.data.consumerImage;
    row['isPrivate'] = data.data.consumerIsPrivate;
    players.push(row);
  }
  console.log(leaderboard);
  let quizName = '';
  if (leaderboard.length) {
    quizName = leaderboard[0].quizName;
  }
  // console.log(quizName);

  players.sort(function(a, b){
    if (a.correct - b.correct !== 0) {
      return - (a.correct - b.correct);
    } else {
      if (a.min - b.min !== 0) {
        return a.min - b.min;
      } else {
        if (a.sec - b.sec !== 0) {
          return a.sec - b.sec;
        } else {
          return compare(a.username, b.username);
        }
      }
    }
  });

  // console.log(players);

  const goToQuiz = () => {
    if (user.isCreator) {
      history.push(`/quiz/detail/${quizId}`);
    } else {
      history.push(`/consumerquizpreview/${quizId}`);
    }
  }

  const rows = players.map((rowData, index) => {
    if (rowData.length !== 0) {
      return(
        <Grid item lg={8}>
          <Paper elevation={0} className={classes.paper}>
            <Grid container justifyContent='space-evenly'>
              <Grid item>
                <Typography className={classes.rowText}>
                  {index+1}
                </Typography>
              </Grid>
              <Grid item alignSelf='center'>
                <Grid container alignItems='center' sx={{ minWidth: '200px', maxWidth: '200px' }}>
                  <Grid item sx={{ paddingLeft: '20px' }}>
                    <Avatar 
                      src={rowData.img}
                      alt={rowData.username}
                      style={{
                        width: '40px',
                        height: '40px',
                      }} 
                      // sx={{ bgcolor: '#007fff' }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography 
                      sx={{ paddingLeft: '10px', paddingTop: '20px', paddingBottom: '20px'}}
                    >
                      <Link 
                        underline="hover"
                        onClick={()=> {
                          if (rowData.isPrivate) {
                            setOpen(true);
                            return ;
                          } else {
                            history.push(`/playerprofile/${rowData.id}`);
                          }
                        }}
                      >
                        {rowData.username}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Typography className={classes.rowText}>
                  {rowData.correct}
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.rowText}>
                  {rowData.min}:{rowData.sec}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      );
    } else {
      return(
        <Typography>No entries yet!</Typography>
      );
    }
  });

  // leaderboard is returning all the consumers that have taken the quiz before
  // return <div className='Leaderboard'>{JSON.stringify(leaderboard, null, 2)}</div>;
  return(
    <div>
      <Grid container direction='column' spacing={2} sx={{ padding:'20px' }}>
        <Grid item container direction='column' alignContent='center' spacing={1}>
          <Grid item alignSelf='center' justifyContent='center'>
            <Paper elevation={0} className={classes.titlePaper} sx={{ backgroundColor: '#E6F2FF' }}>
              <Typography variant='h5' className={classes.titleText} sx={{ fontWeight: 'bold' }}>
                {/* Quiz Name */}
                <Link 
                  underline="hover"
                  onClick={goToQuiz}
                >
                  {/* TODO: pass quiz name */}
                  {quizName ? quizName : 'Empty'} Leaderboard
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={0} className={classes.paper} sx={{ backgroundColor: '#E6F2FF' }}>
              <Grid container justifyContent='space-evenly'>
                <Grid item>
                  <Typography justifySelf='center' className={classes.rowText}>
                    Ranking
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.rowText}>
                    Username
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.rowText}>
                    Score
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography className={classes.rowText}>
                    Time
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {rows.length !== 0 ? 
            rows 
            : 
            <Grid item alignSelf='center'>
              <Typography sx={{ paddingTop: '20px' }}>
                No entries yet!
              </Typography>
            </Grid>
          }
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={()=>{setOpen(false)}}
        message="Private user!"
      />
    </div>
  )
}

export default Leaderboard;