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
        try {
          await chai.request(app)
            .get(`${api}/users/${passengerId}/rides`);

          expect.fail('Expected 401 error on non-authenticated request');
        } catch (e) {
          expect(e).to.have.property('response');
          expect(e.response).to.have.property('msg');
          expect(e.response).to.have.status(401);
          expect(e.response.msg).to.be.a('string');
        }
      });

      test('Route should not be available to driver accounts - return 401 error', async () => {
        try {
          const token = driverToken(1);
          await chai.request(app)
            .get(`${api}/users/1/rides`);

          expect.fail('Expected 401 - route not available for driver accounts');
        } catch (e) {
          expect(e).to.have.property('response');
          expect(e.response).to.have.property('msg');
          expect(e.response).to.have.status(401);
          expect(e.response.msg).to.be.a('string');
        }
      });
    });
  });
});
