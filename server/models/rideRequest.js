import { rideRequests } from '../data';

export default class RideRequest {
  constructor(
    passengerLocation, destination,
    passengerId, rideOfferId,
    departTime,
    status = 'pending',
    id = (rideRequests.length + 1),
    seatNumber = null,
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
    startTime, passengerId, rideOfferId,
    departTime,
  }) {
    const rideRequest = new RideRequest(
      passengerLocation, destination,
      startTime, passengerId, rideOfferId,
      departTime,
    );
    rideRequests.push(rideRequest);
    return rideRequest;
  }

  static all() {
    return rideRequests;
  }
}
