import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export default function SingleQuizCard({ quizData }) {
  const history = useHistory();
  return (
    <div class='card' style={{ width: '18rem' }}>
      <img src={quizData.platformImage} class='card-img-top' alt='...' />
      <div class='card-body'>
        <h5 class='card-title'>{quizData.quizName}</h5>
        <p class='card-text'>{quizData.quizDescription}</p>
        <p class='card-text'>
          {quizData.quizTimeLimit?.minutes} :{quizData.quizTimeLimit?.seconds}
        </p>
        <p class='card-text'>{quizData.createdDate}</p>
        <Button
          onClick={() => {
            history.push(`/consumerquizpreview/${quizData._id}`);
            //history.push("/consumerquizpreview/:",{id:quizData._id})
          }}
        >
          Preview Quiz
        </Button>
      </div>
    </div>
  );
}
