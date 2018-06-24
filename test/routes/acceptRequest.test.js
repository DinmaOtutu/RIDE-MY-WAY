/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { acceptRequest } from '../utils/data.json';

import { passengerToken, driverToken } from '../utils/signin.setup';

import findOne from '../utils/findOne';

const { expect } = chai;

const api = `/api/${process.env.VERSION}`;

chai.use(chaiHttp);

const {
  driverId, passengerFriendId,
  newRideOffer, offerRequest,
} = acceptRequest;

const token = driverToken(driverId);

const token2 = passengerToken(passengerFriendId);

suite('Tests for acceptRequest route - /api/version/rides/requests/:requestId?accept=true', () => {
  suite('PUT /api/version/rides/requests/:requestId?accept=true', () => {
    test('Expect success', async () => {
      // keep server open
      const requester = chai.request(app).keepOpen();

      // create ride offer
      const res = await requester
        .post(`${api}/version/rides`)
        .send(newRideOffer)
        .set('x-access-token', token);

      expect(res).to.have.status(201);

      // get ride offers by passenger friend
      const res2 = await requester
        .get(`${api}/rides`)
        .set('x-access-token', token2);

      expect(res2).to.have.status(200);
      expect(res2.body).to.have.property('rideOffers');

      // get id for rideOffer just created
      const { id: rideOfferId } = findOne(res2.body.rideOffers, newRideOffer);

      // make request for rideOffer by passenger friend
      const res3 = await requester
        .post(`${api}/rides/${rideOfferId}/requests`)
        .send(offerRequest)
        .set('x-access-token', token2);

      expect(res3).to.have.status(201);

      // get ride requests made by passengers - drivers
      const res4 = await requester
        .get(`${api}/rides/requests`)
        .set('x-access-token', token);

      expect(res4).to.have.status(200);
      expect(res4).to.have.property('rideRequests');

      // get id for particular ride request created
      const { id: rideRequestId } = findOne(res4.body.rideRequests, offerRequest);

      // finally accept ride request
      const res5 = await requester
        .put(`${api}/rides/requests/${rideRequestId}`)
        .send({ accept: true })
        .set('x-access-header', token);

      expect(res5).to.have.status(201);
    });
  });
});
