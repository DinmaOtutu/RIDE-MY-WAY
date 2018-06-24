/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { getSingleRideRequest } from '../utils/data.json';

import { passengerToken, driverToken } from '../utils/signin.setup';

const { expect } = chai;

const api = `/api/${process.env.VERSION}`;

chai.use(chaiHttp);

const {
  rideRequest, rideRequest: { rideRequestId },
  driverId, existingPassengerId,
  nonExistentRequestId,
  otherDriverRequestId,
} = getSingleRideRequest;

const token = driverToken(driverId);

const token2 = passengerToken(existingPassengerId);

suite('Tests for getSingleRideRequest route - /api/version/rides/requests/:requestId', () => {
  suite('GET /api/version/rides/requests/:requestId', () => {
    test('Expect 401 on request by passenger account', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/requests/${rideRequestId}`)
        .set('x-access-token', token2);

      expect(res).to.have.status(401);
      expect(res.body).to.not.have.property(rideRequest);
      expect(res.body).to.have.property('msg').a('string');
    });

    test('Expect 400 on request for non-existent request id', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/requests/${nonExistentRequestId}`)
        .set('x-access-token', token);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('msg').a('string');
      expect(res.body).to.not.have.property('rideRequest');
    });

    test('Expect 401 on request for other drivers\' ride request', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/requests/${otherDriverRequestId}`)
        .set('x-access-token', token);

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('msg').a('string');
      expect(res.body).to.not.have.property('rideRequest');
    });

    test('Expect success with rideRequest returned for valid request by authenticated driver', async () => {
      const res = await chai.request(app)
        .get(`${api}/rides/requests/${rideRequestId}`)
        .set('x-access-token', token);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property(rideRequest);
      expect(res.body.rideRequest).an('object');
      expect(res.body.rideRequest).eql(rideRequest);
    });
  });
});
