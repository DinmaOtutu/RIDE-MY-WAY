import driver from './driver';
import friend from './friend';
import passenger from './passenger';
import rideOffer from './rideOffer';
import rideRequest from './rideRequest';

export default {
  [driver.name]: driver,
  [friend.name]: friend,
  [passenger.name]: passenger,
  [rideOffer.name]: rideOffer,
  [rideRequest.name]: rideRequest,
};
