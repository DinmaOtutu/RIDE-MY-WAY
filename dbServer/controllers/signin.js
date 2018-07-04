import db from '../db';

import auth from '../middlewares/auth';

import encrypt from '../middlewares/encrypt';

import validators from '../middlewares/validators';

const signInData = [
  'email', 'password',
];


export default [
  validators.notNull(...signInData),
  (req, res, next) => {
    const query = {
      text: 'select id, firstname, lastname, email, password from users where email = $1 LIMIT 1',
      values: [
        req.body.email,
      ],
    };

    db.query(query, (error, response) => {
      if (error) return next(error);
      const user = response.rows[0];
      if (!response.rows.length) {
        return res.status(401).send({
          message: 'Incorrect email',
        });
      }
      return encrypt.compare(req, user.password, (err, result) => {
        if (err) return next(err);
        if (result) {
          const token = auth.authenticate(user);
          delete user.password;
          return res.status(200).send({
            user, token,
          });
        }
        return res.status(401).send({
          message: 'Incorrect password',
        });
      });
    });
  }];
