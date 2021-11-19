// TODO: add ui for consumer quiz preview card
import axios from 'axios';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
import useApiCall from '../../../hooks/useApiCall';

function ConsumerQuizPreview() {
  const { id } = useParams(); //
  const history = useHistory();

  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [trials, setTrials] = useState(0);
  const [time_min, setTimeMin] = useState(0);
  const [time_sec, setTimeSec] = useState(0);
  const [reward, setReward] = useState(0);
  const [num_questions, setNumQuestions] = useState(0);

  // if (!payload) {
  //   return <div>No Data</div>;
  // }
  // if (loading) {
  //   return <div>loading...</div>;
  // }
  // if (error) {
  //   return <div>error...</div>;
  // }
  const fetchData = async () => {
    try {
      await axios
        .get(
          process.env.NODE_ENV == 'production'
            ? `/api/quiz/detail/${id}`
            : `http://localhost:4000/api/quiz/detail/${id}`
        )
        .then((response) => {
          setName(response.data.quiz.quizName);
          setImage(response.data.quiz.quizImage);
          setDescription(response.data.quiz.quizDescription);
          setTrials(response.data.quiz.quizNumberOfTrials);
          setTimeMin(response.data.quiz.quizTimeLimit.minutes);
          setTimeSec(response.data.quiz.quizTimeLimit.seconds);
          setReward(response.data.quiz.quizRewardType);
          setNumQuestions(response.data.quiz.quizQuestions.length);
        });
    } catch (e) {
      console.error(e);
    }
  };
  // clickBtnHandler();
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Form>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <div> {name} </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
            Description
          </Form.Label>
          <Col sm='10'>
            <div> {description} </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
            Trials
          </Form.Label>
          <Col sm='10'>
            <div> {trials} </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
            Time
          </Form.Label>
          <Col sm='10'>
            <div>
              {' '}
              {time_min} :{time_sec}{' '}
            </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
            Number of Questions
          </Form.Label>
          <Col sm='10'>
            <div> {num_questions} </div>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
            Reward
          </Form.Label>
          <Col sm='10'>
            <div> {reward} </div>
          </Col>
        </Form.Group>
      </Form>

      <Row>
        <Col></Col>
        <Col></Col>
        <Button
          onClick={() => {
            console.log(id);
            history.push(`/consumerquizpage/${id}`);
            //history.push('/consumerquizpage',id);
          }}
        >
          Start Quiz
        </Button>
        <Col></Col>
      </Row>
    </div>
  );
}

export default ConsumerQuizPreview;
