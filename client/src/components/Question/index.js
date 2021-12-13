import { Grid, Link, Accordion, AccordionSummary, AccordionDetails, Typography, Tooltip } from '@mui/material';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import { makeStyles } from '@mui/styles';

function Question({
  questionNumber,
  questionQuestion,
  questionAnswer,
  questionOptions,
  setquestionData,
}) {
  // const classes = useStyles();
  return (
    <div className='question'>
      <Grid item>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreRoundedIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Tooltip placement='top' title='Go to question'>
              <Link color='common.black' underline='hover' sx={{ flexShrink: 0 }} onClick={setquestionData}>
                  {questionNumber}. {questionQuestion}
              </Link>
            </Tooltip>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction='column'>
              <Grid item>
                <Typography color={questionAnswer === 0 ? 'primary' : 'common.black'}>
                  A. {questionOptions[0]}
                </Typography>
              </Grid>
              <Grid item>
                <Typography color={questionAnswer === 1 ? 'primary' : 'common.black'}>
                  B. {questionOptions[1]}
                </Typography>
              </Grid>
              { questionOptions[2] !== '' ?
                <Grid item>
                  <Typography color={questionAnswer === 2 ? 'primary' : 'common.black'}>
                    C. {questionOptions[2]}
                  </Typography>
                </Grid> : null
              }
              { questionOptions[3] !== '' ?
                <Grid item>
                  <Typography color={questionAnswer === 3 ? 'primary' : 'common.black'}>
                    D. {questionOptions[3]}
                  </Typography>
                </Grid> : null
              }
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </div>
  );
}

export default Question;
