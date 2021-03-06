import Platform from '../Platform';
import PlatformSpecificQuizCard from '../Card/PlatformSpecificQuizCard';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Fab, Paper, Tooltip } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: '40px',
    paddingRight: '40px',
    paddingTop: '20px',
    paddingBottom: '40px',
  },
  gridContainerButtons: {
    padding: '10px',
  },
  fabStyle: {
    position: 'absolute',
    bottom: 20,
    left: 1500,
    padding: '10px',
  },
});

function Detail({ platformData, setVisible }) {
  const owned = [];
  const history = useHistory();
  const classes = useStyles();
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
        quizCreatedDate={quizData.createdDate}
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
      <Grid containter sx={{ paddingLeft: "10px", paddingTop: "70px" }}>
        <Button
          onClick={() => {
            history.push('/creatorHome');
          }}
          // startIcon={<KeyboardBackspaceRoundedIcon />}
          sx={{ color: "gray" }}
        >
          Back to homepage
        </Button>
      </Grid>
      <Platform
        platformName={platformData.platformName}
        platformImage={platformData.platformImage}
        platformDescription={platformData.platformDescription}
      />
      {/* <Grid container justifyContent='center' sx={{ paddingTop: '20px' }}>
        <Button variant='contained' color='inherit' onClick={updatePlatformData}>Edit Platform</Button>
      </Grid> */}
      <Grid container spacing={3} className={classes.gridContainer} alignItems="center">
        {QuizComponents}
        <Grid item>
          <Paper sx={{ borderRadius: '18px', minHeight: '250px', minWidth: '250px' }}>
            <Tooltip placement='top' title='Add a new quiz'>
              <Fab color="inherit" aria-label="add" onClick={updateQuizData} sx={{ m: '100px' }}>
                <AddIcon />
              </Fab>
            </Tooltip>
          </Paper>
        </Grid>
      </Grid>
      <Tooltip placement='top' title='Edit platform'>
        <Fab color="primary" aria-label="add" onClick={updatePlatformData} sx={{ position: 'fixed', right: '3%', bottom: '3%' }}>
          <EditRoundedIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default Detail;
