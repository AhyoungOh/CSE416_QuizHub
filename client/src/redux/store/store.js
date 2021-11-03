import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import all the reducers
import createdQuizReducer from '../reducers/quiz/createdQuizReducer';
import updateConsumerReducer from '../reducers/consumer/updateConsumerReducer';

// put middlewares into an array
const middlewares = [thunk];

const reducer = combineReducers({
    bookCreated: createdQuizReducer,
    consumerUpdated: updateConsumerReducer,
});



// create store
const store = createStore(
    reducer,
    // initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;