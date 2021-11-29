// TODO: add ui for quiz taking
import axios from 'axios';
import { Form, Row, Col, ButtonGroup } from 'react-bootstrap';
import { useRef, useEffect, useContext, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import useApiCall from '../../../hooks/useApiCall';
import { Grid, Button, Modal, Box, Typography } from '@mui/material';

// modal style
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

function ConsumerQuizPage() {
  const history = useHistory();

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
    if (qnum !== num_questions) {
      setQnum(qnum + 1);
    }
  };

  const prevQuestionNum = () => {
    if (qnum !== 1) {
      setQnum(qnum - 1);
    }
  };

  const selectAnswer = (answer) => {
    const answerList = quizInfo.current.answerchoices;
    if (answerList.length < qnum) {
      quizInfo.current.answerchoices.push(answer);
    } else {
      quizInfo.current.answerchoices[qnum - 1] = answer;
    }
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
      {/* Quiz button */}
      <Button variant='link' onClick={handleShow}>
        Quit Quiz
      </Button>

      {/* Quit confirm modal */}
      <Modal open={show} onClose={handleClose}>
        <Box sx={style}>
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
      <Form>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
            {qnum}
          </Form.Label>
          <Col sm='10'>
            <div>{quiz_questions[qnum - 1]?.questionQuestion}</div>
          </Col>
        </Form.Group>
      </Form>
      
      {/* Options */}
      <Row>
        {quiz_questions[qnum - 1]?.questionOptions.map((e, i) => (
          <Button id={i} onClick={() => selectAnswer(i)}>
            {/* {i+1}. {e} */}
            {e}
          </Button>
        ))}
      </Row>

      {/* Progress bar and prev, next buttons */}
      <ButtonGroup aria-label='Basic example'>
        <Button variant='secondary' onClick={prevQuestionNum}>
          Prev
        </Button>
        {/* if last question -> disabled */}
        <Button variant='secondary' onClick={nextQuestionNum}>
          Next
        </Button>
      </ButtonGroup>

      {qnum == num_questions ? (
        <Button onClick={submitHandler}>Submit</Button>
      ) : (
        ''
      )}
    </div>
  );
}

export default ConsumerQuizPage;
