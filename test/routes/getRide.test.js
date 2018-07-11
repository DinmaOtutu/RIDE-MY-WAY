/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import sinon from 'sinon';

import sinonChai from 'sinon-chai';

import app from '../../server/app';

import rides from '../../dbServer/seeders/rides';

import users from '../../dbServer/seeders/users';

import login from '../utils/signin.setup';

import controllers from '../../dbServer/controllers';

const { getRide: getRideController } = controllers;

const { expect } = chai;

chai.use(chaiHttp);

chai.use(sinonChai);

const { user1 } = users;

const { ride1 } = rides;

const api = `/api/${process.env.VERSION}`;

describe('Tests for get single ride offer - GET /api/v1/rides/:rideId', () => {
  it('Should return status 200 with correct offer', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .get(`${api}/rides/1`)
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('ride');
          expect(res.body.ride).include({
            city_from: ride1.city_from,
            city_to: ride1.city_to,
            state_to: ride1.state_to,
            state_from: ride1.state_from,
          });
          return done();
        });
    });
  });

  it('Should return status 404 for non-existent rideId', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .get(`${api}/rides/331`)
        .set('x-access-token', token)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(404);
          expect(res.body).to.not.have.property('ride');
          expect(res.body).to.have.property('message').a('string');
          return done();
        });
    });
  });

  describe('Tests for getRideController', () => {
    it('Should call next route for request param of non-number type', () => {
      const req = {
        params: {
          rideId: 'badId',
        },
      };

      const res = {
        status() {
          return { json() {} };
        },
      };
      // fake function you can monitor
      const next = sinon.fake();

      getRideController(req, res, next);

      expect(next).to.have.been.calledWith('route');
    });
  });
});
