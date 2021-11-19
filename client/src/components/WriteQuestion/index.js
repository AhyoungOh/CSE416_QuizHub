import axios from 'axios';
import React, { useState } from 'react';
import Input from './Input';
import { useHistory } from 'react-router-dom';
import { Grid, TextField, Paper, Button } from '@mui/material';

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
  const [questionOptions, setQuestionOption] = useState(
    questionData?.questionOptions || ''
  );
  const [questionAnswer, setQuetsionAnswer] = useState(
    questionData?.questionAnswer || ''
  );
  const history = useHistory();
  console.log('quizId', quizId);

  const createquestionData = async () => {
    await axios.post(
      process.env.NODE_ENV === 'production'
        ? `/api/question/${quizId}`
        : `http://localhost:4000/api/question/${quizId}`,
      {
        questionNumber,
        questionQuestion,
        questionOptions,
        questionAnswer,
        quizId,
      }
    );
    setQuestionVisible(false);
    fetchData();
    history.push(`/quiz/detail/${quizId}`);
  };

  const updatequestionData = async () => {
    await axios.put(
      process.env.NODE_ENV === 'production'
        ? `/api/question/detail/${questionData._id}`
        : `http://localhost:4000/api/question/detail/${questionData._id}`,
      {
        _id: questionData._id,
        questionNumber,
        questionQuestion,
        questionOptions,
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
        <Paper sx={{ display: 'flex', flexWrapped: 'wrap', flexDirection: 'column', minWidth: '500px' }}>
          <TextField
            required
            autoFocus 
            // fullWidth
            margin="dense"
            label="Question Number"
            type="text" 
            placeholder="Enter question number..."
            onChange={(e) => setQuestionNumber(e.target.value)}
            sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus 
            // fullWidth
            margin="dense"
            label="Question"
            type="text" 
            placeholder="Enter the question..."
            onChange={(e) => setQuestionQuestion(e.target.value)}
            sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus 
            // fullWidth
            margin="dense"
            label="Options"
            type="text" 
            placeholder="Enter the options..."
            onChange={(e) => setQuestionOption(e.target.value)}
            sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus 
            // fullWidth
            margin="dense"
            label="Answer"
            type="text" 
            placeholder="Enter the answer..."
            onChange={(e) => setQuetsionAnswer(e.target.value)}
            sx={{ m: 3 }}
          />
          <Grid container justifyContent="flex-end" spacing={2} sx={{ padding: "25px" }}>
            <Grid item>
              <Button variant="contained" onClick={createquestionData}>
                Create
              </Button>
            </Grid>
              <Grid item>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                    history.push(`/quiz/detail/${quizId}`);
                  }
                }
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  } else {
    // edit question
    return (
      <div
        className='write'
        onClick={(e) => {
          if ([...e.target?.classList].includes('write'))
            setQuestionVisible(false);
        }}
      >
        <Paper sx={{ display: 'flex', flexWrapped: 'wrap', flexDirection: 'column', minWidth: '500px' }}>
          <TextField
            required
            autoFocus 
            // fullWidth
            margin="dense"
            label="Question Number"
            type="text" 
            placeholder="Enter question number..."
            value={questionNumber}
            onChange={(e) => setQuestionNumber(e.target.value)}
            sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus 
            // fullWidth
            margin="dense"
            label="Question"
            type="text" 
            placeholder="Enter the question..."
            value={questionQuestion}
            onChange={(e) => setQuestionQuestion(e.target.value)}
            sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus 
            // fullWidth
            margin="dense"
            label="Options"
            type="text" 
            placeholder="Enter the options..."
            value={questionOptions}
            onChange={(e) => setQuestionOption(e.target.value)}
            sx={{ m: 3 }}
          />
          <TextField
            required
            autoFocus 
            // fullWidth
            margin="dense"
            label="Answer"
            type="text" 
            placeholder="Enter the answer..."
            value={questionAnswer}
            onChange={(e) => setQuetsionAnswer(e.target.value)}
            sx={{ m: 3 }}
          />
          <Grid container justifyContent="flex-end" spacing={2} sx={{ padding: "25px" }}>
            <Grid item>
              <Button
                variant="contained"
                color="error"
                onClick={deletequestionData}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={updatequestionData}>
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
