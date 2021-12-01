import { useContext, useEffect } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import axios from 'axios';
import useApiCall from '../../hooks/useApiCall';
import { Grid, Paper, Button, Typography, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  rowText: {
    paddingTop: '20px',
    paddingBottom: '20px',
    minWidth: '150px',
    maxWidth: '200px',
    textAlign: 'center',
  },
  paper: {
    borderRadius: '10px',
    maxWidth: '1000px',
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
  // console.log(quizid);
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
    // console.log(data.data.consumerQuizHistoryList[data.quizIndex]);
    const row = {};
    row['username'] = data.data.consumerUsername;
    row['correct'] = data.data.consumerQuizHistoryList[data.quizIndex].correctedAnswerNum;
    row['min'] = data.data.consumerQuizHistoryList[data.quizIndex].quizTimeTaken.minutes;
    row['sec'] = data.data.consumerQuizHistoryList[data.quizIndex].quizTimeTaken.seconds;
    row['img'] = data.data.consumerImage;
    row['isPrivate'] = data.data.consumerIsPrivate;
    // console.log(row);
    players.push(row);
  }
  console.log(players);

  players.sort(function(a, b){
    if (a.correct - b.correct !== 0) {
      return - (a.correct - b.correct);
    } else {
      if (a.min - b.min !== 0) {
        return a.min - b.min;
      } else {
        if (a.sec - b.sec !== 0) {
          console.log("here");
          return a.sec - b.sec;
        } else {
          return compare(a.username, b.username);
        }
      }
    }
  });

  console.log(players);

  const rows = players.map((rowData, index) => {
    // console.log(rowData);
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
                <Grid container alignItems='center' sx={{ minWidth: '150px', maxWidth: '200px' }}>
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
                    <Typography sx={{ paddingLeft: '10px', paddingTop: '20px', paddingBottom: '20px'}}>
                      {rowData.username}
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
  });


  // leaderboard is returning all the consumers that have taken the quiz before
  // return <div className='Leaderboard'>{JSON.stringify(leaderboard, null, 2)}</div>;
  return(
    <div>
      <Grid container direction='column' spacing={2} sx={{ padding:'20px' }}>
        <Grid item container direction='column' alignContent='center' spacing={1}>
          <Grid item alignSelf='center'>
            <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
              Quiz Name
            </Typography>
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
          {rows}
        </Grid>
      </Grid>
    </div>
  )
}

export default Leaderboard;