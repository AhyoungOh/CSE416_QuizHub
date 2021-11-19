import './style.scss';
import { Link } from 'react-router-dom';

function QuestionContent({ questionQuestion, setQuestionVisible }) {
  const updateQuetsionData = () => {
    setQuestionVisible(true);
  };
  // const owned = [];
  // for (let i = 0; i < Object.keys(quizlist).length; i++) {
  //   owned.push(quizlist[i].quizName + ', ');
  // }
  // const ownedImg = [];
  // for (let i = 0; i < Object.keys(quizlist).length; i++) {
  //   ownedImg.push(quizlist[i].quizImg);
  // }
  return (
    <div className='detail-content'>
      <div className='content-title'>Question Description</div>
      <div className='content-text'>{questionQuestion}</div>
      <div className='buttons'>
        <button onClick={updateQuetsionData}>Edit Question</button>
      </div>
    </div>
  );
}

export default QuestionContent;
