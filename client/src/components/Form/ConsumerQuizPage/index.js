// TODO: add ui for quiz taking
import axios from 'axios';
import { Form, Row, Col, ButtonGroup } from 'react-bootstrap';
import { useRef, useEffect, useContext, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import useApiCall from '../../../hooks/useApiCall';
import { Grid, Button, Modal, Box, Typography, Card, CardActionArea, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    paddingTop: '40px',
    paddingLeft: '70px',
    paddingRight: '70px',
  },
  modal: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
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
    // minWidth: '300px',
  },
  button: {
    padding: '30px',
    minHeight: '300px',
    minWidth: '100%',
    fontWeight: '600',
    backgroundColor: '#ffffff', 
    borderRadius: '18px',
    // "&:active": {
    //   backgroundColor: '#007fff', 
    //   color: '#FFFFFF',
    // },
  },
  select: {
    padding: '30px',
    minHeight: '300px',
    minWidth: '100%',
    fontWeight: '600',
    backgroundColor: '#007fff', 
    color: '#FFFFFF',
  }
});

function ConsumerQuizPage() {
  const history = useHistory();
  const classes = useStyles();
  
  const { id } = useParams(); //
  const quizid = id;

  // console.log('quizid' + quizid);

  const [qnum, setQnum] = useState(1);

  const time_min = useRef('');
  const time_sec = useRef('');
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

  // state
  const [end, setEnd] = useState(false);
  const [start, setStart] = useState(true);

  const fetchData = async () => {
    try {
      await axios
        .get(
          process.env.NODE_ENV == 'production'
            ? `/api/quiz/detail/${id}`
            : `http://localhost:4000/api/quiz/detail/${id}`
        )
        .then((response) => {
          time_min.current = response.data.quiz.quizTimeLimit.minutes;
          time_sec.current = response.data.quiz.quizTimeLimit.seconds;
          setQuizQuestions(response.data.quiz.quizQuestions);
          // setQuestionOptions(response.data.quiz.quizQuestions.questionOptions);
        });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const getQuestions = async (question_id) => {
    try {
      await axios
        .get(
          process.env.NODE_ENV == 'production'
            ? `/api/question/${question_id}`
            : `http://localhost:4000/api/question/${question_id}`
        )
        .then((response) => {
          //console.log(quizid)
          question.current = response.data.createQuestion.questionQuestions;
          answer.current = response.data.createQuestion.questionAnswer;
        });
    } catch (e) {
      console.error(e);
    }
  };

  const nextQuestionNum = () => {
    const answerList = quizInfo.current.answerchoices;
    console.log(answerList);
    setStart(false);
    if (qnum !== num_questions) {
      setQnum(qnum + 1);
      // const nextqnum = qnum + 1;
      // console.log("nextqnum", nextqnum);
      console.log("answerList[qnum]", answerList[qnum]);
      if (0 <= answerList[qnum] && answerList[qnum] <= 3) {
        setSelect(answerList[qnum]);
      } else {
        setSelect(4);
      }
      if (qnum === num_questions-1) {
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
      console.log("answerList[qnum-2]", answerList[qnum-2]);
      setSelect(answerList[qnum-2]);
    }
  };

  const selectAnswer = (answer) => {
    const answerList = quizInfo.current.answerchoices;
    if (answerList.length < qnum) {
      // new answer
      console.log("qnum", qnum);
      quizInfo.current.answerchoices.push(answer);
    } else {
      // change answer
      quizInfo.current.answerchoices[qnum - 1] = answer;
    }
    console.log("selectAnswer", answer);
    setSelect(answer);
  };

  const submitHandler = async () => {
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/consumer/quiz`
        : `http://localhost:4000/api/consumer/quiz`,
      { quizzes: { ...quizInfo.current } },
      { withCredentials: true }
    );
    history.push(`/result/${id}`);
  };

  return (
    <div>
      <Grid container direction="column" spacing={2} className={classes.container}>
        <Grid item>
          {/* Quiz button */}
          <Button color="inherit" onClick={handleShow} startIcon={<CloseRoundedIcon />}>
            Quit Quiz
          </Button>
          {/* Quit confirm modal */}
          <Modal open={show} onClose={handleClose}>
            <Box className={classes.modal}>
              <Grid container direction='column' spacing={2}>
                <Grid item>
                  <Typography id='modal-modal-title' variant='h6' component='h2'>
                    Delete platform
                  </Typography>
                  <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                    Are you sure you would like to quit? You will lose all your answers.
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
          <Grid container spacing={2} justifyContent="center">
            {quiz_questions[qnum - 1]?.questionOptions.map((e, i) => (
              <Grid item xs={12} s={6} md={3}>
                <Card id={i} className={classes.card}>
                  <Button 
                    className={classes.button}
                    onClick={() => selectAnswer(i)}
                    color= {select === i ? "primary" : "inherit"}
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
          <Grid container spacing={2}>
            <Grid item>
              { start ? 
                // <Button color='inherit' disabled>
                //   Prev
                // </Button>
                <IconButton sx={{backgroundColor: '#ffffff'}} color="primary" component="span" disabled>
                  <ArrowBackRoundedIcon />
                </IconButton>
                :
                <IconButton sx={{backgroundColor: '#ffffff'}} color="primary" component="span" onClick={prevQuestionNum}>
                  <ArrowBackRoundedIcon />
                </IconButton>
              }
            </Grid>
            <Grid item>
              { end ? 
                <IconButton sx={{backgroundColor: '#ffffff'}} color="primary" component="span" disabled>
                  <ArrowForwardRoundedIcon />
                </IconButton>
                :
                <IconButton sx={{backgroundColor: '#ffffff'}} color="primary" component="span" onClick={nextQuestionNum}>
                  <ArrowForwardRoundedIcon />
                </IconButton>
              }
            </Grid>
            <Grid item>
              { end ? (
                <Button onClick={submitHandler}>Submit</Button>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default ConsumerQuizPage;
