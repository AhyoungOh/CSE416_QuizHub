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
  // quizQuestions,
  clickAction,
  quizCreatedDate
}) {
  return (
    <Grid item xs={12} md={4}>
      <Card sx={{ borderRadius: '18px' }}>
        <CardActionArea onClick={clickAction}>
          <Card sx={{ display: 'flex', minHeight: '250px' }}>
            <CardMedia
                component='img'
                sx={{ width: 250, display: { xs: 'none', sm: 'block' } }}
                image={quizImage}
                alt={quizName}
              />
            <CardContent sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '30px' }}>
                {quizName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                {quizCreatedDate.slice(0, 10)}
              </Typography>
              <Typography variant='body1' paragraph>
                {quizDescription}
              </Typography>
            </CardContent>
          </Card>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default PlatformSpecificQuizCard;
