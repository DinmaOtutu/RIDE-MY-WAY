/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import Seeder from '../../dbServer/seeders';

const { expect } = chai;

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

const newUser = {
  email: 'newUser3@mail.com',
  firstname: 'Kelly',
  lastname: 'Dowson',
  phone: '080564686789',
  password: 'secure3',
  city: 'CityState',
  state: 'newState',
};

const noEmail = {
  ...newUser,
  email: null,
};

const noFirstName = {
  ...newUser,
  firstname: null,
};

beforeEach('Seed database before all tests', function seeder(done) {
  this.timeout(0);
  /* drop and refresh tables */
  Seeder.delete((error) => {
    if (error) return done(error);
    return Seeder.populate(done);
  });
});

// after('Drop all data after test', done => Seeder.drop(done));

describe('Tests for signup route - /api/version/signup', () => {
  describe('POST /api/v1/auth/signup', () => {
    it('Should create new user and return 201 with user details', (done) => {
      chai.request(app)
        .post(`${api}/auth/signup`)
        .send(newUser)
        .end((error, res) => {
          if (error) return done(error);
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('user');
          expect(res.body.user).to.deep.include({
            email: 'newUser3@mail.com',
            firstname: 'Kelly',
            lastname: 'Dowson',
            phone: '080564686789',
            city: 'CityState',
            state: 'newState',
          });
          return done();
        });
    });

    it('Should return 409 for duplicate signup with the same email', (done) => {
      chai.request(app)
        .post(`${api}/auth/signup`)
        .send(newUser)
        .end((error, res) => {
          if (error) return done(error);
          expect(res).to.have.status(201);
          return chai.request(app)
            .post(`${api}/auth/signup`)
            .send(newUser)
            .end((error2, res2) => {
              if (error2) return done(error2);
              expect(res2).to.have.status(409);
              expect(res2.body).to.not.have.keys('token', 'user');
              return done();
            });
        });
    });

    it('Should return 422 for null email', (done) => {
      chai.request(app)
        .post(`${api}/auth/signup`)
        .send(noEmail)
        .end((error, res) => {
          if (error) return done(error);
          expect(res).to.have.status(422);
          expect(res.body).to.not.have.property('user');
          expect(res.body).to.have.keys('message', 'errors');
          return done();
        });
    });

    it('Should return 422 for null firstname', (done) => {
      chai.request(app)
        .post(`${api}/auth/signup`)
        .send(noFirstName)
        .end((error, res) => {
          if (error) return done(error);
          expect(res).to.have.status(422);
          expect(res.body).to.not.have.property('user');
          expect(res.body).to.have.keys('message', 'errors');
          return done();
        });
    });
  });
});
