// TODO: add another type of display for question edit
import { Grid, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  buttonsContainer: {
    paddingTop: '20px',
    paddingBottom: '20px',
  }
});

function Question({
  questionNumber,
  questionQuestion,
  questionAnswer,
  questionOptions,
  setquestionData,
}) {
  const classes = useStyles();
  return (
    <div className='question'>
      <Grid container>
        <Grid item sx={{ minWidth: '800px' }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreRoundedIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography onClick={setquestionData}>{questionNumber}: {questionQuestion}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {questionOptions}
              </Typography>
              <Typography>
                Question Answer: {questionAnswer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
}

export default Question;
