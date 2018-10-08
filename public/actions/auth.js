import axios from 'axios';
// import jwt from 'jsonwebtoken';
import { USER_LOGGED_IN, USER_SIGNUP, USER_LOGIN_ERROR, USER_SIGNUP_ERROR } from '../actions/types';
import setAuthorizationToken from '../utils/authorization';
import config from '../config/index';

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user,
});

export const userSignup = user => ({
  type: USER_SIGNUP,
  user,
});

export const login = loginDetails => dispatch => axios.post(`${config.apiUrl}/api/v1/auth/login`, loginDetails).then((response) => {
  const { token } = response.data;
  localStorage.setItem('JWT_TOKEN', token);
  setAuthorizationToken(token);
  dispatch(userLoggedIn(token));
  return response;
}).catch((error) => {
  dispatch({
    type: USER_LOGIN_ERROR,
    error: error.response.data,
  });
  return error;
});

export const signup = signupDetails => dispatch => axios.post(`${config.apiUrl}/api/v1/auth/signup`, signupDetails).then((response) => {
  const { token } = response.data;
  localStorage.setItem('JWT_TOKEN', token);
  setAuthorizationToken(token);
  dispatch(userSignup(response.data));
  return response;
}).catch((error) => {
  dispatch({
    type: USER_SIGNUP_ERROR,
    error: error.response.data,
  });
  return error;
});
