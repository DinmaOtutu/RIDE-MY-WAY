/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { acceptRequest } from '../utils/data.json';

import { passengerToken, driverToken } from '../utils/signin.setup';

const { expect } = chai;

const api = `/api/${process.env.VERSION}`;

chai.use(chaiHttp);

const {
  driverId, passengerFriendId,
  newRideOffer, offerRequest,
} = acceptRequest;

let token;
let token2;

(async () => {
  token2 = await passengerToken(passengerFriendId);
  token = await driverToken(driverId);
})();

suite('Tests for acceptRequest route - /api/version/rides/requests/:requestId', () => {
  suite('PUT /api/version/rides/requests/:requestId', () => {
    test.skip('Expect success on valid request by driver', async () => {
      // keep server open
      const requester = chai.request(app).keepOpen();

      // create ride offer
      const res = await requester
        .post(`${api}/version/rides`)
        .send(newRideOffer)
        .set('x-access-token', token);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('rideOffer');

      // get id for rideOffer just created
      const { id: rideOfferId } = res.body.rideOffer;

      // make request for rideOffer by passenger friend
      const res2 = await requester
        .post(`${api}/rides/${rideOfferId}/requests`)
        .send(offerRequest)
        .set('x-access-token', token2);

      expect(res2).to.have.status(201);
      expect(res2.body).to.have.property('rideRequest');

      // get id for particular ride request created
      const { id: rideRequestId } = res2.body.rideRequest;

      // finally accept ride request
      const res3 = await requester
        .put(`${api}/rides/requests/${rideRequestId}`)
        .send({ accept: true })
        .set('x-access-header', token);

      expect(res3).to.have.status(200);
      expect(res3.body).to.have.property('rideRequest');
      expect(res3.body.rideRequest).eql({ ...res2.body.rideRequest, status: 'accepted' });

      await requester.close();
    });

    test.skip('Route is unavailable to passenger accounts - error 401', async () => {

      const res = await chai.request(app)
        .put(`${api}/rides/requests/1`)
        .send({ accept: true })
        .set('x-access-header', token2);

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('msg');
      expect(res.body).to.not.have.property('rideRequest');
    });
  });
});
