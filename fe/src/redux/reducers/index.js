// reducers/index.js
import { combineReducers } from 'redux';
import loggedInReducer from './loggedInReducer';

const rootReducer = combineReducers({
  isLoggedIn: loggedInReducer,
  // Add more reducers here
});

export default rootReducer;
