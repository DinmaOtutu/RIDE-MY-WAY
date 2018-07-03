import db from '../db';

import auth from '../middlewares/auth';

export default (req, res, next) => {
  const query = {
    text: 'insert into cars (model, make) values($1, $2) returning id',
    values: [req.body.carModel, req.body.carMake],
  };

  db.connect((error, client, done) => {
    if (error) return next(error);
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
};
