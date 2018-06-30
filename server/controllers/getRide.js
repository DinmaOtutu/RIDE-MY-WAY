import rideOffers from '../model/rideOffers';

export default (req, res, next) => {
  if (!+req.params.rideId) {
    return next('route');
  }
  const rideOffer = rideOffers
    .find(offer =>
      offer.id === parseInt(req.params.rideId, 10));
  if (!rideOffer) {
    return res.status(400).json({
      message: 'Cannot get ride request',
    });
  }
  return res.status(200).json({
    rideOffer,
  });
};
