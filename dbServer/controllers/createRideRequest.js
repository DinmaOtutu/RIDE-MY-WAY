import db from '../db';

export default (req, res, next) => {
  if (!+req.params.rideId) {
    return next('route');
  }
  const rideId = parseInt(req.params.rideId, 10);

  const {
    decoded: {
      payload: { id },
    },
  } = req;

  return db.connect((error, client, done) => {
    if (error) return next(error);
    const query = {
      text: `select * from rides where rides.id = $1 and
      rides.user_id != $2 LIMIT 1`,
      values: [rideId, id],
    };

    return client.query(query, (error1, response1) => {
      if (error1) return next(error1);
      if (!response1.rows.length) {
        const errorNoRide = Error(`Ride ${rideId} does not exist or is unavailable`);
        errorNoRide.status = 400;
        return next(errorNoRide);
      }
      const notUnique = {
        text: `select * from requests where requests.ride_id = $1 and
        requests.user_id = $2`,
        values: [rideId, id],
      };
      return client.query(notUnique, (error3, response3) => {
        if (error3) return next(error3);
        if (response3.rows.length) {
          const errorNotUnique = Error(`Request exists for ride ${rideId}`);
          errorNotUnique.status = 400;
          return next(errorNotUnique);
        }
        const query2 = {
          text: 'insert into requests (user_id, ride_id) values($1, $2) returning *',
          values: [id, rideId],
        };

        return client.query(query2, (error2, response2) => {
          done();
          if (error2) return next(error2);
          const rideRequest = response2.rows[0];
          return res.status(200).send({
            rideRequest,
          });
        });
      });
    });
  });
};
