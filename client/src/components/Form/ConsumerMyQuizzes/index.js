import axios from 'axios';
import { useContext, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';
import {
  FormGroup,
  Switch,
  FormControlLabel,
  stepIconClasses,
} from '@mui/material';

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
      {quiz_arr.map((value, index) => (
        <>
          <img src={value.quizImage} width='200' height='200'></img>
          <div>{value.quizName}</div>
        </>
      ))}
    </div>
  );
}

export default ConsumerMyQuizzes;
