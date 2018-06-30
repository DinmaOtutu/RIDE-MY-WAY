/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import sinon from 'sinon';

import sinonChai from 'sinon-chai';

import app from '../../server/app';

import controllers from '../../server/controllers';

const {
  createRideRequest: requestRideController,
} = controllers;

const { expect } = chai;

const newRequest = {
  destination: 'Lagoon',
  depart: 'Ogun',
  date: '2018-06-22',
};

const badRequest = {
  ...newRequest,
  destination: [],
};

const badRequest2 = {
  ...newRequest,
  depart: NaN,
};

const badRequest3 = {
  ...newRequest,
  date: undefined,
};

chai.use(chaiHttp);

chai.use(sinonChai);

const api = `/api/${process.env.VERSION}`;

describe('Tests for request ride route - POST /api/v1/rides/:rideId/request', () => {
  it('Expect status 201 and return created resource', (done) => {
    chai.request(app)
      .post(`${api}/rides/2/request`)
      .send(newRequest)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('newRequest');
        expect(res.body.newRequest).deep.include(newRequest);
        if (err) return done(err);
        return done();
      });
  });

  describe('Validation tests', () => {
    it('Should return status 400 for invalid "destination" data type', (done) => {
      chai.request(app)
        .post(`${api}/rides/2/request`)
        .send(badRequest)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.not.have.property('newRequest');
          expect(res.body).to.have.property('message').a('string');
          if (err) return done(err);
          return done();
        });
    });

    it('Should return status 400 for invalid "depart" data type', (done) => {
      chai.request(app)
        .post(`${api}/rides/2/request`)
        .send(badRequest2)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.not.have.property('newRequest');
          expect(res.body).to.have.property('message').a('string');
          if (err) return done(err);
          return done();
        });
    });

    it('Should return status 400 for invalid "date" data type', (done) => {
      chai.request(app)
        .post(`${api}/rides/2/request`)
        .send(badRequest3)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.not.have.property('newRequest');
          expect(res.body).to.have.property('message').a('string');
          if (err) return done(err);
          return done();
        });
    });
  });

  describe('Tests for invalid request', () => {
    it('Should return status 400 for non-existent ride offer request', (done) => {
      chai.request(app)
        .post(`${api}/rides/222/request`)
        .send(newRequest)
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message').a('string');
          expect(res.body).to.not.have.property('newRequest');
          return done();
        });
    });
  });

  describe('Test for request ride controller', () => {
    it('Should call next if request param is not of type "string"', () => {
      const req = {
        params: {
          rideId: 'badParam',
        },
      };

      const res = {
        status() {
          return {
            json() {},
          };
        },
      };

      const next = sinon.fake();

      requestRideController(req, res, next);

      expect(next).to.have.been.calledWith('route');
    });
  });
});

