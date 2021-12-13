import axios from 'axios';
import { useState, useEffect ,useContext} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { UserContext} from '../../App';
import useApiCall from '../../hooks/useApiCall';
import { Grid, CircularProgress, Tooltip, Button, Box, Paper, Typography, Modal } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    emphasized: {
      fontFamily: 'Nunito',
      color: '#374A59',
      fontSize: '70px',
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
      fontSize: '50px',
      lineHeight: '1',
      textAlign: 'center',
    }, 
    result: {
      fontFamily: 'Nunito',
      fontSize: '40px',
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
    },
    loading: {
        display: 'flex',
        position: 'absolute',
        left: '50%',
        top: '50%',
    },
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

    console.log(loading);
    console.log('quizResult', quizResult);
    
    const [open, setOpen] = useState(false);
    const { user, dispatch } = useContext(UserContext);

    const [leaderboardVisible, setLeaderboardVisible] = useState('');
    const [quizName, setQuizName] = useState('');
    const [ques, setQues] = useState(0);
    const [trialLimit, setTrialLimit] = useState(0);
    const [reward, setReward] = useState('');

    const [file_download, setFile] = useState('');
    const [img, setImage] = useState('');

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
            // console.log('leaderobard visible', leaderboardVisible);
            setQuizName(response.data.quiz.quizName);
            setReward(response.data.quiz.quizRewardType);
            let questionLength =
                Number(response.data.quiz.quizTotalNumberOfQuestions) > 0
                    ? Number(response.data.quiz.quizTotalNumberOfQuestions)
                    : response.data.quiz.quizQuestions.length;
            setQues(questionLength);
        } catch (e) {
            console.error(e);
        }
    };

    const apicall = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token token=b3a628c312c7f9143f432dfec31ae02d',
        },
      };
    
      function findCredential(credential){
        if(credential.name==quizName){
          return true
        }
        else{
          return false
        }
      }
    
      const checkCredential = async () => {
        // check if credential exists and set the file and badge img
        const apicall = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token token=b3a628c312c7f9143f432dfec31ae02d',
          },
        };
      
        console.log("inside check credential")
        console.log(apicall)
        try {
          await axios
            .get(
              `https://api.accredible.com/v1/all_credentials?recipient_id=${user.id}`, 
              apicall
            )
            .then((response) => {
              console.log(response);
              const allcredential=response.data.credentials.filter(findCredential)
              console.log(allcredential)
              if(allcredential.length!=0){
               // get the credential using the credential id
                const getReward = async () =>{
                  console.log(allcredential[0].id)
                await axios
               .get(
                 `https://api.accredible.com/v1/credentials/${allcredential[0].id}`,
                 apicall
               )
               .then((response) => {
                 console.log(response);
                  setImage(response.data.credential.badge.image.preview);
                  setFile(response.data.credential.url);
               });
                }
                getReward()
              }
            });
        } catch (e) {
          console.error(e);
        }  
      }    

    let res = 0;
    {quizResult ? res = ((quizResult[0].correctedAnswerNum / ques) * 100) : res = 0}
    // const result = res.toFixed(0) + '';
    let result = '';
    {quizResult ? result = res.toFixed(0) + '' : res = ''}

    const goToLeaderboard = () => {
        history.push(`/leaderboard/${quizId}`);
    }

    const retakeQuiz = () => {
        history.push(`/consumerquizpreview/${quizId}`);
    }

    const myQuizzes = () => {
        history.push(`/consumer-page`);
    }

    const moreQuizzes = () => {
        history.push(`/consumerhome`);
    }

    useEffect(() => {
        getQuizInfo();
       
    }, []);

    useEffect(() => {
        checkCredential()
    }, [quizName]);

    if (!quizResult) {
        return(
            <div>
                <CircularProgress color='inherit' className={classes.loading} />
            </div>
        );
    }
    if (loading) {
        return(
            <div>
                <CircularProgress color='inherit' className={classes.loading} />
            </div>
        );
    }
    if (error) {
        return <div>error...</div>;
    }

    console.log(img)
    console.log(file_download)
    return (
        <div>
            {quizResult ? 
                <div>
                <Grid container justifyContent='center' onClick={myQuizzes} sx={{ paddingTop: '65px'}}>
                    <Grid item>
                        <Button color='inherit'>Back to my quizzes</Button>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', paddingTop: '5px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px', justifyContent: 'center' }}>
                  <Paper sx={{ borderRadius: '18px', display: 'flex' }}>
                      <Grid container direction='row'>
                        <Grid item container direction='column' alignItems='center' justifyContent='center' sx={{ marginTop: 1, marginBottom: 1, marginRight: 4, marginLeft: 4 }}>
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
                        <Grid item container direction='row' alignItems='center' justifyContent='center' spacing={2} sx={{ margin: 1 }}>
                          { reward == 'certificate' ? 
                            <Grid item>
                              <div style={{ textAlign: 'center'}}>
                                <a href={file_download} download>
                                  {' '}Click to download certificate{' '}
                                </a>
                              </div>
                            </Grid>
                          : reward == 'badge' ? 
                            <img src={img} width='200' height='200'></img>
                            : <div>
                              <Grid item>
                                <div style={{ textAlign: 'center'}}>
                                  <a href={file_download} download>{' '}Download certificate{' '}</a>
                                </div>
                              </Grid>
                              <Grid item>
                                <img src={img} width='200' height='200' class='center'></img>
                              </Grid>
                            </div> 
                        }
                        </Grid>
                        <Grid item container direction='row' alignItems='center' justifyContent='center' spacing={2} sx={{ margin: 2}}>
                          <Grid item>
                              {leaderboardVisible ? 
                                  <Button onClick={goToLeaderboard} variant='contained' className={classes.button}>Leaderboard</Button>
                                  :
                                  <Button disabled variant='contained' className={classes.button}>Leaderboard</Button>
                              }
                          </Grid>
                          <Grid item>
                              {trialLimit - quizResult[0].usedTrialNumber == 0 ?
                                  <Button variant='contained' color='success' className={classes.button} onClick={moreQuizzes}>More quizzes</Button>
                                  :
                                  <Button variant='contained' color='success' onClick={retakeQuiz} className={classes.button}>Try again</Button>
                              }
                          </Grid>
                        </Grid>
                      </Grid>
                  </Paper>
                </Box>
              </div> : null }
            {/* {quizResult ? JSON.stringify(quizResult[0]) : null} */}
        </div>
    );
}

export default QuizResultRecord;