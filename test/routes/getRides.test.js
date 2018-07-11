/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import rides from '../../dbServer/seeders/rides';

import users from '../../dbServer/seeders/users';

import login from '../utils/signin.setup';

const { expect } = chai;

chai.use(chaiHttp);

const { user2 } = users;

const returnRides = [{
  state_to: rides.ride1.state_to,
  state_from: rides.ride1.state_from,
  city_to: rides.ride1.city_to,
  city_from: rides.ride1.city_from,
}, {
  state_to: rides.ride2.state_to,
  state_from: rides.ride2.state_from,
  city_to: rides.ride2.city_to,
  city_from: rides.ride2.city_from,
}];

const api = `/api/${process.env.VERSION}`;

describe('Tests for rideOffers route - GET /api/v1/rides', () => {
  it('Should return all ride offers with 200 status', (done) => {
    login(user2, (error, token) => {
      if (error) return done(error);
      return chai.request(app)
        .get(`${api}/rides`)
        .set('x-access-token', token)
        .end((error2, res) => {
          if (error2) return done(error2);
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('rides').an('array');
          expect(res.body).to.have.property('rides');
          expect(res.body.rides[0]).to.deep.include(returnRides[0]);
          expect(res.body.rides[1]).to.deep.include(returnRides[1]);
          return done();
        });
    });
  });

  it('Should return 401 on request with invalid token', (done) => {
    chai.request(app)
      .get(`${api}/rides`)
      .set('x-access-token', 'wrongToken')
      .end((error, res) => {
        if (error) return done(error);
        expect(res).to.have.status(401);
        expect(res.body).to.not.have.property('rides');
        return done();
      });
  });
});
