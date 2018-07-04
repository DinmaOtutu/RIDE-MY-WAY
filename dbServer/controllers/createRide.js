import db from '../db';

import validators from '../middlewares/validators';

const rideOfferData = [
  'stateFrom', 'stateTo',
  'cityTo', 'cityFrom',
  'price', 'departureDate',
  'departureTime', 'pickupLocation',
];

export default [
  validators.notNull(...rideOfferData),
  (req, res, next) => {
    const {
      body: {
        stateFrom, cityFrom,
        stateTo, cityTo,
        price, departureDate,
        departureTime, pickupLocation,
      },
      decoded: { payload: { id } },
    } = req;

    db.connect((error, client, done) => {
      if (error) return next(error);
      const query1 = {
        text: `select * from rides where rides.departure_date = $1
        and rides.departure_time = $2`,
        values: [departureDate, departureTime],
      };
      return client.query(query1, (error1, response1) => {
        // if (error1) return next(error1);
        if (error1) throw error1;
        if (response1.rows.length) {
          const uniqueError = Error(`Another ride already scheduled for ${departureTime} on ${departureDate}`);
          uniqueError.status = 409;
          return next(uniqueError);
        }
        const query2 = {
          text: `insert into rides (
          state_from, city_from, state_to,
          city_to, price, departure_date,
          departure_time, pickup_location, user_id
          ) 
          values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`,
          values: [
            stateFrom, cityFrom, stateTo,
            cityTo, price, departureDate,
            departureTime, pickupLocation, id,
          ],
        };
        return client.query(query2, (error2, response2) => {
          done();
          if (error2) return next(error2);
          return res.status(201).send({
            ride: response2.rows[0],
          });
        });
      });
    });
  }];
