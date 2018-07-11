/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import users from '../../dbServer/seeders/users';

const { expect } = chai;

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

const { user2: { email, password }, user2 } = users;

describe('Tests for login route - /api/version/auth/login', () => {
  describe('POST /api/v1/login', () => {
    it('Should login existing user', (done) => {
      chai.request(app)
        .post(`${api}/auth/login`)
        .send({ email, password })
        .end((error, res) => {
          if (error) return done(error);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('user');
          expect(res.body).to.include.keys('token');
          expect(res.body.user).to.include({
            firstname: user2.firstname,
            lastname: user2.lastname,
            email: user2.email,
          });
          return done();
        });
    });
    it('Should return 401 on request with wrong email', (done) => {
      chai.request(app)
        .post(`${api}/auth/login`)
        .send({ email: 'wrong@mail.com', password })
        .end((error, res) => {
          if (error) return done(error);
          expect(res).to.have.status(401);
          expect(res.body).to.not.have.property('user');
          expect(res.body).to.have.property('message').a('string');
          return done();
        });
    });
    it('Should return 401 on request with wrong password', (done) => {
      chai.request(app)
        .post(`${api}/auth/login`)
        .send({ email, password: 'invalid' })
        .end((error, res) => {
          if (error) return done(error);
          expect(res).to.have.status(401);
          expect(res.body).to.not.have.property('user');
          expect(res.body).to.have.property('message').a('string');
          return done();
        });
    });
  });
});
