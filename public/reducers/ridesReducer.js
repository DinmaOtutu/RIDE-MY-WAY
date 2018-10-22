import {
  CREATE_RIDE_SUCCESS,
  CREATE_RIDE_FAILURE,
  GET_ALL_RIDES_SUCCESS,
  GET_ALL_RIDES_ERROR,
} from '../actions/types';

const initialState = {
  newRides: {},
  allRides: {},
  error: {},
};

export default function ridesReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CREATE_RIDE_SUCCESS:
      return { ...state, newRides: action.rides };
    case CREATE_RIDE_FAILURE:
      return { ...state, error: action.error };
    case GET_ALL_RIDES_SUCCESS:
      return { ...state, allRides: action.rides };

    default:
      return state;
  }
}
