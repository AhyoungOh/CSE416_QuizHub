import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { isNumber } from '../../utils/validate';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
  Typography,
  Fab,
  Tooltip,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

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
  const [questionArray, setQuestionArray] = useState([]);
  const [lastQuestion, setLastQuestion] = useState(false);
  const [firstQuestion, setFirstQuestion] = useState(questionNumber === 1);
  const [changed, setChanged] = useState(false);
  // const [three, setThree] = useState(false);
  const [four, setFour] = useState(questionData?.questionOption3 ? true : false);
  const [tf, setTf] = useState(questionData?.questionOption1 == 'True' ? true : false);
  const [tem1, setTem1] = useState('');
  const [tem2, setTem2] = useState('');

  const history = useHistory();

  // const getQuestionNumber = async () => {
  //   try {
  //     await axios
  //       .get(
  //         process.env.NODE_ENV === 'production'
  //           ? `/api/quiz/detail/${quizId}`
  //           : `http://localhost:4000/api/quiz/detail/${quizId}`
  //       )
  //       .then((Response) => {
  //         setQuestionNumber(Response.data.quiz.quizQuestions.length + 1);
  //       });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // getQuestionNumber();

  const exist = (x) =>{
    // console.log('x: ', x, 'questionData._id: ', questionData._id, 'result:', x === questionData._id);
    return x === questionData._id;
  }

  const getQuestionArray = async () => {
    try {
      await axios
      .get(
        process.env.NODE_ENV === 'production'
          ? `/api/quiz/detail/${quizId}`
          : `http://localhost:4000/api/quiz/detail/${quizId}`
      )
      .then((res) => {
        const tem = [];
        for (const q of res.data.quiz.quizQuestions) {
          tem.push(q._id);
        }
        setQuestionArray(tem);
        { questionData ? setQuestionNumber(tem.findIndex(exist)+1) : setQuestionNumber(res.data.quiz.quizQuestions.length + 1) };
        { tem.length === tem.findIndex(exist)+1 ? setLastQuestion(true) : setLastQuestion(false)};
        { tem.length === 1 || tem.findIndex(exist) === 0 ? setFirstQuestion(true) : setFirstQuestion(false) };
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(
    getQuestionArray,
    []
  );
  // console.log(questionArray);
  // console.log(questionNumber);
  
  const createquestionData = async () => {
    if (questionQuestion === '') {
      alert('Please enter the question.');
      return;
    }
    if (questionOption1 === '') {
      alert('Please enter answer A.');
      return;
    }
    if (questionOption2 === '') {
      alert('Please enter answer B.');
      return;
    }
    if (four && questionOption3 === '') {
      alert('Please enter answer C for the four-option question.');
      return;
    }
    if (four && questionOption4 === '') {
      alert('Please enter answer D for the four-option question.');
      return;
    }
    if (!isNumber(questionAnswer)) {
      alert('Please select the answer for the question.');
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

  // save question data and go to the next question by adding question
  const AddQuestion = async () => {
    if (questionQuestion === '') {
      alert('Please enter the question.');
      return;
    }
    if (questionOption1 === '') {
      alert('Please enter answer A.');
      return;
    }
    if (questionOption2 === '') {
      alert('Please enter answer B.');
      return;
    }
    if (four && questionOption3 === '') {
      alert('Please enter answer C for the four-option question.');
      return;
    }
    if (four && questionOption4 === '') {
      alert('Please enter answer D for the four-option question.');
      return;
    }
    if (!isNumber(questionAnswer)) {
      alert('Please select the answer for the question.');
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
    history.push(`/question/${quizId}`);
  };
  
  // update question and save all the updated question
  const updatequestionData = async () => {
    if (questionQuestion === '') {
      alert('Please enter the question.');
      return;
    }
    if (questionOption1 === '') {
      alert('Please enter answer A.');
      return;
    }
    if (questionOption2 === '') {
      alert('Please enter answer B.');
      return;
    }
    if (four && questionOption3 === '') {
      alert('Please enter answer C for the four-option question.');
      return;
    }
    if (four && questionOption4 === '') {
      alert('Please enter answer D for the four-option question.');
      return;
    }
    if (!isNumber(questionAnswer)) {
      alert('Please select the answer for the question.');
      return;
    }
    await axios.put(
      process.env.NODE_ENV === 'production'
        ? `/api/question/detail/${questionData._id}`
        : `http://localhost:4000/api/question/detail/${questionData._id}`,
      {
        _id: questionData._id,
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
    // history.push(`/question/detail/${questionData._id}`);
    history.push(`/quiz/detail/${quizId}`);
  };

  // update question and go to the next question
  const nextQuestion = async () => {
    if (changed) {
      // console.log('edited');
      if (questionQuestion === '') {
        alert('Please enter the question.');
        return;
      }
      if (questionOption1 === '') {
        alert('Please enter answer A.');
        return;
      }
      if (questionOption2 === '') {
        alert('Please enter answer B.');
        return;
      }
      if (four && questionOption3 === '') {
        alert('Please enter answer C for the four-option question.');
        return;
      }
      if (four && questionOption4 === '') {
        alert('Please enter answer D for the four-option question.');
        return;
      }
      if (!isNumber(questionAnswer)) {
        alert('Please select the answer for the question.');
        return;
      }
      await axios.put(
        process.env.NODE_ENV === 'production'
          ? `/api/question/detail/${questionData._id}`
          : `http://localhost:4000/api/question/detail/${questionData._id}`,
        {
          _id: questionData._id,
          questionNumber,
          questionQuestion,
          questionOption1,
          questionOption2,
          questionOption3,
          questionOption4,
          questionAnswer,
        }
      );
    }
    // setQuestionVisible(false);
    fetchData();
    const next_id = questionArray[questionNumber];
    // console.log('next_id', next_id);
    history.push(`/question/detail/${next_id}`);
  };

  // update question and go to the previous question
  const previousQuestion = async () => {
    if (changed){
      // console.log('edited');
      if (questionQuestion === '') {
        alert('Please enter the question.');
        return;
      }
      if (questionOption1 === '') {
        alert('Please enter answer A.');
        return;
      }
      if (questionOption2 === '') {
        alert('Please enter answer B.');
        return;
      }
      if (four && questionOption3 === '') {
        alert('Please enter answer C for the four-option question.');
        return;
      }
      if (four && questionOption4 === '') {
        alert('Please enter answer D for the four-option question.');
        return;
      }
      if (!isNumber(questionAnswer)) {
        alert('Please select the answer for the question.');
        return;
      }
      await axios.put(
        process.env.NODE_ENV === 'production'
          ? `/api/question/detail/${questionData._id}`
          : `http://localhost:4000/api/question/detail/${questionData._id}`,
        {
          _id: questionData._id,
          questionNumber,
          questionQuestion,
          questionOption1,
          questionOption2,
          questionOption3,
          questionOption4,
          questionAnswer,
        }
      );
    }
    // setQuestionVisible(false);
    fetchData();
    const prev_id = questionArray[questionNumber-2];
    // console.log('prev_id', prev_id);
    history.push(`/question/detail/${prev_id}`);
  };

  const deletequestionData = async () => {
    // TODO: after deleting question, update the index for the question after current question
    // question number: x, index in array: x - 1, shifting from: x (x -> x-1)
    await axios.delete(
      process.env.NODE_ENV === 'production'
        ? `/api/question/detail/${questionData._id}`
        : `http://localhost:4000/api/question/detail/${questionData._id}`
    );
    // moveIndex();
    setQuestionVisible(false);
    fetchData();
    history.push(`/quiz/detail/${quizId}`);
  };

  // const moveIndex = async () => {
  //   for (let i = questionNumber; i < questionArray.length; i ++) {
  //     await axios.put(
  //       process.env.NODE_ENV === 'production'
  //         ? `/api/question/detail_num/${questionArray[i]}`
  //         : `http://localhost:4000/api/question/detail_num/${questionArray[i]}`,
  //       {
  //         _id: questionArray[i],
  //         questionNumber: i-1,
  //       }
  //     );
  //   }
  // }

  const optionNumberSetting = () => {
    setChanged(true);
    if (four) {
      // four -> two
      setFour(false);
      setQuestionOption3('');
      setQuestionOption4('');
      if (questionAnswer == 3 || questionAnswer == 4) {
        setQuetsionAnswer('');
      }
    } else {
      // two -> four
      setFour(true);
    }
  }

  const setTrueFalse = () => {
    setChanged(true);
    if (tf) {
      // unselect
      setTf(false);
      setQuestionOption1(tem1);
      setQuestionOption2(tem2);
      // setTem1('');
      // setTem2('');
    } else {
      // set it to true-false question
      setTf(true);
      setFour(false);
      setQuestionOption3('');
      setQuestionOption4('');
      if (questionAnswer == 3 || questionAnswer == 4) {
        setQuetsionAnswer('');
      }
      setTem1(questionOption1);
      setTem2(questionOption2);
      setQuestionOption1('True');
      setQuestionOption2('False');
    }
  }

  if (questionData === undefined) {
    // add new question
    return (
      <div className='write'>
        <Card
          sx={{
            borderRadius: '18px',
            minWidth: '900px',
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
            <FormControl sx={{ paddingLeft: '40px' }}>
              <Tooltip placement='right' title={ four ? 'Two-option question' : 'Four-option question'}>
                <FormControlLabel control={<Checkbox size='small' checked={tf} onChange={setTrueFalse}/>} label={<Typography sx={{ fontSize: '18px' }}>This is a True or False question.</Typography>} />
              </Tooltip>
            </FormControl>
            <TextField
              required
              autoFocus
              // fullWidth
              margin='dense'
              label='A'
              type='text'
              placeholder='Add answer A'
              value={tf ? 'True' : questionOption1}
              onChange={(e) => setQuestionOption1(e.target.value)}
              // sx={{ m: 3 }}
            />
            <TextField
              required
              autoFocus
              // fullWidth
              margin='dense'
              label='B'
              type='text'
              placeholder='Add answer B'
              value={tf ? 'False' : questionOption2}
              onChange={(e) => setQuestionOption2(e.target.value)}
              // sx={{ m: 3 }}
            />
            <Grid item alignSelf='center'>
              <Tooltip placement='right' title={ four ? 'Two-option question' : 'Four-option question'}>
                <IconButton onClick={optionNumberSetting}>
                  { four ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                </IconButton>
              </Tooltip>
            </Grid>
            { four ?
              <TextField
                required
                autoFocus
                // fullWidth
                margin='dense'
                label='C'
                type='text'
                placeholder='Add answer C'
                value={questionOption3}
                onChange={(e) => setQuestionOption3(e.target.value)}
                // sx={{ m: 3 }}
              /> : null }
            { four ? 
              <TextField
                required
                autoFocus
                // fullWidth
                margin='dense'
                label='D'
                type='text'
                placeholder='Add answer D'
                value={questionOption4}
                onChange={(e) => setQuestionOption4(e.target.value)}
                // sx={{ m: 3 }}
              /> : null }
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <InputLabel>Answer *</InputLabel>
              <Select
                value={questionAnswer}
                label='Answer *'
                onChange={(e) => setQuetsionAnswer(e.target.value)}
              >
                <MenuItem value={1}>A</MenuItem>
                <MenuItem value={2}>B</MenuItem>
                { four ? <MenuItem value={3}>C</MenuItem> : null}
                { four ? <MenuItem value={4}>D</MenuItem> : null}
              </Select>
            </FormControl>
            <Grid
              container
              justifyContent='flex-end'
              spacing={2}
              sx={{ padding: '25px' }}
            >
              <Grid item>
                <Tooltip title='Create one question'>
                  <Button variant='contained' onClick={createquestionData}>
                    Create
                  </Button>
                </Tooltip>
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
        <Tooltip title='Add more questions'>
          <Fab onClick={AddQuestion} sx={{ position: 'absolute', right: '5%' }}>
            <AddRoundedIcon />
          </Fab>
        </Tooltip>
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
        <Card
          sx={{
            borderRadius: '18px',
            minWidth: '900px',
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
                value={questionQuestion}
                placeholder='Enter the question...'
                onChange={(e) => { 
                  setChanged(true);
                  setQuestionQuestion(e.target.value);
                }}
              />
            </Box>
            <FormControl sx={{ paddingLeft: '40px' }}>
              <Tooltip placement='right' title={ four ? 'Two-option question' : 'Four-option question'}>
                <FormControlLabel control={<Checkbox size='small' checked={tf} onChange={setTrueFalse}/>} label={<Typography sx={{ fontSize: '18px' }}>This is a True or False question.</Typography>} />
              </Tooltip>
            </FormControl>
            <TextField
              required
              autoFocus
              // fullWidth
              margin='dense'
              label='A'
              type='text'
              placeholder='Add answer A'
              value={tf ? 'True' : questionOption1}
              onChange={(e) => {
                setChanged(true);
                setQuestionOption1(e.target.value);
              }}
              // sx={{ m: 3 }}
            />
            <TextField
              required
              autoFocus
              // fullWidth
              margin='dense'
              label='B'
              type='text'
              placeholder='Add answer B'
              value={tf ? 'False' : questionOption2}
              onChange={(e) => {
                setChanged(true);
                setQuestionOption2(e.target.value);
              }}
              // sx={{ m: 3 }}
            />
            <Grid item alignSelf='center'>
              <Tooltip placement='right' title={ four ? 'Two-option question' : 'Four-option question'}>
                <IconButton onClick={optionNumberSetting}>
                  { four ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                </IconButton>
              </Tooltip>
            </Grid>
            {four ?
              <TextField
                autoFocus
                required
                // fullWidth
                margin='dense'
                label='C'
                type='text'
                placeholder='Add answer C'
                value={questionOption3}
                onChange={(e) => {
                  setChanged(true);
                  setQuestionOption3(e.target.value);
                }}
                // sx={{ m: 3 }}
              /> : null }
            {four ? 
              <TextField
                autoFocus
                // fullWidth
                required
                margin='dense'
                label='D'
                type='text'
                placeholder='Add answer D'
                value={questionOption4}
                onChange={(e) => {
                  setChanged(true);
                  setQuestionOption4(e.target.value);
                }}
                // sx={{ m: 3 }}
              /> : null }
            <FormControl fullWidth sx={{ marginTop: '10px' }}>
              <InputLabel>Answer *</InputLabel>
              <Select
                value={questionAnswer}
                label='Answer *'
                onChange={(e) => {
                  setChanged(true);
                  setQuetsionAnswer(e.target.value);
                }}
              >
                <MenuItem value={1}>A</MenuItem>
                <MenuItem value={2}>B</MenuItem>
                { four ? <MenuItem value={3}>C</MenuItem> : null }
                { four ? <MenuItem value={4}>D</MenuItem> : null }
              </Select>
            </FormControl>
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
                Save
              </Button>
            </Grid>
          </Grid>
          </Grid>
        </Card>
        { firstQuestion ?
          null
          :
          <Fab onClick={previousQuestion} sx={{ position: 'absolute', left: '5%' }}>
            <ArrowBackIosRoundedIcon />
          </Fab>
        }
        { lastQuestion ? 
          null
          :
          <Fab onClick={nextQuestion} sx={{ position: 'absolute', right: '5%' }}>
            <ArrowForwardIosRoundedIcon />
          </Fab>
        }
      </div>
    );
  }
}

export default WriteQuestion;
