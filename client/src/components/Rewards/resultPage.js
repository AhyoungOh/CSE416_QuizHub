import axios from 'axios';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext, accountSettingsContext } from '../../App';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import useApiCall from '../../hooks/useApiCall';
import { Grid, Button, Tooltip, Box, Modal, Paper, Typography } from '@mui/material';
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
    color: '#8992A2',
    fontSize: '30px',
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

function ResultsPage() {
  const classes = useStyles();
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const quizId = id;
  const [loading, quizResult, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/consumer/quizHistory/${quizId}`
      : `http://localhost:4000/api/consumer/quizHistory/${quizId}`,
    { withCredentials: true }
  );
  console.log('all quizResult', quizResult);

  const [credExists,setCredExists] = useState(false)

  const currentQuizResult = location.state?.quizzes;
  console.log('current his : ', currentQuizResult);
  // console.log('consumer quiz history', payload);
  // const [result, setResult] = useState(''); // need to change this based on takes quiz
  const [leaderboardVisible, setLeaderboardVisible] = useState('');

  const [open, setOpen] = useState(false);

  const certificate_qualifier = useRef(0);
  const badge_qualifier = useRef(0);

  const [correct, setCorrect] = useState(0);
  const [ques, setQues] = useState(0);
  //const quizName=useRef("")
  const [quizName, setQuizName] = useState('');
  const [trialLimit, setTrialLimit] = useState(0);
  const [reward, setReward] = useState('');
  const certificate_id = useRef('');

  const { user, dispatch } = useContext(UserContext);
  const email = useRef('');
  const credential_id = useRef('');
  //const file_download=useRef("")
  const [file_download, setFile] = useState('');
  const [img, setImage] = useState('');

  const image = useRef('');

  // if (!quizResult) {
  //   return <div>No Data</div>;
  // }
  // if (loading) {
  //   return <div>loading...</div>;
  // }
  // if (error) {
  //   return <div>error...</div>;
  // }

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
      // console.log('response.data.quiz', response.data.quiz);
      setTrialLimit(response.data.quiz.quizNumberOfTrials);
      setReward(response.data.quiz.quizRewardType);
      setLeaderboardVisible(response.data.quiz.quizEnableLeaderboard);
      // console.log('leaderobard visible', leaderboardVisible);
      setQuizName(response.data.quiz.quizName);
      badge_qualifier.current = response.data.quiz.quizBadgeQualification;
      certificate_id.current = response.data.quiz.quizCertificate;
      // console.log('quizResult : ', quizResult[0]);

      setCorrect(currentQuizResult.correctedAnswerNum);
      // setCorrect(Number(quizResult[0].correctedAnswerNum));
      let questionLength =
        Number(response.data.quiz.quizTotalNumberOfQuestions) > 0
          ? Number(response.data.quiz.quizTotalNumberOfQuestions)
          : response.data.quiz.quizQuestions.length;
      setQues(questionLength);
    } catch (e) {
      console.error(e);
    }
  };
  console.log('ques length', ques);
  console.log('correct number : ', correct);
  let res = (correct / ques) * 100;
  console.log('res', res);
  const result = res.toFixed(0) + '';
  console.log('', result);

  const apicall = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=38040def040af70134a08e39a3db35d3',
    },
  };

  function findCredential(credential){
    if(credential.name==quizName ){
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
        Authorization: 'Token token=38040def040af70134a08e39a3db35d3',
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
            setCredExists(true)
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
              image.current = response.data.credential.badge.image.preview;
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


  const createCredential = async () => {
    if (
      Number(result) >= certificate_qualifier.current ||
      Number(result) >= badge_qualifier.current
    ) {
      console.log('inside create credential');
      const apidata = {
        credential: {
          recipient: {
            name: user.username,
            email: user.email,
            id: user.id,
          },
          group_name: quizName, //quizName.current
        },
      };
      try {
        // console.log(apidata);
        await axios
          .post(`https://api.accredible.com/v1/credentials`, apidata, apicall)
          .then((response) => {
            console.log(response);
            credential_id.current = response.data.credential.id;
            setImage(response.data.credential.badge.image.preview);
            console.log(response.data.credential.badge.image.preview);
            image.current = response.data.credential.badge.image.preview;
            console.log(img);
            console.log(img.current);
          });
        //pdfCredential()
        if (Number(result) >= badge_qualifier.current) {
          //createBadge()
          await axios
            .post(
              process.env.NODE_ENV == 'production'
                ? `/api/badge`
                : `http://localhost:4000/api/badge`,
              {
                badgeUploadFile: image.current,
                consumerId: user.id,
                badgeVisibility: true,
              }
            )
            .then((response) => {
              console.log(response);
            });
        }
        await axios
          .post(
            `https://api.accredible.com/v1/credentials/generate_single_pdf/${credential_id.current}`,
            {},
            apicall
          )
          .then((response) => {
            console.log(response);
            console.log(response.data.file);
            //file_download.current=response.data.file
            setFile(response.data.file);
          });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const goToLeaderboard = () => {
    history.push(`/leaderboard/${quizId}`);
  }

  const retakeQuiz = () => {
    history.push(`/consumerquizpreview/${quizId}`);
  }

  const quizHistory = () => {
    history.push(`/record/${quizId}`);
  }

  useEffect(() => {
    getQuizInfo();
  }, []);

  // useEffect(() => {
  //   console.log('ques length', ques);
  //   console.log('correct number : ', correct);
  //   let res = (correct / ques) * 100;
  //   console.log('res', res);
  //   setResult(res.toFixed(2) + '');
  //   console.log('', result);
  // });

  useEffect(() => {
    checkCredential()
      console.log(reward)
      console.log((reward=="badge"&& img==""))
      console.log((reward=="certificate"&& file_download==""))
      console.log((reward=="both"&& file_download=="" && img==""))
    if(result>=0 && result<=100 && !credExists){ //!((reward=="badge"&& img=="")|| (reward=="certificate"&& file_download=="")|| (reward=="both"&& file_download=="" && img==""))
      createCredential();
    }
  }, [result]);


  console.log('result', result);
  return (
    <div>
      <Box sx={{ display: 'flex', paddingTop: '100px', paddingLeft: '20px', paddingRight: '20px', paddingBottom: '20px', justifyContent: 'center' }}>
        <Paper sx={{ borderRadius: '18px', display: 'flex' }}>
          <Grid container direction='row'>
            <Grid item container direction='column' alignItems='center' sx={{ margin: 5 }}>
              <Grid item justifySelf='center'>
                {
                  reward == 'none' ?
                  <Typography color='primary' className={classes.feedback}>Good job!</Typography>
                  : Number(result) >= certificate_qualifier.current || Number(result) >= badge_qualifier.current
                    ? <Typography color='primary' className={classes.result}>Congrats!</Typography>
                    : <Typography color='inherit' className={classes.result}>Sorry</Typography>
                }
              </Grid>
              <Grid item sx={{ paddingTop: '10px' }}>
                <Typography className={classes.secondary}>Your score:</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.emphasized}>{result}%</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.secondary}>{correct}/{ques} in {currentQuizResult.quizTimeTaken.minutes}:{currentQuizResult.quizTimeTaken.seconds} min</Typography>
              </Grid>
            </Grid>
            <Grid item container direction='row' alignItems='center' justifyContent='center' spacing={2} sx={{ margin: 3 }}>
              <Grid item>
                {reward == 'none' ?
                  <Tooltip placement='top' title='This quiz does not have rewards'>
                    <span>
                      <Button color='error' variant='contained' disabled className={classes.button} onClick={() => setOpen(true)}>Rewards</Button>
                    </span>
                  </Tooltip>
                : reward == 'certificate' && Number(result) < certificate_qualifier.current ?
                   <Tooltip placement='top' title='Your score does not meet the requirement.'>
                      <span>
                        <Button color='error' variant='contained' disabled className={classes.button} onClick={() => setOpen(true)}>Rewards</Button>
                      </span>
                    </Tooltip>
                    : reward == 'badge' && Number(result) < badge_qualifier.current ?
                      <Tooltip placement='top' title='Your score does not meet the requirement.'>
                        <span>
                          <Button color='error' variant='contained' disabled className={classes.button} onClick={() => setOpen(true)}>Rewards</Button>
                        </span>
                      </Tooltip>
                      : 
                      <Button color='error' variant='contained' className={classes.button} onClick={() => setOpen(true)}>Rewards</Button>
                }
              </Grid>
              <Grid item>
                {leaderboardVisible ? 
                  <Button onClick={goToLeaderboard} variant='contained' className={classes.button}>Leaderboard</Button>
                  :
                  <Button disabled variant='contained' className={classes.button}>Leaderboard</Button>
                }
              </Grid>
              <Grid item>
                {trialLimit - currentQuizResult.usedTrialNumber == 0 ?
                  <Button variant='contained' color='success' onClick={quizHistory} className={classes.button}>Quiz History</Button>
                  :
                  <Button variant='contained' color='success' onClick={retakeQuiz} className={classes.button}>Try again</Button>
                }
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ backgroundColor: '#ffffff', display: 'flex', position: 'fixed', top: '50%', left: '50%', minWidth: '300px', marginTop: '-150px', marginLeft: '-150px', borderRadius: '10px', boxShadow: 24,}}>
          <Grid container direction='column'  alignItems='center' justifyContent='center' sx={{ padding: '20px' }}>
            <Grid item>
              <Typography variant='h5'>Rewards</Typography>
            </Grid>
            { reward == 'certificate' ? 
                <Grid item>
                  <a href={file_download} download>
                    {' '}
                    Click to download certificate{' '}
                  </a>
                </Grid>
              : reward == 'badge' ? 
                <img src={img} width='200' height='200'></img>
                : <div>
                    <Grid item>
                      <a href={file_download} download>{' '}Download certificate{' '}</a>
                    </Grid>
                    <Grid item>
                      <img src={img} width='200' height='200' class='center'></img>
                    </Grid>
              </div> 
            }
          </Grid>
        </Box>
      </Modal>

      {/* {console.log('trialLimit - currentQuizResult.usedTrialNumber', trialLimit - currentQuizResult.usedTrialNumber)} */}
      {console.log('file_download', file_download)}
    </div>
  );
}

export default ResultsPage;
