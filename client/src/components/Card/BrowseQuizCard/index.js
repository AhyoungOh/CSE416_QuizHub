import { useHistory } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  title: {
    // fontFamily: 'Roboto',
    // fontFamily: 'Varela Round',
    fontWeight: 'bold',
  },
  card: {
    width: '300px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'row',
  },
  cardContent: {
    paddingLeft: '20px',
  },
  cardMedia: {
    width: '300px',
    maxHeight: '250px',
  },
});

export default function BrowseQuizCard({ quizData }) {
  const classes = useStyles();
  const history = useHistory();

  // console.log('quizData.quizImage');
  // console.log(quizData.quizImage);

  const img = './primary_default.png';

  return (
    <div>
      {/* TODO: redesign it, scale it down */}
      <Card className={classes.card}>
        <CardActionArea
          onClick={() => {
            history.push(`/consumerquizpreview/${quizData._id}`);
            //history.push('/consumerquizpreview/:',{id:quizData._id})
          }}
        >
          <Box xs={{ display: 'flex', flexDirection: 'column' }}>
            <CardMedia
              component='img'
              image={quizData.quizImage.length > 10 ? quizData.quizImage : img}
              alt=''
              className={classes.cardMedia}
            />
            <CardContent className={classes.cardContent}>
              <Typography
                component='div'
                variant='h5'
                className={classes.title}
              >
                {quizData.quizName}
              </Typography>
              {/* <Typography variant='subtitle1' color='text.secondary' component='div'>
                                {quizData.quizDescription}
                            </Typography> */}
              <Typography variant='subtitble1' color='text.secondary'>
                {quizData.createdDate.slice(0, 10)}
              </Typography>
            </CardContent>
          </Box>
        </CardActionArea>
      </Card>
    </div>
  );
}
