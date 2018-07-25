import db from '../db';

export default (req, res, next) => {
  if (!+req.params.rideId) {
    return next('route');
  }

  const {
    params: { rideId },
    decoded: { payload: { id: userId } },
  } = req;

  const query = {
    text: `update rides set deleted = true
    where rides.id = $1 
    and rides.user_id = $2 returning *`,
    values: [rideId, userId],
  };
  return db.query(query, (error, response) => {
    if (error) return next(error);
    if (!response.rows.length) {
      const fail = Error(`Delete failed. Ride ${rideId} not found or you do not own it`);
      fail.status = 404;
      return next(fail);
    }
    const deletedRide = response.rows[0];
    return res.status(200).json({
      deletedRide,
    });
  });
};
