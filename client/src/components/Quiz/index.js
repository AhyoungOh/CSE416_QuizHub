import { Grid, Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  imageStyle: {
    maxWidth: "200px",
  },
});

function Quiz({
  quizName,
  quizDescription,
  quizImage,
  quizQuestions,
  setquizData,
}) {
  const classes = useStyles();
  return (
    <div className='quiz' onClick={setquizData}>
      {/* TODO: make it into a list on the card */}
      <Grid container spacing={2} sx={{ m: 2 }}>
        <Grid item>
          <img alt={quizName} src={quizImage} className={classes.imageStyle}/>
        </Grid>
        <Grid item>
          <div className='quizname'>{quizName}</div>
          <div className='question'>It has {quizQuestions.length} questions</div>
          <div className='quizdescription'>{quizDescription}</div>
        </Grid>
      </Grid>
    </div>
  );
}
export default Quiz;
