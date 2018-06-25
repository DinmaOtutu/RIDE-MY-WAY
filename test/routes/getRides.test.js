/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { passengerToken, driverToken } from '../utils/signin.setup';

import { getRideOffers } from '../utils/data.json';

const {
  passengerId,
  rideOffers,
  existingDriverId,
  driverRideOffers,
} = getRideOffers;

const { expect } = chai;

const api = `/api/${process.env.VERSION}`;

chai.use(chaiHttp);

suite('Tests for getRideOffers route - /api/version/rides', () => {
  suite('GET /api/version/rides', () => {
    suite('Get ride offers from friends', () => {
      test('Expect authenticated passenger to get ride offers from his driver friends', async () => {
        // token for passenger passengerId
        const token = await passengerToken(passengerId);
        const res = await chai.request(app)
          .get(`${api}/rides`)
          .set('x-access-token', token);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('rideOffers');
        expect(res.body.rideOffers).eql(rideOffers);
      });

      test('Expect 403 error on request from non-authenticated user', async () => {
        const res = await chai.request(app)
          .get(`${api}/rides`);

        expect(res.body).to.have.property('msg');
        expect(res).to.have.status(403);
        expect(res.body.msg).to.be.a('string');
      });

      test('Route should be available to driver accounts - return 200', async () => {
        const token = await driverToken(existingDriverId);
        const res = await chai.request(app)
          .get(`${api}/rides`)
          .set('x-access-token', token);

        expect(res).to.have.status(200);
        // expect(res.body).to.have.property('rideOffers').deep.include(driverRideOffers);
      });
    });
  });
});
