// TODO: make it responsive
import axios from 'axios';
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
    fontWeight: '700',
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
    paddingTop: '20px',
  },
});

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: '8px',
  width: '1000px',
  borderRadius: '2px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: '2px',
    backgroundColor: '#007fff',
  },
}));

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

  const runTimer = () => {
    leftTimeTimer.current = setInterval(() => {
      leftTime.current = leftTime.current - 1;
      setTimer(leftTime.current);
      if (leftTime.current === 0) {
        clearInterval(leftTimeTimer.current);
        leftTimeTimer.current = null;
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
        usedTrialNumber: usedTrialNumber + 1,
      };
      leftTime.current =
        60 * Number(time_min.current) + Number(time_sec.current);
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
    const calculateTakenTime = () => {
      const originSeconds =
        60 * Number(time_min.current) + Number(time_sec.current);
      const takenSeconds = originSeconds - leftTime.current;
      const minutes = Number(Math.floor(takenSeconds / 60));
      const seconds = Number(takenSeconds % 60);
      return { minutes, seconds };
    };
    console.log(calculateTakenTime());
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/consumer/quiz`
        : `http://localhost:4000/api/consumer/quiz`,
      {
        quizzes: {
          ...quizInfo.current,
          quizTimeTaken: calculateTakenTime(),
          usedTrialNumber: quizInfo.current.usedTrialNumber + 1,
        },
      },
      { withCredentials: true }
    );
    history.push(`/result/${id}`);
  };

  return (
    <div>
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
      <Grid
        container
        direction='column'
        spacing={3}
        className={classes.container}
      >
        <Grid item>
          {/* Quiz button */}
          <Button
            color='inherit'
            onClick={handleShow}
            startIcon={<CloseRoundedIcon />}
          >
            Quit
          </Button>
          <div>Seconds : {timer}</div>
          {/* Quit confirm modal */}
          <Modal open={show} onClose={handleClose}>
            <Box sx={style}>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <Typography
                    id='modal-modal-title'
                    variant='h6'
                    component='h2'
                  >
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
                  <Button
                    variant='text'
                    color='error'
                    onClick={() => {
                      history.push(`/consumerquizpreview/${id}`);
                      //history.push('/consumerquizpreview',quizid);
                    }}
                  >
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
          {/* question */}
          <Typography className={classes.question}>
            {qnum}. {quiz_questions[qnum - 1]?.questionQuestion}
          </Typography>
        </Grid>
        <Grid item>
          {/* Options */}
          <Grid container spacing={2} justifyContent='center'>
            {quiz_questions[qnum - 1]?.questionOptions.map((e, i) => (
              <Grid item xs={12} s={6} md={3}>
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
            ))}
          </Grid>
        </Grid>
        <Grid item>
          {/* Progress bar and prev, next buttons */}
          <Grid
            container
            spacing={2}
            alignItems='center'
            justifyContent='center'
          >
            <Grid item>
              {start ? (
                <IconButton
                  sx={{ backgroundColor: '#ffffff' }}
                  color='primary'
                  component='span'
                  disabled
                >
                  <ArrowBackRoundedIcon />
                </IconButton>
              ) : (
                <IconButton
                  sx={{ backgroundColor: '#ffffff' }}
                  color='primary'
                  component='span'
                  onClick={prevQuestionNum}
                >
                  <ArrowBackRoundedIcon />
                </IconButton>
              )}
            </Grid>
            <Grid item>
              <Box sx={{ flexGrow: 1 }}>
                <BorderLinearProgress
                  variant='determinate'
                  value={(qnum / num_questions) * 100}
                />
              </Box>
            </Grid>
            <Grid item>
              {end ? (
                <IconButton
                  sx={{ backgroundColor: '#ffffff' }}
                  color='primary'
                  component='span'
                  disabled
                >
                  <ArrowForwardRoundedIcon />
                </IconButton>
              ) : (
                <IconButton
                  sx={{ backgroundColor: '#ffffff' }}
                  color='primary'
                  component='span'
                  onClick={nextQuestionNum}
                >
                  <ArrowForwardRoundedIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item alignSelf='flex-end'>
          {end ? (
            <Button
              variant='contained'
              onClick={checkSubmit}
              className={classes.submitButton}
            >
              Submit
            </Button>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ConsumerQuizPage;
