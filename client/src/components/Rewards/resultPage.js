import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext, accountSettingsContext } from '../../App';
import { useHistory, useParams, Link, useLocation } from 'react-router-dom';
import useApiCall from '../../hooks/useApiCall';

function ResultsPage() {
  const { id } = useParams();
  const location = useLocation();
  const quizId = id;
  const [loading, quizResult, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/consumer/quizHistory/${quizId}`
      : `http://localhost:4000/api/consumer/quizHistory/${quizId}`,
    { withCredentials: true }
  );

  const currentQuizResult = location.state?.quizzes;
  console.log('current his : ', currentQuizResult);
  // console.log('consumer quiz history', payload);
  // const [result, setResult] = useState(''); // need to change this based on takes quiz
  const [leaderboardVisible, setLeaderboardVisible] = useState('');

  const certificate_qualifier = useRef(0);
  const badge_qualifier = useRef(0);

  const [correct, setCorrect] = useState(0);
  const [ques, setQues] = useState(0);
  //const quizName=useRef("")
  const [quizName, setQuizName] = useState('');
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
  const result = res.toFixed(2) + '';
  console.log('', result);

  const apicall = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=38040def040af70134a08e39a3db35d3',
    },
  };

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
    createCredential();
  }, [quizName]);

  return (
    <div style={{ paddingTop: '60px' }}>
      <Form>
        <Form.Group as={Row} className='mb-3' controlId='formPlaintextEmail'>
          <Form.Label column sm='2'>
            Result
          </Form.Label>
          <Col sm='10'>
            <Form.Control plaintext readOnly defaultValue={result} />
          </Col>
        </Form.Group>
        <h1>
          {Number(result) >= certificate_qualifier.current ||
          Number(result) >= badge_qualifier.current
            ? 'Congratulations'
            : 'Sorry please try again'}
        </h1>
      </Form>
      {/* {console.log(file_download)}
      {console.log(badge_qualifier.current)}
      {console.log(certificate_qualifier.current)} */}
      {Number(result) >= badge_qualifier.current ? (
        <img src={img} width='200' height='200'></img>
      ) : (
        ''
      )}
      {Number(result) >= certificate_qualifier.current ? (
        <a href={file_download} download>
          {' '}
          Click to download certificate{' '}
        </a>
      ) : (
        ''
      )}
      <div>Quiz Result</div>
      <div>Percentage of the score: {result}</div>
      <div>Current result : {JSON.stringify(currentQuizResult)}</div>
      <div>Best result : {JSON.stringify(quizResult)}</div>
      {leaderboardVisible ? (
        <Link to={`/leaderboard/${quizId}`}>See Leaderboard</Link>
      ) : null}
    </div>
  );
}

export default ResultsPage;
