import db from '../db';

// get all ride requests
export default (req, res, next) => {
  const query = {
    text: `select concat_ws(
      ' ', users.firstname, users.lastname
    ) as requester,
    concat_ws(
      ' ', owners.firstname, owners.lastname
    ) as ride_owner, owners.id as owner_id,
    requests.accepted,
    requests.id, requests.user_id as
    requester_id, requests.ride_id,
    rides.state_from, rides.state_to,
    rides.city_from, rides.city_to,
    rides.price, rides.departure_date,
    rides.departure_time, rides.pickup_location,
    cars.model as car_model,
    cars.make as car_make
    from requests
    inner join users on
    requests.user_id = users.id
    inner join rides
    on requests.ride_id = rides.id
    inner join users as owners
    on rides.user_id = owners.id
    left outer join cars
    on owners.car_id = cars.id`,
  };
  return db.query(query, (error, response) => {
    if (error) return next(error);
    const requests = response.rows;
    return res.status(200).send({
      requests,
    });
  });
};
