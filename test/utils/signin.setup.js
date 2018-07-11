// signs in and returns a user token

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

export default (user, callback) => {
  chai.request(app)
    .post(`${api}/auth/login`)
    .send({ email: user.email, password: user.password })
    .end((error, response) => {
      if (error) return callback(error);
      return callback(null, response.body.token);
    });
};
