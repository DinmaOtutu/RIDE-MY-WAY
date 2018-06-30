/* eslint-disable no-undef */

import chai from 'chai';

import http from 'http';

import chaiHttp from 'chai-http';

import app from '../../server/app';

const { expect } = chai;

const newRide = {
  driverName: 'Young Shall Grow',
  destination: 'Abuja',
  depart: 'Kogi',
  date: '2018-03-22',
};

const badRide = {
  ...newRide,
  driverName: {},
};

const badRide2 = {
  ...newRide,
  destination: 2,
};

const badRide3 = {
  ...newRide,
  depart: NaN,
};

const badRide4 = {
  ...newRide,
  date: undefined,
};

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

describe('Tests for createRide route - POST /api/v1/rides', () => {
  let server;

  beforeEach('Manually start server', (done) => {
    server = http.createServer(app);
    done();
  });

  it('Should create a new ride offer', (done) => {
    chai.request(server)
      .post(`${api}/rides`)
      .type('json')
      .send(newRide)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('newOffer');
        expect(res.body.newOffer).include(newRide);

        if (err) {
          return done(err);
        }

        return chai.request(server)
          .get(`${api}/rides`)
          .end((error, response) => {
            expect(response).to.have.status(200);
            expect(response.body).to.have.property('rideOffers');
            expect(response.body.rideOffers.pop()).to.deep.include(newRide);
            if (error) {
              return done(error);
            }
            return done();
          });
      });
  });

  describe('Validation tests', () => {
    it('Should return status 400 for invalid "driverName" type', (done) => {
      chai.request(app)
        .post(`${api}/rides`)
        .send(badRide)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').a('string');
          expect(res.body).to.not.have.property('newRide');

          return done();
        });
    });

    it('Should return status 400 for invalid "destination" type', (done) => {
      chai.request(app)
        .post(`${api}/rides`)
        .send(badRide2)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').a('string');
          expect(res.body).to.not.have.property('newRide');

          return done();
        });
    });

    it('Should return status 400 for invalid "depart" type', (done) => {
      chai.request(app)
        .post(`${api}/rides`)
        .send(badRide3)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').a('string');
          expect(res.body).to.not.have.property('newRide');

          return done();
        });
    });

    it('Should return status 400 for invalid "date" type', (done) => {
      chai.request(app)
        .post(`${api}/rides`)
        .send(badRide4)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').a('string');
          expect(res.body).to.not.have.property('newRide');

          return done();
        });
    });
  });
});
