import { rideRequests } from '../data';

export default class RideRequest {
  constructor(
    passengerLocation, destination,
    passengerId, rideOfferId,
    departTime,
    seatNumber = null,
    status = 'pending',
    id = (rideRequests.length + 1),
  ) {
    this.passengerLocation = passengerLocation;
    this.destination = destination;
    this.id = id;
    this.passengerId = passengerId;
    this.rideOfferId = rideOfferId;
    this.departTime = departTime;
    this.status = status;
    this.seatNumber = seatNumber;
  }

  // static methods

  static create({
    passengerLocation, destination,
    passengerId, rideOfferId,
    departTime, seatNumber,
    status,
  }) {
    if (RideRequest.isUnique({ passengerId, rideOfferId })) {
      const rideRequest = new RideRequest(
        passengerLocation, destination,
        passengerId, rideOfferId,
        departTime, seatNumber,
        status,
      );
      rideRequests.push(rideRequest);
      return rideRequest;
    }
    return false;
  }

  static all() {
    return rideRequests;
  }

  static isUnique({ ...properties }) {
    if (RideRequest.findOne(properties)) {
      return false;
    }
    return true;
  }

  // eslint-disable-next-line consistent-return
  static findOne({
    ...all
  }) {
    const allRequests = RideRequest.all();

    return allRequests.find((request) => {
      let found = request;

      Object.keys(all).forEach((key) => {
        if (!request[key] || request[key] !== all[key]) {
          found = false;
        }
      });

      return found;
    });
  }
}
