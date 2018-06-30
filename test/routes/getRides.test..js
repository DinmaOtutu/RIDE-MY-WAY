/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import rideOffers from '../../server/model/rideOffers';

const { expect } = chai;

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

describe('Tests for rideOffers route - GET /api/v1/rides', () => {
  it('Should return all ride offers', (done) => {
    chai.request(app)
      .get(`${api}/rides`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('rideOffers').eql(rideOffers);
        if (err) return done(err);
        return done();
      });
  });
});
