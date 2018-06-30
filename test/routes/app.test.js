/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

const { expect } = chai;

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

describe('Tests for redirect route', () => {
  it('Should redirect request to "/"', (done) => {
    chai.request(app)
      .get('/')
      .redirects(0)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(302);
        // expect(res).to.redirectTo(/api$/);
        expect(res).to.have.header('location', api.slice(1));
        return done();
      });
  });
});

describe('Tests for welcome route', () => {
  it('Should send welcome message with status 200', (done) => {
    chai.request(app)
      .get(api)
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').a('string');
        return done();
      });
  });
});
