import axios from 'axios';
import { Button, Form, Row, Col, ButtonGroup, Modal } from 'react-bootstrap';
import { useRef, useEffect, useContext, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import useApiCall from '../../../hooks/useApiCall';

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

  const submitHandler = () => {
    axios.post(
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
      <Button variant='link' onClick={handleShow}>
        Quit Quiz
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop='static'
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Quit Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you would like to quit. You will loose all your answered
          questions.
        </Modal.Body>
        <Modal.Footer>
          <Col></Col>
          <Col>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Col>
          <Col>
            <Button
              variant='danger'
              onClick={() => {
                history.push(`/consumerquizpreview/${id}`);
                //history.push('/consumerquizpreview',quizid);
              }}
            >
              Ok
            </Button>
          </Col>
        </Modal.Footer>
      </Modal>

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

      <Row>
        {quiz_questions[qnum - 1]?.questionOptions.map((e, i) => (
          <Button id={i} onClick={() => selectAnswer(i)}>
            {e}
          </Button>
        ))}
      </Row>
      <ButtonGroup aria-label='Basic example'>
        <Button variant='secondary' onClick={prevQuestionNum}>
          Prev
        </Button>
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
