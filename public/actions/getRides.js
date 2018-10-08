import axios from 'axios';
import alertify from 'alertify.js';
import config from '../config';
import { GET_ALL_RIDES_SUCCESS, GET_ALL_RIDES_ERROR } from './types';

export const getAllRides = rides => ({
  type: GET_ALL_RIDES_SUCCESS,
  rides,
});

export const getAllRidesError = () => ({
  type: GET_ALL_RIDES_ERROR,
});

const getAllRidesAction = () => dispatch =>
  axios.get(`${config.apiUrl}/api/v1/rides`).then((response) => {
    dispatch(getAllRides(response.data));
    alertify.delay(2000);
    alertify.logPosition('buttom right');
    alertify.success(response.data.message);
  }).catch((error) => {
    console.log(error.response);
  });

export default getAllRidesAction;
