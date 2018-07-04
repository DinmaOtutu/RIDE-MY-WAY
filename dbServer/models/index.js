import car from './car';
import user from './user';
import request from './request';
import ride from './ride';
import db from '../db';

car(db, () => {
  user(db, () => {
    ride(db, () => {
      request(db);
    });
  });
});
