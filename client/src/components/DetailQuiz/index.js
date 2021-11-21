import Quiz from '../Quiz';
import Question from '../Question';
import { Link, useHistory } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
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
  const classes = useStyles();
  for (let i = 0; i < Object.keys(quizData.quizQuestions).length; i++) {
    owned.push(quizData.quizQuestions[i].questionQuestion + ', ');
  }
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
        <Grid item>
          <Button variant='contained' onClick={updateQuestionData}>
            Add Quesiton
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailQuiz;
