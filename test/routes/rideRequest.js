/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { passengerToken, driverToken } from '../utils/signin.setup';

import { rideRequest } from '../utils/data.json';

const { expect } = chai;

chai.use(chaiHttp);

const { passengerId,
  nonExistentRideId, availRideId,
  unavailRideId, validPassengerRequest,
  driverRequest, requestUnavailSeat,
} = rideRequest;

const api = `/api/${process.env.VERSION}`;

let token;
let token2;

(async () => {
  token = await driverToken(passengerId);
})();

suite('Tests for rideRequest route - /api/version/rides/:rideId/requests', () => {
  suite('POST /api/version/rides/:rideId/requests', () => {
    test('Expect 400 on request for unavailable seat number', async () => {
      const res = await chai.request(app)
        .post(`${api}/rides/${availRideId}/requests`)
        .send(requestUnavailSeat)
        .set('x-access-token', token);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('msg').a('string');
      expect(res.body).to.not.have.property('rideRequest');
    });

    test('Expect 201 with newly created resource on correct request by authenticated passenger', async () => {
      const res = await chai.request(app)
        .post(`${api}/rides/${availRideId}/requests`)
        .send(validPassengerRequest)
        .set('x-access-token', token);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property(rideRequest);
      expect(res.body.rideRequest).to.be.an('object');
      expect(res.body.rideRequest).to.deep.include(validPassengerRequest);
    });

    test('Expect 404 on request for non-existent rideOffer', async () => {
      const res = await chai.request(app)
        .post(`${api}/rides/${nonExistentRideId}/requests`)
        .send(validPassengerRequest)
        .set('x-access-token', token);

      expect(res).to.have.status(404);
      expect(res.body).to.have.property('msg').a('string');
    });

    test('Expect 400 on request for unavailable rideOffer', async () => {
      const res = await chai.request(app)
        .post(`${api}/rides/${unavailRideId}/requests`)
        .send(validPassengerRequest)
        .set('x-access-token', token);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('msg').a('string');
    });
  });
});
