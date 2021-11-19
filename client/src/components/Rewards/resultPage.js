import axios from 'axios';
import {Form,Row,Col,Button} from 'react-bootstrap'
import React, { useState, useRef ,useEffect,useContext} from 'react';
import { UserContext, accountSettingsContext } from '../../App';
import { useHistory, useParams} from 'react-router-dom';

function ResultsPage (){
    const {id}=useParams()
    const quizid=id
    console.log(quizid)

    const result = 85     // need to change this based on takes quiz
    const certificate_qualifier=useRef(0)

    //const quizName=useRef("")
    const [quizName,setQuizName] = useState("")
    const certificate_id=useRef("")
    
    const { user, dispatch } = useContext(UserContext);
    const email =useRef("")
    const credential_id=useRef("")
    //const file_download=useRef("")
    const [file_download,setFile]=useState("")

    const getQuizInfo = async () => {
        try {
          await axios
            .get(
              process.env.NODE_ENV == 'production'
                ? `${process.env.REACT_APP_API_SERVER}/api/quiz/detail/${quizid}`
                : `http://localhost:4000/api/quiz/detail/${quizid}`
            )
            .then((response) => {
              console.log(response)
              //quizName.current=response.data.quiz.quizName
              setQuizName(response.data.quiz.quizName)
              certificate_qualifier.current=response.data.quiz.quizCertificateQualification
              certificate_id.current=response.data.quiz.quizCertificate
            });
        } catch (e) {
          console.error(e);
        }
      };
     
      getQuizInfo();
      
    const apicall={
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Token token=ac4e7119623388f9afad927bb881138f',
      }
    }

    const createCredential = async () => {
      if(result>=certificate_qualifier.current){
      console.log("inside create credential")
      const apidata={
        credential: {
          "recipient": {
              "name": user.username,  // for testing purposes the name is Chellsea otherwise it will be user.username
              "email": user.email, //email is chellsea.robinson@stonybrook.edu otherwise it will be user.email
              "id": user.id,
          },
          "group_name": quizName,//quizName.current
        }
      }
        try{
        console.log(apidata)
        console.log(quizName)
        await axios.post(
            `https://api.accredible.com/v1/credentials`,apidata,apicall)
          .then((response) => {
            console.log(response);
            credential_id.current=response.data.credential.id
          });
        //pdfCredential()
        await axios.post(
          `https://api.accredible.com/v1/credentials/generate_single_pdf/${credential_id.current}`,{},apicall)
        .then((response) => {
          console.log(response);
          console.log(response.data.file)
          //file_download.current=response.data.file
          setFile(response.data.file)
        });
        }catch (e) {
          console.error(e);
       }
      }
    }
      createCredential();

    return (
        <div>
             <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
              <Form.Label column sm="2">
                Result
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={result} />
              </Col>
            </Form.Group>
            <h1>{result>=certificate_qualifier.current?"Congratulations":"Sorry please try again"}</h1>
            </Form>
            {console.log(file_download.current)}
            {result>=certificate_qualifier.current? <a href={file_download} download> Click to download certificate </a>:""}

        </div>
    )
}

export default ResultsPage;