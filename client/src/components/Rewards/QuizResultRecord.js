import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useApiCall from '../../hooks/useApiCall';
import { Grid, Link, Tooltip, Button, Box, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    emphasized: {
      fontFamily: 'Nunito',
      color: '#374A59',
      fontSize: '90px',
      lineHeight: '1',
    },
    secondary: {
      fontFamily: 'Nunito',
    //   color: '#8992A2',
      fontSize: '30px',
      lineHeight: '1',
    },
    third: {
      fontFamily: 'Nunito',
      color: '#8992A2',
      fontSize: '25px',
      lineHeight: '1',
    },
    feedback: {
      fontFamily: 'Nunito',
      fontSize: '60px',
      lineHeight: '1',
      textAlign: 'center',
    }, 
    result: {
      fontFamily: 'Nunito',
      fontSize: '80px',
      lineHeight: '1',
      // color: '#374A59',
    },
    upper: {
      fontFamily: 'Nunito',
      color: '#374A59',
      fontSize: '30px',
      lineHeight: '1',
    },
    button: {
      minWidth: '150px',
      minHeight: '60px',
      borderRadius: '18px',
    }
});

function QuizResultRecord(){
    const { id } = useParams();
    const classes = useStyles();
    const history = useHistory();
    const quizId = id;
    console.log('quizId',quizId);
    const [loading, quizResult, error] = useApiCall(
        process.env.NODE_ENV === 'production'
        ? `/api/consumer/quizHistory/${quizId}`
        : `http://localhost:4000/api/consumer/quizHistory/${quizId}`,
        { withCredentials: true }
    );
    console.log('quizResult', quizResult);

    const [leaderboardVisible, setLeaderboardVisible] = useState('');
    const [quizName, setQuizName] = useState('');
    const [ques, setQues] = useState(0);
    const [trialLimit, setTrialLimit] = useState(0);

    const getQuizInfo = async () => {
        try {
            const response = await axios.get(
            process.env.NODE_ENV == 'production'
                ? `/api/quiz/detail/${quizId}`
                : `http://localhost:4000/api/quiz/detail/${quizId}`
            );
            const userInfo = await axios.get(
            process.env.NODE_ENV === 'production'
                ? `/api/auth`
                : `http://localhost:4000/api/auth`,
            { withCredentials: true }
            );
            setTrialLimit(response.data.quiz.quizNumberOfTrials);
            setLeaderboardVisible(response.data.quiz.quizEnableLeaderboard);
            console.log('leaderobard visible', leaderboardVisible);
            setQuizName(response.data.quiz.quizName);
            let questionLength =
                Number(response.data.quiz.quizTotalNumberOfQuestions) > 0
                    ? Number(response.data.quiz.quizTotalNumberOfQuestions)
                    : response.data.quiz.quizQuestions.length;
            setQues(questionLength);
        } catch (e) {
            console.error(e);
        }
    };

    let res = (quizResult[0].correctedAnswerNum / ques) * 100;
    console.log('res', res);
    const result = res.toFixed(0) + '';
    console.log('', result);

    const goToLeaderboard = () => {
        history.push(`/leaderboard/${quizId}`);
    }

    const retakeQuiz = () => {
        history.push(`/consumerquizpreview/${quizId}`);
    }

    useEffect(() => {
        getQuizInfo();
    }, []);

    return (
        <div>
            <Box sx={{ display: 'flex', paddingTop: '100px', paddingLeft: '20px', paddingRight: '20px', justifyContent: 'center' }}>
                <Paper sx={{ borderRadius: '18px', display: 'flex' }}>
                    <Grid container direction='row'>
                        <Grid item container direction='column' alignItems='center' sx={{ margin: 5 }}>
                            <Grid item sx={{ paddingTop: '10px' }}>
                                <Typography color='primary' className={classes.feedback}>{quizName}</Typography>
                            </Grid>
                            <Grid item sx={{ paddingTop: '10px' }}>
                                <Typography className={classes.third}>Your top score:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.emphasized}>{result}%</Typography>
                            </Grid>
                            <Grid item>
                                <Typography className={classes.secondary}>{quizResult[0].correctedAnswerNum}/{ques} in {quizResult[0].quizTimeTaken.minutes}:{quizResult[0].quizTimeTaken.seconds} min</Typography>
                            </Grid>
                            <Grid item sx={{ paddingTop: '10px' }}>
                                <Typography className={classes.third}>on {quizResult[0].accomplishedDate.slice(0, 10)}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction='row' alignItems='center' justifyContent='center' spacing={2} sx={{ margin: 3 }}>
                        <Grid item>
                            
                        </Grid>
                        <Grid item>
                            {leaderboardVisible ? 
                                <Button onClick={goToLeaderboard} variant='contained' className={classes.button}>Leaderboard</Button>
                                :
                                <Button disabled variant='contained' className={classes.button}>Leaderboard</Button>
                            }
                        </Grid>
                        <Grid item>
                            {trialLimit - quizResult[0].usedTrialNumber == 0 ?
                                <Button variant='contained' color='success' className={classes.button}>Quiz History</Button>
                                :
                                <Button variant='contained' color='success' onClick={retakeQuiz} className={classes.button}>Try again</Button>
                            }
                        </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            {quizResult ? JSON.stringify(quizResult[0]) : <div>notfound</div>}
            {/* leaderboard link */}
            {leaderboardVisible ? (
                <Link href={`/leaderboard/${quizId}`}>See Leaderboard</Link>
            ) : null}
        </div>
    );
}

export default QuizResultRecord;