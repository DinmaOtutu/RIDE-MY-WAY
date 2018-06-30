/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import sinon from 'sinon';

import sinonChai from 'sinon-chai';

import app from '../../server/app';

import rideOffers from '../../server/model/rideOffers';

import controllers from '../../server/controllers';

const { getRide: getRideController } = controllers;

const { expect } = chai;

const singleRideOffer = rideOffers[0];

chai.use(chaiHttp);

chai.use(sinonChai);

const api = `/api/${process.env.VERSION}`;

describe('Tests for get single ride offer - GET /api/v1/rides/:rideId', () => {
  it('Should return status 200 with correct offer', (done) => {
    chai.request(app)
      .get(`${api}/rides/1`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('rideOffer');
        expect(res.body.rideOffer).include(singleRideOffer);
        return done();
      });
  });

  it('Should return status 400 for non-existent rideId', (done) => {
    chai.request(app)
      .get(`${api}/rides/331`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(400);
        expect(res.body).to.not.have.property('rideOffer');
        expect(res.body).to.have.property('message').a('string');
        return done();
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
      // helps monitor a fake function
      const next = sinon.fake();

      getRideController(req, res, next);

      expect(next).to.have.been.calledWith('route');
    });
  });
});
