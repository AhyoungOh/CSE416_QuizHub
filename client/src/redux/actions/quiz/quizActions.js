import axios from 'axios';
import { CREATE_QUIZ_REQUEST } from '../actionTypes';

export const createQuiz = quizData => {
    return async dispatch => {
        try {
            dispatch({
              type: CREATE_QUIZ_REQUEST,
              loading: true,
            });
            const config = {
              headers: {
                'Content-Type': 'application/json',
              },
            }
            // making post request
            const { data } = await axios.post('/api/quiz', bookData, config);
            dispatch({
              type: CREATE_QUIZ_SUCCESS,
              // specify what comes back from the action call
              payload: data,
            });
        } catch (error) {
            dispatch({
              type: CREATE_QUIZ_FAIL,
              error: error.response && error.response.data.message,
            });
        }
    };
};