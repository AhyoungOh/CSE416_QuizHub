import axios from 'axios';
import React, { useState } from 'react';
import { isNumber } from '../../utils/validate';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  TextField,
  Paper,
  Button,
  Card,
  Typography,
} from '@mui/material';

function WriteQuestion({
  questionData,
  setQuestionVisible,
  quizId,
  fetchData,
}) {
  const [questionNumber, setQuestionNumber] = useState(
    questionData?.questionNumber || ''
  );
  const [questionQuestion, setQuestionQuestion] = useState(
    questionData?.questionQuestion || ''
  );
  const [questionOption1, setQuestionOption1] = useState(
    questionData?.questionOption1 || ''
  );
  const [questionOption2, setQuestionOption2] = useState(
    questionData?.questionOption2 || ''
  );
  const [questionOption3, setQuestionOption3] = useState(
    questionData?.questionOption3 || ''
  );
  const [questionOption4, setQuestionOption4] = useState(
    questionData?.questionOption4 || ''
  );
  const [questionOptions, setQuestionOptions] = useState(
    questionData?.questionOptions || []
  );
  const [questionAnswer, setQuetsionAnswer] = useState(
    questionData?.questionAnswer || ''
  );
  const history = useHistory();

  const getQuestionNumber = async () => {
    try {
      await axios
        .get(
          process.env.NODE_ENV === 'production'
            ? `/api/quiz/detail/${quizId}`
            : `http://localhost:4000/api/quiz/detail/${quizId}`
        )
        .then((Response) => {
          setQuestionNumber(Response.data.quiz.quizQuestions.length + 1);
        });
    } catch (e) {
      console.error(e);
    }
  };
  getQuestionNumber();

  const createquestionData = async () => {
    if (questionQuestion === '') {
      alert('please fill out the question');
      return;
    }
    if (questionOption1 === '') {
      alert('please fill out the option 1');
      return;
    }
    if (questionOption2 === '') {
      alert('please fill out the option 2');
      return;
    }
    if (!isNumber(questionAnswer)) {
      alert('please fill out the question answer number');
      return;
    }
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/question/${quizId}`
        : `http://localhost:4000/api/question/${quizId}`,
      {
        quizId,
        questionNumber,
        questionQuestion,
        questionOption1,
        questionOption2,
        questionOption3,
        questionOption4,
        questionAnswer,
      }
    );
    setQuestionVisible(false);
    fetchData();
    history.push(`/quiz/detail/${quizId}`);
  };

  const updatequestionData = async () => {
    if (questionQuestion === '') {
      alert('please fill out the question');
      return;
    }
    if (questionOption1 === '') {
      alert('please fill out the option 1');
      return;
    }
    if (questionOption2 === '') {
      alert('please fill out the option 2');
      return;
    }
    if (!isNumber(questionAnswer)) {
      alert('please fill out the question answer number');
      return;
    }
    await axios.put(
      process.env.NODE_ENV === 'production'
        ? `/api/question/detail/${questionData._id}`
        : `http://localhost:4000/api/question/detail/${questionData._id}`,
      {
        _id: questionData._id,
        questionQuestion,
        questionOption1,
        questionOption2,
        questionOption3,
        questionOption4,
        questionAnswer,
      }
    );
    setQuestionVisible(false);
    fetchData();
    history.push(`/question/detail/${questionData._id}`);
  };

  const deletequestionData = async () => {
    await axios.delete(
      process.env.NODE_ENV === 'production'
        ? `/api/question/detail/${questionData._id}`
        : `http://localhost:4000/api/question/detail/${questionData._id}`
    );
    setQuestionVisible(false);
    fetchData();
    history.push(`/quiz/detail/${quizId}`);
  };

  if (questionData === undefined) {
    // add new question
    return (
      <div className='write'>
        {/* <Paper
          sx={{
            display: 'flex',
            flexWrapped: 'wrap',
            flexDirection: 'column',
            minWidth: '500px',
          }}
        > */}
        <Card
          sx={{
            borderRadius: '18px',
            minWidth: '1000px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid container direction='column' sx={{ padding: '20px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Typography variant='h5'>{questionNumber}</Typography>
              <TextField
                required
                autoFocus
                fullWidth
                variant='standard'
                margin='dense'
                label='Question'
                type='text'
                placeholder='Enter the question...'
                onChange={(e) => setQuestionQuestion(e.target.value)}
              />
            </Box>
            <TextField
              required
              autoFocus
              // fullWidth
              margin='dense'
              label='Options 1'
              type='text'
              placeholder='Enter the option 1...'
              value={questionOption1}
              onChange={(e) => setQuestionOption1(e.target.value)}
              // sx={{ m: 3 }}
            />
            <TextField
              required
              autoFocus
              // fullWidth
              margin='dense'
              label='Options 2'
              type='text'
              placeholder='Enter the option 2...'
              value={questionOption2}
              onChange={(e) => setQuestionOption2(e.target.value)}
              // sx={{ m: 3 }}
            />
            <TextField
              autoFocus
              // fullWidth
              margin='dense'
              label='Options 3'
              type='text'
              placeholder='Enter the option 3...'
              value={questionOption3}
              onChange={(e) => setQuestionOption3(e.target.value)}
              // sx={{ m: 3 }}
            />
            <TextField
              autoFocus
              // fullWidth
              margin='dense'
              label='Options 4'
              type='text'
              placeholder='Enter the option 4...'
              value={questionOption4}
              onChange={(e) => setQuestionOption4(e.target.value)}
              // sx={{ m: 3 }}
            />
            <TextField
              required
              autoFocus
              // fullWidth
              margin='dense'
              label='Answer'
              type='number'
              placeholder='Enter the answer number...'
              onChange={(e) => setQuetsionAnswer(e.target.value)}
              // sx={{ m: 3 }}
            />
            <Grid
              container
              justifyContent='flex-end'
              spacing={2}
              sx={{ padding: '25px' }}
            >
              <Grid item>
                <Button variant='contained' onClick={createquestionData}>
                  Create
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant='outlined'
                  color='inherit'
                  onClick={() => {
                    history.push(`/quiz/detail/${quizId}`);
                  }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  } else {
    // edit question
    // console.log('questionOptions', questionOptions);
    // console.log('questionOption1', questionOption1);
    return (
      <div
        className='write'
        onClick={(e) => {
          if ([...e.target?.classList].includes('write'))
            setQuestionVisible(false);
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexWrapped: 'wrap',
            flexDirection: 'column',
            minWidth: '500px',
          }}
        >
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Question'
            type='text'
            placeholder='Enter the question...'
            value={questionQuestion}
            onChange={(e) => setQuestionQuestion(e.target.value)}
            // sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Options 1'
            type='text'
            placeholder='Enter the option 1...'
            value={questionOption1}
            onChange={(e) => setQuestionOption1(e.target.value)}
            // sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Options 2'
            type='text'
            placeholder='Enter the option 2...'
            value={questionOption2}
            onChange={(e) => setQuestionOption2(e.target.value)}
            // sx={{ m: 3 }}
          />
          <TextField
            autoFocus
            // fullWidth
            margin='dense'
            label='Options 3'
            type='text'
            placeholder='Enter the option 3...'
            value={questionOption3}
            onChange={(e) => setQuestionOption3(e.target.value)}
            // sx={{ m: 3 }}
          />
          <TextField
            autoFocus
            // fullWidth
            margin='dense'
            label='Options 4'
            type='text'
            placeholder='Enter the option 4...'
            value={questionOption4}
            onChange={(e) => setQuestionOption4(e.target.value)}
            // sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus
            // fullWidth
            margin='dense'
            label='Answer'
            type='number'
            placeholder='Enter the answer...'
            value={questionAnswer}
            onChange={(e) => setQuetsionAnswer(e.target.value)}
            // sx={{ m: 3 }}
          />
          <Grid
            container
            justifyContent='flex-end'
            spacing={2}
            sx={{ padding: '25px' }}
          >
            <Grid item>
              <Button
                variant='contained'
                color='error'
                onClick={deletequestionData}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button variant='contained' onClick={updatequestionData}>
                Update
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

export default WriteQuestion;
