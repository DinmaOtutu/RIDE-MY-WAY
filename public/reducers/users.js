import { USER_LOGGED_IN, USER_LOGIN_ERROR, USER_SIGNUP, USER_SIGNUP_ERROR } from '../actions/types';

const INITIAL_STATE = {
  user: {},
  error: {},
};
export default function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, user: action.user };
    case USER_LOGIN_ERROR:
      return { ...state, error: action.error };
    case USER_SIGNUP:
      return { ...state, user: action.user };
    case USER_SIGNUP_ERROR:
      return { ...state, error: action.error };
    default: return state;
  }
}
