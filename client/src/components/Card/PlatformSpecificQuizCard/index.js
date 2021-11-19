// Platform Specific Quiz Card: display on platform page (CreatorQuiz)
import {
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';

function PlatformSpecificQuizCard({
  quizName,
  quizDescription,
  quizImage,
  quizQuestions,
  clickAction,
}) {
  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardActionArea onClick={clickAction}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component='h2' variant='h5'>
                {quizName}
              </Typography>
              <Typography variant='subtitle1' color='text.secondary'>
                {/* date */}
              </Typography>
              <div className='question'>
                It has {quizQuestions.length} questions
              </div>
              <Typography variant='subtitle1' paragraph>
                {quizDescription}
              </Typography>
              {/* <Typography variant="subtitle1" color="primary">
                            Continue reading...
                            </Typography> */}
            </CardContent>
            <CardMedia
              component='img'
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={quizImage}
              alt={quizName}
            />
          </Card>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default PlatformSpecificQuizCard;
