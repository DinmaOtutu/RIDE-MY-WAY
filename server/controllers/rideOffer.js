import rideOffers from '../model/rideOffers';

export const getAllRides = (req, res) => {
  res.status(200).json({
    message: 'handling GET request to /rides',
    rides: rideOffers
  });
};

