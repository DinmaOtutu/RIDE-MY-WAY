import db from '../db';

import auth from '../middlewares/auth';

import validators from '../middlewares/validators';

const signUpData = [
  'email', 'firstname', 'lastname',
  'phone', 'password', 'city', 'state',
];

export default [
  validators.notNull(...signUpData),
  (req, res, next) => {
    const notUnique = {
      text: `select * from users where users.email = $1 or (users.firstname = $2
      and users.lastname = $3)`,
      values: [req.body.email, req.body.firstname, req.body.lastname],
    };

    const query = {
      text: 'insert into cars (model, make) values($1, $2) returning id',
      values: [req.body.carModel, req.body.carMake],
    };
    db.connect((error, client, done) => {
      if (error) return next(error);
      return client.query(notUnique, (error1, res1) => {
        if (error1) return next(error1);
        if (res1.rows.length) {
          const alreadyExists = Error('Email or name already exists');
          alreadyExists.status = 400;
          return next(alreadyExists);
        }

        return client.query(query, (error2, res2) => {
          if (error2) return next(error2);
          const carId = res2.rows[0].id;
          const query2 = {
            text: `insert into users (
            email, firstname, lastname,
            phone, password, city,
            state, car_id
          ) values ($1, $2, $3, $4, $5, $6, $7, $8)
          returning id, email, firstname, lastname,
          phone, city, state, car_id`,
            values: [
              req.body.email, req.body.firstname,
              req.body.lastname, req.body.phone,
              req.body.password, req.body.city,
              req.body.state, carId,
            ],
          };

          return client.query(query2, (error3, res3) => {
            done();
            if (error3) return next(error3);
            const newUser = res3.rows[0];
            const token = auth.authenticate(newUser);
            return res.status(201).send({
              user: newUser,
              token,
            });
          });
        });
      });
    });
  }];
