/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { driverToken, passengerToken } from '../utils/signin.setup';

import { createRideOffer } from '../utils/data.json';

const { expect } = chai;

const api = `/api/${process.env.VERSION}`;

chai.use(chaiHttp);

const {
  driverId,
  newRideOffer,
  existingPassengerId,
} = createRideOffer;

const token = driverToken(driverId);

const token2 = passengerToken(existingPassengerId);

suite('Tests for createRideOffer route - /api/version/rides', () => {
  suite('POST /api/version/rides', () => {
    test('Expect authenticated driver to get 201 on correct request', async () => {
      // keep server open
      const requester = chai.request(app).keepOpen();

      // check total rideoffers by driver
      const res = await requester
        .get(`${api}/rides`)
        .set('x-access-token', token);

      expect(res).status(200);
      expect(res.body).to.have.property('rideOffers').an('array');

      const initialOffers = res.body.rideOffers.length;

      const res2 = await requester
        .post(`${api}/rides`)
        .set('x-access-token', token);

      expect(res2).to.have.status(201);
      expect(res2.body).to.have.property('rideOffer').an('object');
      expect(newRideOffer).to.deep.include(res2.body.rideOffer);

      // expect rideoffers to increase by 1
      const res3 = await requester
        .get(`${api}/rides`)
        .set('x-access-token', token);

      expect(res3).status(200);
      expect(res.body.rideOffers).length(initialOffers + 1);

      // close server
      await requester.close();
    });

    test('Expect error 401 on request by passenger account - authorization', async () => {
      const res = await chai.request(app)
        .post(`${api}/rides`)
        .set('x-access-token', token2);

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('msg').that.is.a('string');
      expect(res.body).to.not.have.property('rideOffers');
    });
  });
});
