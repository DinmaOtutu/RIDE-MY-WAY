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
      text: `select * from rides 
      where rides.id = $1 and
      rides.user_id != $2 
      and rides.deleted is not true
      LIMIT 1`,
      values: [rideId, id],
    };

    return client.query(query, (error1, response1) => {
      if (error1) return done(next(error1));
      if (!response1.rows.length) {
        const errorNoRide = Error(`Ride ${rideId} does not exist or is unavailable`);
        errorNoRide.status = 404;
        return done(next(errorNoRide));
      }
      const notUnique = {
        text: `select * from requests 
        where requests.ride_id = $1 and
        requests.user_id = $2`,
        values: [rideId, id],
      };
      return client.query(notUnique, (error3, response3) => {
        if (error3) return done(next(error3));

        if (response3.rows.length && !response3.rows[0].deleted) {
          const errorNotUnique = Error(`Request exists for ride ${rideId}`);
          errorNotUnique.status = 409;
          return done(next(errorNotUnique));
        }

        if (response3.rows.length && response3.rows[0].deleted) {
          done();
          const update = {
            text: `update requests set
            deleted = false where 
            requests.user_id = $1
            and requests.ride_id = $2
            returning *`,
            values: [id, rideId],
          };

          return client.query(update, (uErr, uRes) => {
            done();
            if (uErr) return next(uErr);
            return res.status(201).send({
              rideRequest: uRes.rows[0],
            });
          });
        }

        const query2 = {
          text: `insert into requests 
          (user_id, ride_id) 
          values($1, $2) returning *`,
          values: [id, rideId],
        };

        return client.query(query2, (error2, response2) => {
          done();
          if (error2) return next(error2);
          const rideRequest = response2.rows[0];
          return res.status(201).send({
            rideRequest,
          });
        });
      });
    });
  });
};
