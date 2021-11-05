import {
    CONSUMER_PROFILE_REQUEST,
    CONSUMER_PROFILE_SUCCESS,
    CONSUMER_PROFILE_FAIL
} from '../../actions/actionTypes';

const fetchConsumerReducer = (state = {}, action) => {
    switch(action.type){
        case CONSUMER_PROFILE_REQUEST:
            return{
                loading: true,
            }
        case CONSUMER_PROFILE_SUCCESS:
            return{
                loading: false,
                consumer: action.payload,
            }
        case CONSUMER_PROFILE_FAIL:
            return{
                loading: false,
                payload: action.payload,
            }
        default: 
            return state;
    }
};

export default fetchConsumerReducer;