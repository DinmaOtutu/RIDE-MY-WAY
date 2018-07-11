/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import sinon from 'sinon';

import sinonChai from 'sinon-chai';

import app from '../../server/app';

import controllers from '../../dbServer/controllers';

import login from '../utils/signin.setup';

import users from '../../dbServer/seeders/users';

const { user1 } = users;

const { expect } = chai;

const { getRequests } = controllers;

chai.use(chaiHttp);

chai.use(sinonChai);

const api = `/api/${process.env.VERSION}`;

describe('Tests for get all requests for a ride - /api/version/users/rides/:rideId/requests', () => {
  describe('POST /api/v1/users/rides/:rideId/requests', () => {
    it('Should return status 200 and ride requests for a ride', (done) => {
      login(user1, (error, token) => {
        if (error) return done(error);
        return chai.request(app)
          .get(`${api}/users/rides/1/requests`)
          .set('x-access-token', token)
          .end((error2, res2) => {
            if (error2) return done(error2);
            expect(res2).to.have.status(200);
            expect(res2.body).to.have.property('requests').an('array');
            expect(res2.body.requests[0]).to.deep.include({ accepted: false, id: 1 });
            return done();
          });
      });
    });

    it('Should return status 404 for non-existent rideId', (done) => {
      login(user1, (error, token) => {
        if (error) return done(error);
        return chai.request(app)
          .get(`${api}/users/rides/1111/requests`)
          .set('x-access-token', token)
          .end((error2, res2) => {
            if (error2) return done(error2);
            expect(res2).to.have.status(404);
            expect(res2.body).to.not.have.property('requests');
            expect(res2.body).to.have.property('message').a('string');
            return done();
          });
      });
    });

    it('Should return empty array for ride without any requests', (done) => {
      const newRide = {
        stateFrom: 'California',
        stateTo: 'Kansas',
        cityTo: 'Huddersfield',
        cityFrom: 'Pyongyang',
        departureDate: '2018-11-12',
        departureTime: '11:18:22',
        pickupLocation: 'Ground zero',
        price: 620.24,
      };

      login(user1, (error, token) => {
        if (error) return done(error);
        return chai.request(app)
          .post(`${api}/users/rides`)
          .set('x-access-token', token)
          .send(newRide)
          .end((error2, res2) => {
            if (error2) return done(error2);
            expect(res2).to.have.status(201);
            return chai.request(app)
              .get(`${api}/users/rides/${res2.body.ride.id}/requests`)
              .set('x-access-token', token)
              .end((error3, res3) => {
                if (error3) return done(error3);
                expect(res3).to.have.status(200);
                expect(res3.body).to.have.property('requests');
                // eslint-disable-next-line
                expect(res3.body.requests).empty;
                return done();
              });
          });
      });
    });
  });

  describe('Tests for getRequests controller', () => {
    it('Should call next route for req rideId param not number', () => {
      const req = {
        params: {
          rideId: 'NotNumber',
        },
      };

      const next = sinon.fake();

      getRequests(req, null, next);

      expect(next).to.have.been.calledWith('route');
    });
  });
});
