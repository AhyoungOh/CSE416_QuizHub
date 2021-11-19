import './style.scss';
import { Link } from 'react-router-dom';

function QuizContent({ quizDescription, quizQuestions, setQuizVisible }) {
  const updateQuizData = () => {
    setQuizVisible(true);
  };
  const owned = [];
  for (let i = 0; i < Object.keys(quizQuestions).length; i++) {
    owned.push(quizQuestions[i].questionQuestion + ', ');
  }
  const questionNumber = [];
  for (let i = 0; i < Object.keys(quizQuestions).length; i++) {
    questionNumber.push(quizQuestions[i].quesitonNumber);
  }
  return (
    <div className='detail-content'>
      <div className='content-title'>Quiz Description</div>
      <div className='content-text'>{quizDescription}</div>
      <div className='quizlist'>
        This Quiz has question: {owned}
        <Link to='/question'>More</Link>
      </div>
      <div className='buttons'>
        <button onClick={updateQuizData}>Edit Quiz</button>
      </div>
    </div>
  );
}

export default QuizContent;
