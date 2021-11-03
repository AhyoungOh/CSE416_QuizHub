import axios from 'axios';
import {
    CONSUMER_UPDATE_REQUEST,
    CONSUMER_UPDATE_SUCCESS,
    CONSUMER_UPDATE_FAIL,
    FETCH_CONSUMER_REQUEST,
    FETCH_CONSUMER_SUCCESS,
    FETCH_CONSUMER_FAIL,
    CONSUMER_PROFILE_REQUEST,
    CONSUMER_PROFILE_SUCCESS,
    CONSUMER_PROFILE_FAIL
} from '../actionTypes';

export const fetchConsumerProfile = (id, consumerData) => {
    return async dispatch => {
        try {
          dispatch({
            type: CONSUMER_PROFILE_REQUEST,
            loading: true,
          });
          const config = {
            headers: {
              authorization: `Bearer ${userInfo.token}`,
            },
          };
          const { data } = await axios.get(`/api/player/${id}`, config);
          dispatch({
            type: CONSUMER_PROFILE_SUCCESS,
            payload: data,
          });
        } catch (error) {
          dispatch({
            type: CONSUMER_PROFILE_FAIL,
            payload: error.response && error.response.data.message,
          });
        }
    };
};

export const updateConsumerProfile = (id, consumerData) => {
    return async dispatch => {
        try {
            dispatch({
                type: CONSUMER_UPDATE_REQUEST,
                loading: true,
            });
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const { data } = await axios.put(`/api/player/${id}`);
            dispatch({
                type: CONSUMER_UPDATE_SUCCESS,
                payload: data,
            });
        } catch (error){
            dispatch({
                type: CONSUMER_UPDATE_FAIL,
                loading: false,
                error: error.response && error.response.data.message,
            });
        }
    }
}