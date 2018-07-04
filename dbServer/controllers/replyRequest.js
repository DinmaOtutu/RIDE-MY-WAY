import db from '../db';

import validators from '../middlewares/validators';

export default [
  validators.notNull('accept'),
  (req, res, next) => {
    if (!+req.params.rideId || !+req.params.requestId) {
      return next('route');
    }
    const {
      decoded: { payload: { id: userId } },
      params: { rideId, requestId },
      body: { accept },
    } = req;
    return db.connect((error, client, done) => {
      if (error) return next(error);
      const ownsRide = {
        text: 'select * from rides where rides.id = $1::int and rides.user_id = $2::int',
        values: [rideId, userId],
      };

      return client.query(ownsRide, (error1, response1) => {
        if (error1) return next(error1);
        if (!response1.rows.length) {
          const noOwnRide = Error(`Ride ${rideId} does not exist or you do not own it`);
          noOwnRide.status = 403;
          return next(noOwnRide);
        }
        const query = {
          text: `select * from requests inner join users on
        users.id = requests.user_id and requests.ride_id = (
          select rides.id from rides where rides.user_id = $1::int and rides.id = $2::int
        )`,
          values: [userId, rideId],
        };
        return client.query(query, (error2, response2) => {
          if (error2) return next(error2);
          if (!response2.rows) {
            const noRequest = Error(`There is no request for ride ${rideId}`);
            noRequest.status = 400;
            return next(noRequest);
          }
          const query3 = {
            text: `update requests set accepted = $1 where requests.id = $2
          returning *`,
            values: [!!accept, requestId],
          };
          return client.query(query3, (error3, response3) => {
            done();
            if (error3) return next(error3);
            return res.status(200).send({
              updatedRequest: response3.rows[0],
            });
          });
        });
      });
    });
  }];
