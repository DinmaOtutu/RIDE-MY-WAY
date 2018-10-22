import { combineReducers } from 'redux';
import userReducer from '../reducers/users';
import ridesReducer from '../reducers/ridesReducer';

export default combineReducers({
  userReducer,
  ridesReducer,
});
