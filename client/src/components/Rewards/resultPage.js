import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { UserContext, accountSettingsContext } from '../../App';
import { useHistory, useParams, Link } from 'react-router-dom';
import useApiCall from '../../hooks/useApiCall';
import CreateBadge from './createBadge';

function ResultsPage() {
  const { id } = useParams();
  const quizId = id;
  // console.log(quizid);
  const [loading, quizResult, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/consumer/quizHistory/${quizId}`
      : `http://localhost:4000/api/consumer/quizHistory/${quizId}`,
    { withCredentials: true }
  );

  // console.log('consumer quiz history', payload);
  const [result,setResult] = useState(''); // need to change this based on takes quiz
  const certificate_qualifier = useRef(0);
  const badge_qualifier=useRef(0)

  //const quizName=useRef("")
  const [quizName, setQuizName] = useState('');
  const certificate_id = useRef('');

  const { user, dispatch } = useContext(UserContext);
  const email = useRef('');
  const credential_id = useRef('');
  //const file_download=useRef("")
  const [file_download, setFile] = useState('');
  const [img,setImage] = useState('')

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
      await axios
        .get(
          process.env.NODE_ENV == 'production'
            ? `/api/quiz/detail/${quizId}`
            : `http://localhost:4000/api/quiz/detail/${quizId}`
        )
        .then((response) => {
          console.log(response);
          //quizName.current=response.data.quiz.quizName
          certificate_qualifier.current =response.data.quiz.quizCertificateQualification;
          badge_qualifier.current=response.data.quiz.quizBadgeQualification;
          certificate_id.current = response.data.quiz.quizCertificate;
          let correct = Number(quizResult[0].correctedAnswerNum)
          console.log(correct)
          let ques = Number(response.data.quiz.quizTotalNumberOfQuestions) > 0 ? Number(response.data.quiz.quizTotalNumberOfQuestions) : response.data.quiz.quizQuestions.length
          console.log(ques)
          let res=(correct/ques)*100
          console.log(res)
          setResult(res.toFixed(2)+"")
          console.log(result)
          setQuizName(response.data.quiz.quizName);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getQuizInfo();
  }, []);
  
  useEffect(() => {
    createCredential();
  }, [quizName]);

  const apicall = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=38040def040af70134a08e39a3db35d3',
    },
  };

  const createCredential = async () => {
    if (result >= certificate_qualifier.current || result >= badge_qualifier.current) {
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
        console.log(apidata);
        console.log(quizName);
        await axios
          .post(`https://api.accredible.com/v1/credentials`, apidata, apicall)
          .then((response) => {
            console.log(response);
            credential_id.current = response.data.credential.id;
            setImage(response.data.credential.badge.image.preview)
            console.log(response.data.credential.badge.image.preview)
          });
        //pdfCredential()
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
          if(result >= badge_qualifier.current){
            createBadge()
          }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const createBadge = async () =>{
    try{
      await axios.post(
        process.env.NODE_ENV == 'production'
          ? `/api/badge`
          : `http://localhost:4000/api/badge`,
        {
          badgeUploadFile: img,
          consumerId: user.id,
          badgeVisibility: true,
        }
      ).then((response)=>{
        console.log(response)
      });
      
    } catch (e){
      console.error(e);
    }
  }

  return (
    <div>
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
          {result >= certificate_qualifier.current
            ? 'Congratulations'
            : 'Sorry please try again'}
        </h1>
      </Form>
      {console.log(file_download)}
      {console.log(badge_qualifier.current)}
      {console.log(certificate_qualifier.current)}
      {result >= badge_qualifier.current ? (<img src={img} width="200" height="200"></img>) : ("")}
      {result >= certificate_qualifier.current ? (
        <a href={file_download} download>
          {' '}
          Click to download certificate{' '}
        </a>
      ) : (
        ''
      )}
      Quiz Result
      {JSON.stringify(quizResult)}
      <Link to={`/leaderboard/${quizId}`}>See Leaderboard</Link>
    </div>
  );
}

export default ResultsPage;
