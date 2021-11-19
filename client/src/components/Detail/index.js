import Platform from '../Platform';
import PlatformSpecificQuizCard from '../../components/Card/PlatformSpecificQuizCard';
import { Link, useHistory } from 'react-router-dom';

function Detail({ platformData, setVisible }) {
  const owned = [];
  const history = useHistory();
  for (let i = 0; i < Object.keys(platformData.ownedQuizzes).length; i++) {
    owned.push(platformData.ownedQuizzes[i].quizName + ', ');
  }
  const QuizComponents = platformData.ownedQuizzes.map((quizData) => {
    return (
      <PlatformSpecificQuizCard
        quizData={quizData}
        quizName={quizData.quizName}
        quizDescription={quizData.quizDescription}
        quizImage={quizData.quizImage}
        quizQuestions={quizData.quizQuestions}
        clickAction={() => {
          history.push(`/quiz/detail/${quizData._id}`);
        }}
      />
    );
  });
  const updatePlatformData = () => {
    setVisible(true);
  };
  const updateQuizData = () => {
    history.push(`/quiz/${platformData._id}`);
  };
  return (
    <div>
      {/* change it to only image, name, description */}
      <button
        onClick={() => {
          history.push('/creatorHome');
        }}
      >
        Back to Platform List
      </button>
      <Platform
        platformName={platformData.platformName}
        platformImage={platformData.platformImage}
        platformDescription={platformData.platformDescription}
      />
      {/* TODO: how to display the quiz here directly */}
      <div className='detail-content'>
        <div className='quizlist'> {QuizComponents}</div>
        <div className='buttons'>
          <button onClick={updatePlatformData}>Edit Platform</button>
          <button onClick={updateQuizData}>Add Quiz</button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
