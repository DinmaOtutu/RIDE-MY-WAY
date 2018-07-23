import db from '../db';

export default (req, res, next) => {
  if (!+req.params.rideId) {
    return next('route');
  }
  const rideId = +req.params.rideId;
  const query = {
    text: `select concat_ws(
      ' ', firstname, lastname
    ) as driver_name, rides.*, cars.make as car_make,
    cars.model as car_model from 
    rides inner join users on rides.id = ${rideId} and 
    rides.user_id = users.id
    left outer join cars on users.car_id = cars.id
    LIMIT 1`,
  };
  return db.query(query, (error, response) => {
    if (error) return next(error);
    if (!response.rows.length) {
      const notFound = Error('Requested resource not found');
      notFound.status = 404;
      return next(notFound);
    }
    const ride = response.rows[0];
    return res.status(200).json({
      ride,
    });
  });
};
