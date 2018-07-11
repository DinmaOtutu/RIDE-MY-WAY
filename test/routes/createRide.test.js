/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import users from '../../dbServer/seeders/users';

import login from '../utils/signin.setup';

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

const { user1 } = users;

const { expect } = chai;

const badRide = {
  ...newRide,
  pickupLocation: {},
};

const badRide2 = {
  ...newRide,
  cityTo: 2,
};

const badRide3 = {
  ...newRide,
  cityFrom: NaN,
};

const badRide4 = {
  ...newRide,
  departureDate: undefined,
};

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

describe('Tests for createRide route - POST /api/v1/users/rides', () => {
  it('Should create a new ride offer', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .post(`${api}/users/rides`)
        .set('x-access-token', token)
        .send(newRide)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('ride');
          expect(res.body.ride).include({
            state_from: newRide.stateFrom,
            state_to: newRide.stateTo,
            city_from: newRide.cityFrom,
            city_to: newRide.cityTo,
          });

          return chai.request(app)
            .get(`${api}/rides`)
            .set('x-access-token', token)
            .end((error1, response1) => {
              if (error1) return done(error1);
              expect(response1).to.have.status(200);
              expect(response1.body).to.have.property('rides');
              expect(response1.body.rides.find(ride => ride.id === res.body.ride.id)).an('object').include({
                state_from: newRide.stateFrom,
                state_to: newRide.stateTo,
                city_from: newRide.cityFrom,
                city_to: newRide.cityTo,
              });

              return done();
            });
        });
    });
  });

  it('Should return 409 for attempt to insert duplicate ride', (done) => {
    login(user1, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .post(`${api}/users/rides`)
        .set('x-access-token', token)
        .send(newRide)
        .end((err) => {
          if (err) return done(err);
          return chai.request(app)
            .post(`${api}/users/rides`)
            .set('x-access-token', token)
            .send(newRide)
            .end((error2, res2) => {
              if (error2) return done(error2);
              expect(res2).to.have.status(409);
              expect(res2.body).to.not.have.property('ride');
              expect(res2.body).to.have.property('message');
              return done();
            });
        });
    });
  });

  describe('Validation tests', () => {
    it('Should return status 422 for invalid "pickupLocation" type', (done) => {
      login(user1, (error, token) => {
        if (error) return done(error);
        return chai.request(app)
          .post(`${api}/users/rides`)
          .set('x-access-token', token)
          .send(badRide)
          .end((err, res) => {
            if (err) return done(err);
            expect(res).to.have.status(422);
            expect(res.body).to.have.property('message').a('string');
            expect(res.body).to.not.have.property('newRide');

            return done();
          });
      });
    });

    it('Should return status 422 for invalid "cityTo" type', (done) => {
      login(user1, (error, token) => {
        if (error) return done(error);
        return chai.request(app)
          .post(`${api}/users/rides`)
          .set('x-access-token', token)
          .send(badRide2)
          .end((err, res) => {
            if (err) return done(err);
            expect(res).to.have.status(422);
            expect(res.body).to.have.property('message').a('string');
            expect(res.body).to.not.have.property('newRide');

            return done();
          });
      });
    });

    it('Should return status 400 for invalid "cityFrom" type', (done) => {
      login(user1, (error, token) => {
        if (error) return done(error);
        return chai.request(app)
          .post(`${api}/users/rides`)
          .set('x-access-token', token)
          .send(badRide3)
          .end((err, res) => {
            if (err) return done(err);
            expect(res).to.have.status(422);
            expect(res.body).to.have.property('message').a('string');
            expect(res.body).to.not.have.property('newRide');

            return done();
          });
      });
    });

    it('Should return status 422 for invalid "departureDate" type', (done) => {
      login(user1, (error, token) => {
        if (error) return done(error);
        return chai.request(app)
          .post(`${api}/users/rides`)
          .set('x-access-token', token)
          .send(badRide4)
          .end((err, res) => {
            if (err) return done(err);
            expect(res).to.have.status(422);
            expect(res.body).to.have.property('message').a('string');
            expect(res.body).to.not.have.property('newRide');

            return done();
          });
      });
    });
  });
});
