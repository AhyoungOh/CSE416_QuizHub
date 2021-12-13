// TODO: make it responsive
import axios from 'axios';
import PropTypes from 'prop-types';
import { useRef, useEffect, useContext, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import useApiCall from '../../../hooks/useApiCall';
import { UserContext } from '../../../App';
import {
  Grid,
  Button,
  Modal,
  Box,
  Typography,
  Card,
  IconButton,
  Alert,
  Collapse,
  CircularProgress,
  Fab,
} from '@mui/material';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { makeStyles, styled } from '@mui/styles';

// modal style
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const useStyles = makeStyles({
  container: {
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '70px',
    paddingRight: '70px',
  },
  question: {
    fontFamily: 'Nunito',
    fontSize: '25px',
  },
  options: {
    fontWeight: '600',
  },
  card: {
    borderRadius: '19px',
    minHeight: '300px',
  },
  button: {
    padding: '30px',
    minHeight: '300px',
    minWidth: '100%',
    fontWeight: '600',
    borderRadius: '18px',
  },
  submitButton: {
    borderRadius: '30px',
  },
  alert: {
    width: '50%',
    display: 'flex',
    paddingTop: '80px',
  },
  nextButton: {
    position: 'fixed',
    right: '3%',
    bottom: '5%',
  },
  prevButton: {
    position: 'fixed',
    left: '3%',
    bottom: '5%',
  },
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '8px',
  width: '100%',
  // width: 'calc(100%-200px)',
  borderRadius: '2px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: '2px',
    backgroundColor: '#007fff',
  },
}));

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: 'absolute', display: 'inline-flex' }}>
      <CircularProgress size={70} variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
          sx={{ fontSize: '15px', lineHeight: '1' }}
        >
          {`${props.min}:${props.sec}`}
        </Typography>
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
          sx={{ fontSize: '15px', lineHeight: '1' }}
        >
          left
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  sec: PropTypes.number.isRequired,
};

function ConsumerQuizPage() {
  const { user, dispatch } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();

  const { id } = useParams(); //
  const quizid = id;

  // console.log('quizid' + quizid);

  const [qnum, setQnum] = useState(1);

  const time_min = useRef('');
  const time_sec = useRef('');
  const [timer, setTimer] = useState(0);
  const [quiz_questions, setQuizQuestions] = useState([]);
  const num_questions = quiz_questions.length;
  const question = useRef('');
  // const [question_options, setQuestionOptions] = useState([]);
  const answer = useRef('');
  const quizInfo = useRef({
    quizId: id,
    answerchoices: [],
    quizTimeTaken: { minutes: 0, seconds: 0 },
    accomplishedDate: new Date(),
    usedTrialNumber: 0,
  });

  // for quit confirm modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // for selecting option card
  const [select, setSelect] = useState(4);

  // quiz answering state
  const [end, setEnd] = useState(false);
  const [start, setStart] = useState(true);

  // warning
  const [showAlert, setShowAlert] = useState(false);

  const leftTime = useRef(0);
  const leftTimeTimer = useRef(null);

  const [totalSec, setTotalSec] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const quitQuiz = async () => {
    history.push(`/consumerquizpreview/${id}`);
    const userInfo = await axios.get(
      process.env.NODE_ENV === 'production'
        ? `/api/auth`
        : `http://localhost:4000/api/auth`,
      { withCredentials: true }
    );
    dispatch({ type: 'signin', payload: userInfo.data });
  };
  const runTimer = () => {
    leftTimeTimer.current = setInterval(() => {
      leftTime.current = leftTime.current - 1;
      setTimer(leftTime.current);
      if (leftTime.current === 0) {
        clearInterval(leftTimeTimer.current);
        leftTimeTimer.current = null;
        alert('Time out!');
        quitQuiz();
      }
    }, 1000);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        process.env.NODE_ENV == 'production'
          ? `/api/quiz/detail/${id}`
          : `http://localhost:4000/api/quiz/detail/${id}`
      );
      time_min.current = Number(response.data.quiz.quizTimeLimit.minutes);
      time_sec.current = Number(response.data.quiz.quizTimeLimit.seconds);
      setQuizQuestions(response.data.quiz.quizQuestions);
      const usedTrialNumber =
        user.consumerQuizHistoryList.find((e) => {
          return e.quizId === id;
        })?.usedTrialNumber || 0;

      quizInfo.current = {
        ...quizInfo.current,
      };
      leftTime.current =
        60 * Number(time_min.current) + Number(time_sec.current);
      console.log(leftTime.current);
      setTotalSec(leftTime.current);
      setTimer(Number(leftTime.current));
      runTimer();
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const getQuestions = async (question_id) => {
  //   try {
  //     await axios
  //       .get(
  //         process.env.NODE_ENV == 'production'
  //           ? `/api/question/${question_id}`
  //           : `http://localhost:4000/api/question/${question_id}`
  //       )
  //       .then((response) => {
  //         //console.log(quizid)
  //         question.current = response.data.createQuestion.questionQuestions;
  //         answer.current = response.data.createQuestion.questionAnswer;
  //       });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  const nextQuestionNum = () => {
    const answerList = quizInfo.current.answerchoices;
    // console.log(answerList);
    setStart(false);
    if (qnum !== num_questions) {
      setQnum(qnum + 1);
      // console.log("answerList[qnum]", answerList[qnum]);
      if (0 <= answerList[qnum] && answerList[qnum] <= 3) {
        setSelect(answerList[qnum]);
      } else {
        setSelect(4);
      }
      if (qnum === num_questions - 1) {
        setEnd(true);
      }
    } else {
      if (answerList[qnum]) {
        setSelect(answerList[qnum]);
      }
    }
  };

  const prevQuestionNum = () => {
    const answerList = quizInfo.current.answerchoices;
    if (qnum !== 1) {
      setEnd(false);
      setQnum(qnum - 1);
      if (qnum === 2) {
        setStart(true);
        // setSelect(answerList[1]);
      }
      // console.log("answerList[qnum-2]", answerList[qnum-2]);
      setSelect(answerList[qnum - 2]);
    }
  };

  const selectAnswer = (answer) => {
    const answerList = quizInfo.current.answerchoices;
    if (answerList.length < qnum) {
      // new answer
      quizInfo.current.answerchoices.push(answer);
    } else {
      // change answer
      quizInfo.current.answerchoices[qnum - 1] = answer;
    }
    setSelect(answer);
  };

  const checkSubmit = () => {
    if (quizInfo.current.answerchoices.length !== num_questions) {
      setShowAlert(true);
    } else {
      submitHandler();
    }
  };

  const submitHandler = async () => {
    clearInterval(leftTimeTimer.current);
    const calculateTakenTime = () => {
      const originSeconds =
        60 * Number(time_min.current) + Number(time_sec.current);
      const takenSeconds = originSeconds - leftTime.current;
      const minutes = Number(Math.floor(takenSeconds / 60));
      const seconds = Number(takenSeconds % 60);
      return { minutes, seconds };
    };
    const response = await axios.put(
      `/api/consumer/quiz/${id}`,
      {
        quizzes: {
          ...quizInfo.current,
          quizTimeTaken: calculateTakenTime(),
        },
      },
      { withCredentials: true }
    );

    history.push(`/result/${id}`, {
      quizzes: {
        ...quizInfo.current,
        quizTimeTaken: calculateTakenTime(),
        correctedAnswerNum: response.data.correctedAnswerNum,
        usedTrialNumber: response.data.usedTrialNumber,
      },
    });
  };

  return (
    <div>
      {/* submit alert: when user submit yet haven't completed all the questions */}
      <Grid container justifyContent='center'>
        <Collapse in={showAlert} className={classes.alert}>
          <Alert
            severity='warning'
            action={
              <div>
                <Button color='warning' size='small' onClick={submitHandler}>
                  Submit
                </Button>
                <IconButton
                  color='inherit'
                  size='small'
                  onClick={() => {
                    setShowAlert(false);
                  }}
                  component='span'
                >
                  <CloseRoundedIcon />
                </IconButton>
              </div>
            }
          >
            Still have {num_questions - quizInfo.current.answerchoices.length}{' '}
            questions not finished.
          </Alert>
        </Collapse>
      </Grid>

      {/* Quit confirm modal */}
      <Grid container justifyContent='center'>
        <Modal open={show} onClose={handleClose}>
          <Box sx={style}>
            <Grid container direction='column' spacing={2}>
              <Grid item>
                <Typography id='modal-modal-title' variant='h6' component='h2'>
                  Quit the quiz
                </Typography>
                <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                  Are you sure you would like to quit? You will lose all your
                  answers.
                </Typography>
              </Grid>
              <Grid item />
            </Grid>
            <Grid container spacing={2} justifyContent='flex-end'>
              <Grid item>
                <Button variant='text' color='error' onClick={quitQuiz}>
                  Quit
                </Button>
              </Grid>
              <Grid item>
                <Button variant='contained' onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Grid>

      {/* Quiz button and timer*/}
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        sx={{
          paddingLeft: '40px',
          paddingRight: '70px',
          paddingBottom: '40px',
        }}
      >
        <Grid item sx={{ marginTop: '20px' }}>
          <Button
            color='inherit'
            onClick={handleShow}
            startIcon={<CloseRoundedIcon />}
          >
            Quit
          </Button>
        </Grid>
        {/* <Grid item lg={8}>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <BorderLinearProgress
              variant='determinate'
              value={(qnum / num_questions) * 100}
            />
          </Box>
        </Grid> */}
        <Grid item sx={{ marginTop: '10px', paddingRight: '60px' }}>
          <CircularProgressWithLabel
            value={(timer / totalSec) * 100}
            min={Math.floor(timer / 60)}
            sec={timer - Math.floor(timer / 60) * 60}
          />
        </Grid>
      </Grid>

      {/* question */}
      <Grid container sx={{ paddingLeft: '40px', paddingBottom: '20px' }}>
        <Typography className={classes.question}>
          {qnum}. {quiz_questions[qnum - 1]?.questionQuestion}
        </Typography>
      </Grid>

      {/* Options */}
      <Grid
        container
        spacing={2}
        justifyContent='center'
        sx={{
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingBottom: '20px',
        }}
      >
        {quiz_questions[qnum - 1]?.questionOptions.map((e, i) =>
          e !== '' ? (
            <Grid item lg={3} md={3} sm={6} xs={6}>
              <Card id={i} className={classes.card}>
                <Button
                  className={classes.button}
                  onClick={() => selectAnswer(i)}
                  // color= {select === i ? "primary" : "inherit"}
                  variant={select === i ? 'contained' : 'text'}
                >
                  <Typography className={classes.options}>
                    {/* {i+1}. {e} */}
                    {e}
                  </Typography>
                </Button>
              </Card>
            </Grid>
          ) : null
        )}
      </Grid>

      {/* prev, next, save buttons */}
      {start ? null : (
        <Fab
          color='primary'
          className={classes.prevButton}
          onClick={prevQuestionNum}
        >
          <ArrowBackRoundedIcon color='inherit' />
        </Fab>
      )}
      {end ? null : (
        <Fab
          color='primary'
          className={classes.nextButton}
          onClick={nextQuestionNum}
        >
          <ArrowForwardRoundedIcon color='inherit' />
        </Fab>
      )}
      {end ? (
        <Fab
          color='primary'
          onClick={checkSubmit}
          variant='extended'
          className={classes.nextButton}
        >
          Submit
        </Fab>
      ) : null}

      {/* Progress bar */}
    </div>
  );
}

export default ConsumerQuizPage;
