/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import sinon from 'sinon';

import sinonChai from 'sinon-chai';

import app from '../../server/app';

import controllers from '../../dbServer/controllers';

import login from '../utils/signin.setup';

import users from '../../dbServer/seeders/users';

const { user2 } = users;

const {
  createRideRequest: requestRideController,
} = controllers;

const { expect } = chai;

chai.use(chaiHttp);

chai.use(sinonChai);

const api = `/api/${process.env.VERSION}`;

describe('Tests for request ride route - POST /api/v1/rides/:rideId/request', () => {
  it('Expect status 409 for already existing request', (done) => {
    login(user2, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .post(`${api}/rides/1/requests`)
        .set('x-access-token', token)
        .end((error2, res) => {
          if (error2) return done(error2);
          expect(res).to.have.status(409);
          expect(res.body).to.not.have.property('rideRequest');
          expect(res.body).to.have.property('message').a('string');
          return done();
        });
    });
  });


  it('Should return status 404 for non-existent ride offer request', (done) => {
    login(user2, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .post(`${api}/rides/222/requests`)
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').a('string');
          expect(res.body).to.not.have.property('rideRequest');
          return done();
        });
    });
  });

  it('Should return status 404 for own ride request', (done) => {
    login(user2, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .post(`${api}/rides/2/requests`)
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').a('string');
          expect(res.body).to.not.have.property('rideRequest');
          return done();
        });
    });
  });

  it('Should create new ride request on valid request', (done) => {
    // create new user and make request for existing ride
    const newUser = {
      email: 'newUser3@mail.com',
      firstname: 'Manny',
      lastname: 'Kessington',
      phone: '08080909768',
      password: '1Qwuyx9F',
      city: 'Umuahia',
      state: 'Amazona',
      carMake: 'Hyundai',
      carModel: 'Cherokee',
    };

    chai.request(app)
      .post(`${api}/auth/signup`)
      .send(newUser)
      .end((error, res) => {
        if (error) return done(error);
        return chai.request(app)
          .post(`${api}/rides/2/requests`)
          .set('x-access-token', res.body.token)
          .end((error2, res2) => {
            if (error2) return done(error2);
            expect(res2).to.have.status(201);
            expect(res2.body).to.have.property('rideRequest').an('object');
            expect(res2.body.rideRequest).to.have.property('ride_id', 2);
            expect(res2.body.rideRequest).to.have.property('user_id', res.body.user.id);
            return done();
          });
      });
  });

  describe('Test for request ride controller', () => {
    it('Should call next if request param is not of type "number"', () => {
      const req = {
        params: {
          rideId: 'badParam',
        },
      };

      const res = {
        status() {
          return {
            json() {},
          };
        },
      };

      const next = sinon.fake();

      requestRideController(req, res, next);

      expect(next).to.have.been.calledWith('route');
    });
  });
});

