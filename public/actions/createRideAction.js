import axios from 'axios';
import toastr from 'toastr';
import alertify from 'alertify.js';
import { CREATE_RIDE_SUCCESS, CREATE_RIDE_FAILURE } from './types';
import config from '../config';


export const createRide = () => ({
  type: CREATE_RIDE_SUCCESS,
});

export const rideFailure = () => ({
  type: CREATE_RIDE_FAILURE,
});
const createRideAction = rideDetails =>
  dispatch =>
    axios.post(`${config.apiUrl}/api/v1/users/rides`, rideDetails)
      .then((response) => {
        dispatch(createRide(response.data));
        alertify.delay(2000);
        alertify.logPosition('buttom right');
        alertify.success(response.data.message);
      })
      .catch((error) => {
      console.log(error.response.data.message, 'jhereyyyyyyyyy')
        dispatch(rideFailure(error.response.data));
        alertify.delay(3000);
        alertify.logPosition('buttom right');
        alertify.error(error.response.data.message);
      });

export default createRideAction;

