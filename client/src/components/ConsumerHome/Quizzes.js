import useApiCall from '../../hooks/useApiCall';
import BrowseQuizCard from '../Card/BrowseQuizCard';
import { Grid, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  loading: {
    display: 'flex',
    position: 'absolute',
    left: '50%',
    top: '50%',
  }
});

export default function Quizzes() {
  const classes = useStyles();
  const [loading, payload, error] = useApiCall(
    process.env.NODE_ENV === 'production'
      ? `/api/quiz`
      : `http://localhost:4000/api/quiz`
  );
  if (!payload) {
    return (
      <div>
        <CircularProgress color='inherit' className={classes.loading} />
      </div>
    );
  }
  if (loading) {
    return (
      <div>
        <CircularProgress color='inherit' className={classes.loading} />
      </div>
    );
  }
  if (error) {
    return <div>error...</div>;
  }

  const compareObjects = (a, b) => {
    const a_mod = a.toUpperCase();
    const b_mod = b.toUpperCase();

    if (a_mod < b_mod) {
      return -1;
    }
    if (a_mod > b_mod) {
      return 1;
    }
    return 0;
  };

  const quizData = payload.createQuiz;
  quizData.sort((a, b) => {
    return compareObjects(a.quizName, b.quizName);
  });

  const QuizCardList = quizData
    .filter((data) => {
      return data.quizQuestions.length >= 10;
    })
    .map((data) => {
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
