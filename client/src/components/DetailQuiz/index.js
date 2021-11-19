import Quiz from '../Quiz';
import Question from '../Question';
import { Link, useHistory } from 'react-router-dom';

function DetailQuiz({ quizData, setQuizVisible }) {
  const owned = [];
  const history = useHistory();
  for (let i = 0; i < Object.keys(quizData.quizQuestions).length; i++) {
    owned.push(quizData.quizQuestions[i].questionQuestion + ', ');
  }
  const QuestionComponents = quizData.quizQuestions.map((questionData) => {
    return (
      <Question
        questionNumber={questionData.questionNumber}
        questionQuestion={questionData.questionQuestion}
        questionAnswer={questionData.questionAnswer}
        questionOptions={questionData.questionOptions}
        setquestionData={() => {
          history.push(`/question/detail/${questionData._id}`);
        }}
      />
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
  console.log('quiz questions', quizData);
  return (
    <div>
      <button
        onClick={() => {
          history.push(`/creatorHome/${quizData.platformId}`);
        }}
      >
        Back to Quiz List
      </button>
      <Quiz
        quizName={quizData.quizName}
        quizDescription={quizData.quizDescription}
        quizImage={quizData.quizImage}
        quizQuestions={quizData.quizQuestions}
      />
      <div className='detail-content'>
        <div className='quizlist'>{QuestionComponents}</div>
        <div className='buttons'>
          <button onClick={updateQuizData}>Edit Quiz</button>
          <button onClick={updateQuestionData}>Add Quesiton</button>
        </div>
      </div>
    </div>
  );
}

export default DetailQuiz;
