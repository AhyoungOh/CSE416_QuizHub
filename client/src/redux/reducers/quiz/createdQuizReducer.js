import {
    CREATE_QUIZ_REQUEST,
    CREATE_QUIZ_SUCCESS,
    CREATE_QUIZ_FAIL
} from '../../actions/actionTypes';

const createdQuizReducer = (state = {}, action) => {
    switch(action.type){
        case CREATE_QUIZ_REQUEST:
            return {
                loading: true,
            };
        case CREATE_QUIZ_SUCCESS:
            // return the updated state
            return {
                quiz: action.payload,
            };
        case CREATE_QUIZ_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default { createdQuizReducer };