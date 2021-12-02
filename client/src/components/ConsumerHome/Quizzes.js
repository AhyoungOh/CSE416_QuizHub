import useApiCall from '../../hooks/useApiCall';
import BrowseQuizCard from '../Card/BrowseQuizCard';
import { Grid } from '@mui/material';

export default function Quizzes({ searchWord, searchType }) {
  const [loading, payload, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/quiz`
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
      // TODO: alphabetical order
      return (
        <Grid item key={data.quizName}>
          {' '}
          <BrowseQuizCard quizData={data} />{' '}
        </Grid>
      );
    });
  return (
    <div>
      <Grid container spacing={3} justifyContent='center'>
        {QuizCardList}
      </Grid>
    </div>
  );
}
