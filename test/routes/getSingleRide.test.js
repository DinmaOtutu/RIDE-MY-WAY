/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { passengerToken, driverToken } from '../utils/signin.setup';

import { singleRideOffer } from '../utils/data.json';

const { expect } = chai;

const api = `/api/${process.env.VERSION}`;

chai.use(chaiHttp);

const {
  passengerId, validRideOffer,
  validRideOffer: { id: validRideId, driverId },
  invalidRideOffer: { id: invalidRideId },
  nonExistentRideOffer: { Id: nonExistentId },
} = singleRideOffer;

// token for passenger passengerId
const token = passengerToken(passengerId);

const token2 = driverToken(driverId);

suite('Tests for getSingleRideOffer route - /api/version/ride/:rideId', () => {
  suite('GET /api/version/ride/:rideId', () => {
    test('Expect authenticated passenger to get single ride offer', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/${validRideId}`)
        .set('x-access-token', token);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('rideOffer');
      expect(res.body.rideOffer).to.eql(validRideOffer);
    });

    test('Authenticated passenger should get status 404 for existing ride offer from non-friend driver', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/${invalidRideId}`)
        .set('x-access-token', token);

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.a('string');
      expect(res.body).to.not.have.property('rideOffer');
    });

    test('Authenticated passenger should get 404 for non existing ride', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/${nonExistentId}`)
        .set('x-access-token', token);

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.be.a('string');
      expect(res.body).to.not.have.property('rideOffer');
    });

    test('Route should return 401 for driver accounts', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/${validRideId}`)
        .set('x-access-token', token2);

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).to.be.a('string');
      expect(res.body).to.not.have.property('rideOffer');
    });

    test('Route should return 403 for unauthenticated request', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/${validRideId}`);

      expect(res).to.have.status(403);
      expect(res.body).to.have.property('msg');
      expect(res.body.msg).a('string');
      expect(res.body).to.not.have.property('rideOffer');
    });
  });
});
