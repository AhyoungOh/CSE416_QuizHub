import useApiCall from '../../../hooks/useApiCall';
import BrowseQuizCard from '../../Card/BrowseQuizCard';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  loading: {
    display: 'flex',
    position: 'absolute',
    left: '50%',
    top: '50%',
  }
});

export default function QuizzesResult({ searchWord, searchType }) {
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
  const quizData = payload.createQuiz;
  const QuizCardList = quizData
    .filter((data) => {
      if (searchWord === null) return true;

      if (searchType !== 'Quiz') return false;

      var quiz =
        data.quizQuestions.length >= 10 &&
        data.quizName.toUpperCase().includes(searchWord.toUpperCase());
      // return data.quizName.toUpperCase().includes(searchWord.toUpperCase());
      return quiz;
    })
    .map((data) => {
      return (
        <Grid item key={data.quizName}>
          {' '}
          <BrowseQuizCard quizData={data} />{' '}
        </Grid>
      );
    });

  const countResult = quizData.filter((data) => {
    if (searchWord === null) return true;

    if (searchType !== 'Quiz') {
      console.log('return false');
      return false;
    }
    var quiz =
      data.quizQuestions.length >= 10 &&
      data.quizName.toUpperCase().includes(searchWord.toUpperCase());
    // return data.quizName.toUpperCase().includes(searchWord.toUpperCase());
    return quiz;
  });

  // console.log('quizzes countResult', countResult == true);
  // console.log('searchType', searchType);
  return (
    <div>
      {countResult.length !== 0 ? (
        <div>
          <Grid
            container
            justifyContent='center'
            sx={{ paddingBottom: '20px' }}
          >
            {countResult.length == 1 ? (
              <Typography>{countResult.length} quiz</Typography>
            ) : (
              <Typography>{countResult.length} quizzes</Typography>
            )}
          </Grid>
          <Grid
            container
            spacing={3}
            justifyContent='center'
            sx={{ paddingLeft: '20px', paddingRight: '20px' }}
          >
            {QuizCardList}
          </Grid>
        </div>
      ) : (
        <Grid container justifyContent='center'>
          {searchType == 'Quiz' ? (
            <Typography>No result found</Typography>
          ) : (
            <div></div>
          )}
        </Grid>
      )}
    </div>
  );
}
