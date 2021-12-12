import axios from 'axios';
import { useContext, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import { Grid, Typography, Card, CardActionArea, CardContent } from '@mui/material';

function ConsumerMyQuizzes() {
  const [quiz_arr, setQuizArr] = useState([]);
  const getQuizId = async () => {
    // try {
    const userInfo = await axios.get(
      process.env.NODE_ENV === 'production'
        ? `/api/auth`
        : `http://localhost:4000/api/auth`,
      { withCredentials: true }
    );
    const quizzes = userInfo.data.consumer.consumerQuizHistoryList;
    for (const quiz of quizzes) {
      getQuiz(quiz.quizId);
    }
    // for (const element of userInfo.data.consumer.badges) {
    //   console.log(element.badgeId);
    //   getBadge(element.badgeId);
    // }
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const getQuiz = async (quiz_id) => {
    try {
      await axios
        .get(
          process.env.NODE_ENV == 'production'
            ? `/api/quiz/detail/${quiz_id}`
            : `http://localhost:4000/api/quiz/detail/${quiz_id}`
        )
        .then((response) => {
          setQuizArr((arr) => [...arr, response.data.quiz]);
        });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getQuizId();
  }, []);

  return (
    <div>
      <Grid container justifyContent='center' spacing={2} sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
        {quiz_arr.map((value, index) => (
          <Grid item>
            <Card>
              <CardActionArea>
                <Grid container direction='column' alignItems='center'>
                  <Grid item>
                    <a href={`/record/${value._id}`}>
                      <img src={value.quizImage} width='200' height='200'></img>
                    </a>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ paddingTop: '5px', paddingBottom: '5px' }}>{value.quizName}</Typography>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default ConsumerMyQuizzes;
