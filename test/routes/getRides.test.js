/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { passengerToken, driverToken } from '../utils/signin.setup';

import { getRideOffers } from '../utils/data.json';

const { passengerId, rideOffers } = getRideOffers;

const { expect } = chai;

const api = `/api/${process.env.VERSION}`;

chai.use(chaiHttp);

suite('Tests for getRideOffers route - /api/version/users/:userId/rides', () => {
  suite('GET /api/version/users/:userId/rides', () => {
    suite('Get ride offers from friends', () => {
      test('Expect authenticated passenger to get ride offers from his driver friends', async () => {
        // token for passenger passengerId
        const token = passengerToken(passengerId);
        const res = await chai.request(app)
          .get(`${api}/users/${passengerId}/rides`)
          .set('x-access-header', token);

        expect(res).to.have.status(200);
        expect(res.body).to.have.property('rideOffers');
        expect(res.body.rideOffers).eql(rideOffers);
      });

      test('Expect 401 error on request from non-authenticated user', async () => {
        const res = await chai.request(app)
          .get(`${api}/users/${passengerId}/rides`);

        expect(res.body).to.have.property('msg');
        expect(res).to.have.status(401);
        expect(res.body.msg).to.be.a('string');
      });

      test('Route should not be available to driver accounts - return 401 error', async () => {
        const token = driverToken(1);
        await chai.request(app)
          .get(`${api}/users/1/rides`);

        expect(res).to.have.property('msg');
        expect(res).to.have.status(401);
        expect(res.msg).to.be.a('string');
      });
    });
  });
});
