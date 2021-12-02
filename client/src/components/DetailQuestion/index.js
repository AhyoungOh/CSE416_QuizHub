import Question from '../Question';
import { useHistory } from 'react-router-dom';
import { Grid, Button } from '@mui/material';

function DetailQuestion({ questiondata, setQuestionVisible }) {
  const history = useHistory();
  const updateQuestionData = () => {
    setQuestionVisible(true);
  };
  return (
    <div>
      <button
        onClick={() => history.push(`/quiz/detail/${questiondata.quizId}`)}
      >
        Back to Question List
      </button>
      {/* TODO: question edit card */}
      <Grid sx={{ padding: '20px' }}>
        <Question
          questionNumber={questiondata.questionNumber}
          questionQuestion={questiondata.questionQuestion}
          questionOptions={questiondata.questionOptions}
          questionAnswer={questiondata.questionAnswer}
        />
      </Grid>
      <Grid sx={{ paddingLeft: '20px' }}>
        <Button variant='contained' onClick={updateQuestionData}>
          Edit Question
        </Button>
      </Grid>
    </div>
  );
}

export default DetailQuestion;
