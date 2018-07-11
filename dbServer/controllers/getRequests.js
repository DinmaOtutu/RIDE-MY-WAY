import db from '../db';

export default (req, res, next) => {
  if (!+req.params.rideId) {
    return next('route');
  }
  const { decoded: { payload: { id: userId } }, params: { rideId } } = req;
  return db.connect((error, client, done) => {
    if (error) return done(next(error));
    const ownsRide = {
      text: 'select * from rides where rides.id = $1::int and rides.user_id = $2::int',
      values: [rideId, userId],
    };

    return client.query(ownsRide, (error1, response1) => {
      if (error1) return done(next(error1));
      if (!response1.rows.length) {
        const noOwnRide = Error(`Ride ${rideId} does not exist or you do not own it`);
        noOwnRide.status = 404;
        return done(next(noOwnRide));
      }
      const query = {
        text: `select requests.*,
        concat_ws(' ', users.firstname, users.lastname) as requested_by
        from requests inner join users on users.id = requests.user_id and requests.ride_id = (
          select rides.id from rides where rides.user_id = $1::int and rides.id = $2::int
        )`,
        values: [userId, rideId],
      };
      return client.query(query, (error2, response2) => {
        done();
        if (error2) return next(error2);
        return res.status(200).send({
          requests: response2.rows,
        });
      });
    });
  });
};
