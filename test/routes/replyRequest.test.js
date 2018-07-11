/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import sinon from 'sinon';

import sinonChai from 'sinon-chai';

import app from '../../server/app';

import controllers from '../../dbServer/controllers';

import login from '../utils/signin.setup';

import users from '../../dbServer/seeders/users';

const { replyRequest } = controllers;

const { user1 } = users;

const { expect } = chai;

chai.use(chaiHttp);

chai.use(sinonChai);

const api = `/api/${process.env.VERSION}`;

describe('Tests for reply request - /api/version/users/rides/:rideId/requests/:requestId', () => {
  it('Should return 404 for non-existent rideId', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .put(`${api}/users/rides/1111/requests/1`)
        .set('x-access-token', token)
        .send({ accept: true })
        .end((error2, res2) => {
          if (error2) return done(error2);
          expect(res2).to.have.status(404);
          expect(res2.body).to.not.have.property('updatedRequest');
          expect(res2.body).to.have.property('message').a('string');
          return done();
        });
    });
  });

  it('Should return 404 for non-existent requestId', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .put(`${api}/users/rides/1/requests/111`)
        .set('x-access-token', token)
        .send({ accept: true })
        .end((error2, res2) => {
          if (error2) return done(error2);
          expect(res2).to.have.status(404);
          expect(res2.body).to.not.have.property('updatedRequest');
          expect(res2.body).to.have.property('message').a('string');
          return done();
        });
    });
  });

  it('Should return 404 with message for ride with no requests', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);

      const newRide = {
        stateFrom: 'Florida',
        stateTo: 'Kansas',
        cityFrom: 'New York',
        cityTo: 'Toronto',
        price: 640.5,
        departureDate: '2018-11-05',
        departureTime: '20:11:05',
        pickupLocation: 'Empire State',
      };

      return chai.request(app)
        .post(`${api}/users/rides`)
        .set('x-access-token', token)
        .send(newRide)
        .end((error2, res2) => {
          if (error2) return done(error2);
          expect(res2).to.have.status(201);
          expect(res2.body).to.have.property('ride');
          return chai.request(app)
            .put(`${api}/users/rides/${res2.body.ride.id}/requests/1`)
            .set('x-access-token', token)
            .send({ accept: true })
            .end((error3, res3) => {
              if (error3) return done(error3);
              expect(res3).to.have.status(404);
              expect(res3.body).to.not.have.property('updatedRequest');
              expect(res3.body).to.have.property('message').a('string');
              expect(res3.body.message).contains('There is no request for ride');
              return done();
            });
        });
    });
  });

  it('Should return 404 for request by non-ride owner', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .put(`${api}/users/rides/2/requests/2`)
        .set('x-access-token', token)
        .send({ accept: true })
        .end((error2, res2) => {
          if (error2) return done(error2);
          expect(res2).to.have.status(404);
          expect(res2.body).to.not.have.property('updatedRequest');
          expect(res2.body).to.have.property('message').a('string');
          return done();
        });
    });
  });

  it('Should return 200 with updated "accepted" key for valid request', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .put(`${api}/users/rides/1/requests/1`)
        .set('x-access-token', token)
        .send({ accept: true })
        .end((error2, res2) => {
          if (error2) return done(error2);
          expect(res2).to.have.status(200);
          expect(res2.body).to.have.property('updatedRequest');
          expect(res2.body.updatedRequest).to.have.property('accepted', true);
          return done();
        });
    });
  });

  it('Should return status 422 for ommission of "accept" key', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .put(`${api}/users/rides/1/requests/1`)
        .set('x-access-token', token)
        .end((error2, res2) => {
          if (error2) return done(error2);
          expect(res2).to.have.status(422);
          expect(res2.body).to.not.have.property('updatedRequest');
          expect(res2.body).property('message').a('string');
          return done();
        });
    });
  });

  it('Should return 200 with updated "accepted" key when user rejects request', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .put(`${api}/users/rides/1/requests/1`)
        .set('x-access-token', token)
        .send({ accept: false })
        .end((error2, res2) => {
          if (error2) return done(error2);
          expect(res2).to.have.status(200);
          expect(res2.body).to.have.property('updatedRequest');
          expect(res2.body.updatedRequest).property('accepted', false);
          return done();
        });
    });
  });

  describe('Tests for replyRequest controller', () => {
    it('Should call next route for non number type request params', () => {
      const req = {
        params: {
          rideId: 'NotNumber',
          requestId: 2,
        },
      };

      const next = sinon.fake();

      replyRequest[1](req, null, next);

      expect(next).to.have.been.calledWith('route');
    });
  });
});
