import bcrypt from 'bcrypt';
import cars from './cars';
import rides from './rides';
import requests from './requests';
import users from './users';
import db from '../db';

const {
  car1: { make, model },
  car2: { make: make2, model: model2 },
} = cars;

const {
  user1: {
    email, firstname, lastname, phone,
    password, city, state, car_id: carId,
  },
  user2: {
    email: email2, firstname: firstname2,
    lastname: lastname2, phone: phone2,
    password: password2, city: city2,
    state: state2, car_id: carId2,
  },
} = users;

const hashedPassword = bcrypt.hashSync(
  password,
  parseInt(process.env.SALT, 10),
);

const hashedPassword2 = bcrypt.hashSync(
  password2,
  parseInt(process.env.SALT, 10),
);

const {
  ride1: {
    state_from: stateFrom, state_to: stateTo,
    city_from: cityFrom, city_to: cityTo, price,
    departure_date: departureDate,
    departure_time: departureTime,
    pickup_location: pickupLocation,
    user_id: userId,
  }, ride2: {
    state_from: stateFrom2, state_to: stateTo2,
    city_from: cityFrom2, city_to: cityTo2,
    price: price2,
    departure_date: departureDate2,
    departure_time: departureTime2,
    pickup_location: pickupLocation2,
    user_id: userId2,
  },
} = rides;

const {
  request1: {
    ride_id: rideId, user_id: reqUserId,
  },
  request2: {
    ride_id: rideId2, user_id: reqUserId2,
  },
} = requests;

export default class Seeder {
  static populate(callback) {
    const populateCars = {
      text: 'insert into cars (model, make) values($1, $2), ($3, $4)',
      values: [model, make, model2, make2],
    };

    const populateUsers = {
      text: `insert into users 
      (email, firstname, lastname, phone, password, city, state, car_id)
      values($1, $2, $3, $4, $5,
        $6, $7, $8), ($9, $10, $11, $12,
      $13, $14, $15, $16)`,
      values: [
        email, firstname, lastname, phone,
        hashedPassword, city, state, carId, email2,
        firstname2, lastname2, phone2,
        hashedPassword2, city2, state2, carId2,
      ],
    };

    const populateRides = {
      text: `insert into rides
      (state_from, state_to, city_from, city_to, price,
      departure_date, departure_time, pickup_location, user_id)
      values($1, $2, $3, $4, $5,
        $6, $7, $8, $9), ($10, $11, $12,
      $13, $14, $15, $16, $17, $18)`,
      values: [
        stateFrom, stateTo, cityFrom, cityTo, price, departureDate,
        departureTime, pickupLocation, userId,
        stateFrom2, stateTo2, cityFrom2, cityTo2, price2,
        departureDate2, departureTime2, pickupLocation2, userId2,
      ],
    };

    const populateRequests = {
      text: `insert into requests 
      (ride_id, user_id) values($1, $2), ($3, $4)`,
      values: [rideId, reqUserId, rideId2, reqUserId2],
    };

    db.connect((error, client, done) => {
      if (error) return done(callback(error));
      return client.query(populateCars, (error1) => {
        if (error1) return done(callback(error1));
        return client.query(populateUsers, (error2) => {
          if (error2) return done(callback(error2));
          return client.query(populateRides, (error3) => {
            if (error3) return done(callback(error3));
            return client.query(populateRequests, (error4) => {
              done();
              if (error4) return done(callback(error4));
              return callback();
            });
          });
        });
      });
    });
  }

  static delete(callback) {
    db.connect((error, client, done) => {
      if (error) return done(callback(error));
      return client.query('delete from requests cascade', (error1) => {
        if (error1) return done(callback(error1));
        return client.query('delete from rides cascade', (error2) => {
          if (error2) return done(callback(error2));
          return client.query('delete from users cascade', (error3) => {
            if (error3) return done(callback(error3));
            return client.query('delete from cars cascade', (error4) => {
              if (error4) return done(callback(error4));
              return client.query('alter sequence requests_id_seq restart with 1', (error5) => {
                if (error5) return done(callback(error5));
                return client.query('alter sequence rides_id_seq restart with 1', (error6) => {
                  if (error6) return done(callback(error6));
                  return client.query('alter sequence users_id_seq restart with 1', (error7) => {
                    if (error7) return done(callback(error7));
                    return client.query('alter sequence cars_id_seq restart with 1', (error8) => {
                      done();
                      if (error8) return callback(error8);
                      return callback();
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  }

  static drop(callback) {
    db.connect((error, client, done) => {
      if (error) return done(callback(error));
      return client.query('drop table requests cascade', (error1) => {
        if (error1) return done(callback(error1));
        return client.query('drop table rides cascade', (error2) => {
          if (error2) return done(callback(error2));
          return client.query('drop table users cascade', (error3) => {
            if (error3) return done(callback(error3));
            return client.query('drop table cars cascade', (error4) => {
              done();
              if (error4) return callback(error4);
              return callback();
            });
          });
        });
      });
    });
  }
}
