/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { getRideRequests } from '../utils/data.json';

import { passengerToken, driverToken } from '../utils/signin.setup';

const { expect } = chai;

const api = `/api/${process.env.VERSION}`;

chai.use(chaiHttp);

const {
  driverId, existingPassengerId,
  rideRequests,
} = getRideRequests;

const token = driverToken(driverId);

const token2 = passengerToken(existingPassengerId);

suite('Tests for getRideRequests route - /api/version/rides/requests', () => {
  suite('GET /api/version/rides/requests', () => {
    test('Expect authenticated driver to get all ride requests - status 200', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/requests`)
        .set('x-access-token', token);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('rideRequests');
      expect(res.body.rideRequests).to.be.an('array');
      expect(res.body.rideRequests).to.eql(rideRequests);
    });

    test('Expect 401 for request by passenger account', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/requests`)
        .set('x-access-token', token2);

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('msg').a('string');
      expect(res.body).to.not.have.property('rideRequests');
    });

    test('Expect 401 for request by unauthenticated driver', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/requests`);

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('msg').a('string');
      expect(res.body).to.not.have.property('rideRequests');
    });
  });
});
