import { rideOffers } from '../data';

export default class RideOffer {
  constructor(
    driverId, currentLocation,
    destination, startTime,
    route, seatsAvail, id = rideOffers.length + 1,
  ) {
    this.id = id;
    this.currentLocation = currentLocation;
    this.destination = destination;
    this.startTime = startTime;
    this.route = route;
    this.seatsAvail = seatsAvail;
    this.driverId = driverId;
  }

  static create({
    currentLocation, destination,
    startTime, route,
    seatsAvail, driverId,
  }) {
    const rideOffer = new RideOffer(
      currentLocation, destination,
      startTime, route,
      seatsAvail, driverId,
    );
    rideOffers.push(rideOffer);
    return rideOffer;
  }

  static all() {
    return rideOffers;
  }
}
