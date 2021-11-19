import Question from '../Question';
import { useHistory } from 'react-router-dom';

function DetailQuestion({ questiondata, setQuestionVisible }) {
  const history = useHistory();
  const updateQuetsionData = () => {
    setQuestionVisible(true);
  };
  return (
    <div>
      {/* <button
        onClick={() => history.push(`/quiz/detail/${questiondata.quizId}`)}
      >
        Back to Question List
      </button> */}
      <Question
        questionNumber={questiondata.questionNumber}
        questionQuestion={questiondata.questionQuestion}
        questionOptions={questiondata.questionOptions}
        questionAnswer={questiondata.questionAnswer}
      />
      <button onClick={updateQuetsionData}>Edit Question</button>
    </div>
  );
}

export default DetailQuestion;
