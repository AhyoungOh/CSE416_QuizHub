import SingleQuizCard from './SingleQuizCard';
import useApiCall from '../../hooks/useApiCall';

export default function Quizzes({ searchWord, searchType }) {
  const [loading, payload, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `${process.env.REACT_APP_API_SERVER}/api/quiz`
      : `http://localhost:4000/api/quiz`
  );
  if (!payload) {
    return <div>No Data</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error...</div>;
  }
  const quizData = payload.createQuiz;
  const QuizCardList = quizData
    .filter((data) => {
      if (searchWord === null) return true;

      if (searchType !== 'Quiz') return false;

      return data.quizName.toUpperCase().includes(searchWord.toUpperCase());
    })
    .map((data) => {
      return <SingleQuizCard quizData={data} />;
    });
  return <div>{QuizCardList}</div>;
}
