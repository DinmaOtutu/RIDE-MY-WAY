import db from '../db';

export default (req, res) => {
  const {
    body: {
      stateFrom, cityFrom,
      stateTo, cityTo,
      price, departureDate,
      departureTime, pickup,
    },
    decoded: { payload: { id } },
  } = req;

  const query = {
    text: `insert into rides (
      state_from, city_from, state_to,
      city_to, price, departure_date,
      departure_time, pickup_location, user_id
      ) 
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: [
      stateFrom, cityFrom, stateTo,
      cityTo, price, departureDate,
      departureTime, pickup, id,
    ],
  };

  db.connect((error, client, done) => {
    if (error) throw error;
    client.query(query, (error2, response2) => {
      done();
      if (error2) throw error2;
    });
  });
};
