import rideRequests from '../model/rideRequests';

import rideOffers from '../model/rideOffers';

export default (req, res) => {
  const type = (param, typeOf) => {
    if (typeof param !== typeOf) {
      throw Error(`${param} should be type ${typeOf}`);
    }
    return true;
  };

  const rideId = parseInt(req.params.rideId, 10);

  const {
    body: {
      destination,
      depart, date,
    },
  } = req;

  try {
    type(destination, 'string');
    type(depart, 'string');
    type(date, 'string');
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }

  const rideOffer = rideOffers.find(ride => ride.id === rideId);

  if (rideOffer) {
    const newRequest = {
      destination,
      depart,
      date,
      id: rideRequests.length + 1,
      offerId: rideId,
    };

    rideRequests.push(newRequest);

    return res.status(201).json({
      newRequest,
    });
  }

  return res.status(400).json({
    message: 'Ride not available',
  });
};
