/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { passengerToken, driverToken } from '../utils/signin.setup';

import { getFriends } from '../utils/data.json';

const { expect } = chai;

chai.use(chaiHttp);

const { existingFriends } = getFriends;

const { passengerId, friends: passengerFriends } = existingFriends[0];

const { driverId, friends: driverFriends } = existingFriends[1];

const api = `/api/${process.env.VERSION}`;

suite('Tests for getFriends route - /api/version/users/:id/friends', () => {
  suite('GET /api/version/users/:id/friends', () => {
    suite('Get a passenger\'s friends', () => {
      test('Expect passenger to get all his driver friends', async () => {
        // token for passenger passengerId
        const token = passengerToken(passengerId);

        const res = await chai.request(app)
          .get(`${api}/users/${passengerId}/friends`)
          .set('x-access-header', token);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array').with.property('friends');
        expect(res.body.friends).to.not.have.key('password');
        expect(res.body.friends).to.eql(passengerFriends);
      });

      test('Expect driver to get all driver friends', async () => {
        // token for driver driverId
        const token = driverToken(driverId);

        const res = await chai.request(app)
          .get(`${api}/users/${driverId}/friends`)
          .set('x-access-header', token);

        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.property('friends');
        expect(res.body.friends).to.eql(driverFriends);
      });
    });
  });
});
