import db from '../db';

export default (req, res, next) => {
  if (!+req.params.rideId) {
    return next('route');
  }
  const rideId = +req.params.rideId;
  const query = {
    text: 'select * from rides',
  };
  return db.query(query, (error, response) => {
    if (error) return next(error);
    const rides = response.rows;
    const rideOffer = rides.find(ride => ride.id === rideId);
    if (!rideOffer) {
      const notFound = Error('Requested resource not found');
      notFound.status = 404;
      return next(notFound);
    }
    return res.status(200).json({
      ride: rideOffer,
    });
  });
};
