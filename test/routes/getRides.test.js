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
          .set('x-access-header', token);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('rideOffers');
        expect(res.body.rideOffers).eql(rideOffers);
      });

      test('Expect 401 error on request from non-authenticated user', async () => {
        const res = await chai.request(app)
          .get(`${api}/rides`);

        expect(res).to.have.property('msg');
        expect(res).to.have.status(401);
        expect(res.body.msg).to.be.a('string');
      });

      test('Route should not be available to driver accounts - return 401 error', async () => {
        const token = await driverToken(existingDriverId);
        const res = await chai.request(app)
          .get(`${api}/rides`)
          .set('x-access-header', token);

        expect(res).to.have.property('msg');
        expect(res).to.have.status(401);
        expect(res.body.msg).to.be.a('string');
      });
    });
  });
});
