import Quiz from '../Quiz';
import Question from '../Question';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Button,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
  getNativeSelectUtilityClasses,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  buttonsContainer: {
    paddingTop: '30px',
    paddingBottom: '20px',
    paddingLeft: '20px',
  },
});

function DetailQuiz({ quizData, setQuizVisible }) {
  const owned = [];
  const history = useHistory();

  const groupid = useRef(0);
  const isGroup = useRef(0);

  const classes = useStyles();

  for (let i = 0; i < Object.keys(quizData.quizQuestions).length; i++) {
    owned.push(quizData.quizQuestions[i].questionQuestion + ', ');
  }

  const apicall = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Token token=38040def040af70134a08e39a3db35d3',
    },
  };

  const apidata = {};

  const creategroupdata = {
    group: {
      name: quizData.quizName,
      course_name: quizData.quizName,
      course_description: quizData.quizDescription,
      course_link: 'https://cse416-quizhub.netlify.app',
      attach_pdf: true,
      certificate_design_id: null,
      badge_design_id: null,
    },
  };

  const createCertificate = async () => {
    try {
      console.log(isGroup.current);
      if (isGroup.current == 0) {
        await axios
          .post(
            `https://api.accredible.com/v1/issuer/groups`,
            creategroupdata,
            apicall
          )
          .then((response) => {
            console.log(response);
            groupid.current = response.data.group.id;
          });
        isGroup.current = 1;
      }
      console.log(isGroup.current);
      console.log(groupid);

      await axios
        .post(
          `https://api.accredible.com/v1/designers/certificate/initialize`,
          apidata,
          apicall
        )
        .then((response) => {
          console.log(response);
          history.push(
            `/createcertificate/${response.data.token}/${groupid.current}/${
              quizData._id
            }/${0}`
          );
        });
    } catch (e) {
      console.error(e);
    }
  };

  const createBadge = async () => {
    try {
      console.log(isGroup.current);
      if (isGroup.current == 0) {
        try {
          await axios
            .post(
              `https://api.accredible.com/v1/issuer/groups`,
              creategroupdata,
              apicall
            )
            .then((response) => {
              console.log(response);
              groupid.current = response.data.group.id;
            });
        } catch (e) {
          console.error(e);
        }
        isGroup.current = 1;
      }
      console.log(groupid);

      await axios
        .post(
          `https://api.accredible.com/v1/designers/badge/initialize`,
          apidata,
          apicall
        )
        .then((response) => {
          console.log(response);
          history.push(
            `/createbadge/${response.data.token}/${groupid.current}/${quizData._id}`
          );
        });
    } catch (e) {
      console.error(e);
    }
  };

  const createCertificateandBadge = async () => {
    try {
      console.log(isGroup.current);
      if (isGroup.current == 0) {
        await axios
          .post(
            `https://api.accredible.com/v1/issuer/groups`,
            creategroupdata,
            apicall
          )
          .then((response) => {
            console.log(response);
            groupid.current = response.data.group.id;
          });
        isGroup.current = 1;
      }
      console.log(isGroup.current);
      console.log(groupid);

      await axios
        .post(
          `https://api.accredible.com/v1/designers/certificate/initialize`,
          apidata,
          apicall
        )
        .then((response) => {
          console.log(response);
          history.push(
            `/createcertificate/${response.data.token}/${groupid.current}/${
              quizData._id
            }/${1}`
          );
        });
    } catch (e) {
      console.error(e);
    }
  };

  const QuestionComponents = quizData.quizQuestions.map((questionData) => {
    return (
      <Grid item>
        <Question
          questionNumber={questionData.questionNumber}
          questionQuestion={questionData.questionQuestion}
          questionAnswer={questionData.questionAnswer}
          questionOptions={questionData.questionOptions}
          setquestionData={() => {
            history.push(`/question/detail/${questionData._id}`);
          }}
        />
      </Grid>
    );
  });

  const questionNumber = [];
  for (let i = 0; i < Object.keys(quizData.quizQuestions).length; i++) {
    questionNumber.push(quizData.quizQuestions[i].quesitonNumber);
  }

  const updateQuizData = () => {
    setQuizVisible(true);
  };

  const updateQuestionData = () => {
    history.push(`/question/${quizData._id}`);
  };

  const gotoLeaderboard = () => {
    history.push(`/leaderboard/${quizData._id}`);
  };

  return (
    <div>
      <Grid containter sx={{ paddingLeft: '10px', paddingTop: '10px' }}>
        <Button
          onClick={() => {
            history.push(`/creatorHome/${quizData.platformId}`);
          }}
          // startIcon={<KeyboardBackspaceRoundedIcon />}
          sx={{ color: 'gray' }}
        >
          Back to platform page
        </Button>
      </Grid>
      {/* TODO: change it to creator preview quiz card */}
      <Quiz
        quizName={quizData.quizName}
        quizDescription={quizData.quizDescription}
        quizImage={quizData.quizImage}
        quizQuestions={quizData.quizQuestions}
      />

      {/* TODO: move them to another section or modal */}
      <Grid
        container
        direction='column'
        spacing={2}
        justifyContent='center'
        sx={{ maxWidth: '1000px', paddingLeft: '20px' }}
      >
        {QuestionComponents}
      </Grid>

      <Grid
        container
        spacing={1}
        // justifyContent="center"
        className={classes.buttonsContainer}
      >
        <Grid item>
          <Button variant='contained' onClick={updateQuizData}>
            Edit Quiz
          </Button>
        </Grid>
        {quizData.quizEnableLeaderboard ? (
          <Grid item>
            <Button variant='contained' onClick={gotoLeaderboard}>
              Go to Leaderboard
            </Button>
          </Grid>
        ) : null}
        <Grid item>
          <Button variant='contained' onClick={updateQuestionData}>
            Add Quesiton
          </Button>
        </Grid>
        {/* <Grid item>
          {quizData.quizCertificateQualification == null ||
          quizData.quizBadgeQualification != null ? null : (
            <Button variant='contained' onClick={createCertificate}>
              Add Certificate
            </Button>
          )}
        </Grid>
        <Grid item>
          {quizData.quizCertificateQualification != null ||
          quizData.quizBadgeQualification == null ? null : (
            <Button variant='contained' onClick={createBadge}>
              Add Badge
            </Button>
          )}
        </Grid> */}
        {/* {quizData.quizCertificateQualification == null ||
            quizData.quizBadgeQualification == null ? (
              ''
            ) : (
              <Button variant='contained' onClick={createCertificateandBadge}>
                Add Certificate and Badge
              </Button>
            )} */}
        <Grid item>
          {quizData.quizRewardType === 'certificate' ? (
            <Button variant='contained' onClick={createCertificate}>
              Add Certificate
            </Button>
          ) : null}
        </Grid>
        <Grid item>
          {quizData.quizRewardType === 'badge' ? (
            <Button variant='contained' onClick={createBadge}>
              Add Badge
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailQuiz;
