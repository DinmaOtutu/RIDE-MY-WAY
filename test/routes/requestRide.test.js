/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

const { expect } = chai;

const newRequest = {
  destination: 'Lagoon',
  depart: 'Ogun',
  date: '2018-06-22',
};

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

describe('Tests for request ride route - POST /api/v1/rides/:rideId/request', (done) => {
  chai.request(app)
    .post(`${api}/rides/2/request`)
    .send({
      newRequest,
    })
    .end((err, res) => {
      if (err) return done(err);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('newRequest');
      expect(res.body.newRequest).deep.include(newRequest);
      return done();
    });
});

