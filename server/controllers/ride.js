import { rideOffers, friends } from '../data';

import { RideOffer, RideRequest } from '../models';

export default class Ride {
  static rides(req) {
    const { decoded: { user, payload: { role, id } } } = req;
    if (role === 'Driver') {
      return rideOffers.filter(offer => offer.driverId === +id);
    }
    const driverFriends = friends
      .filter(friend => user.id === friend.passengerId)
      .map(obj => obj.driverId);

    return rideOffers.filter(offer => driverFriends.includes(offer.driverId));
  }

  static getRides(req, res) {
    const offers = Ride.rides(req);

    return res.status(200).send({
      rideOffers: offers,
    });
  }

  static getSingleRide(req, res) {
    const offers = Ride.rides(req);
    const { params: { rideId } } = req;
    const rideOffer = offers.find(obj => obj.id === +rideId);

    if (!rideOffer) {
      return res.status(404).send({
        msg: 'Requested resource not available',
      });
    }
    return res.status(200).send({
      rideOffer,
    });
  }

  static createRide(req, res) {
    const { decoded: { payload: { role } } } = req;

    if (role === 'Passenger') {
      return res.status(401).send({
        msg: 'Action not available to passenger accounts',
      });
    }

    const rideOffer = RideOffer.create({ ...req.body, driverId: +req.decoded.payload.id });
    return res.status(201).send({ rideOffer });
  }

  static request(req, res) {
    const { decoded: { payload: { id: passengerId } } } = req;


    const rideRequest = RideRequest.create({
      ...req.body,
      rideOfferId: +req.params.rideId,
      passengerId,
    });

    if (!rideRequest) {
      return res.status(400).send({
        msg: `You have already requested for rideOffer ${req.params.rideId}`,
      });
    }

    return res.status(201).send({
      rideRequest,
    });
  }
}
