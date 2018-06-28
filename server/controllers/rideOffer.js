import rideOffers from '../model/rideOffers';

export default (req, res) =>
  res.status(200).json({
    rideOffers,
  });

