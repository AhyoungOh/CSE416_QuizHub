import {
    CONSUMER_UPDATE_REQUEST, 
    CONSUMER_UPDATE_SUCCESS,
    CONSUMER_UPDATE_FAIL
} from '../../actions/actionTypes';

const updateConsumerReducer = (state = {}, action) => {
    switch(action.type){
        case CONSUMER_UPDATE_REQUEST:
            return{
                loading: true,
            };
        case CONSUMER_UPDATE_SUCCESS:
            return{
                consumer: action.payload,
                loading: false,
                success: true,
            };
        
        case CONSUMER_UPDATE_FAIL:
            return{
                error: action.payload,
                loading: false,
            };
        default: 
            return state;
    }
};

export default updateConsumerReducer;