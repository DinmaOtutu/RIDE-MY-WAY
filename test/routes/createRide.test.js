/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

const { expect } = chai;

const newRide = {
  driverName: 'Young Shall Grow',
  destination: 'Abuja',
  depart: 'Kogi',
  date: '2018-03-22',
};

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

describe('Tests for createRide route - POST /api/v1/rides', () => {
  it('Should create a new ride offer', (done) => {
    const requester = chai.request(app);
    requester
      .post(`${api}/rides`)
      .type('json')
      .send(newRide)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('newOffer');
        expect(res.body.newOffer).include(newRide);

        requester
          .get(`${api}/rides`)
          .end((error, response) => {
            if (error) return done(error);
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('rideOffers');
            expect(response.body.rideOffers).to.deep.include(newRide);
            requester.close();
            return done();
          });
      });
  });
});
