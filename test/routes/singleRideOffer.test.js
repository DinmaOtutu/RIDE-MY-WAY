/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import rideOffers from '../../server/model/rideOffers';

const { expect } = chai;

const singleRideOffer = rideOffers[0];

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

describe('Tests for get single ride offer - GET /api/v1/rides/:rideId', () => {
  it('Should return status 200 with correct offer', (done) => {
    app.request(app)
      .get(`${api}/rides/1`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('rideOffer');
        expect(res.body.rideOffer).include(singleRideOffer);

        return done();
      });
  });
});
