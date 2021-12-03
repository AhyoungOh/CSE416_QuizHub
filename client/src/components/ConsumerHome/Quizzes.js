import useApiCall from '../../hooks/useApiCall';
import BrowseQuizCard from '../Card/BrowseQuizCard';
import { Grid } from '@mui/material';

export default function Quizzes() {
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
      {/* TODO: add total __ result */}
      <Grid container spacing={3} justifyContent='center'>
        {QuizCardList}
      </Grid>
    </div>
  );
}
