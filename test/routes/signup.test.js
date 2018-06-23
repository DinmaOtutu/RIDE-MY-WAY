/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { signup } from '../utils/data.json';

const {
  passengers: {
    gudPassenger,
    incompletePassenger, badPhone,
    badMail,
  },
} = signup;

const {
  drivers: {
    gudDriver, incompleteDriver,
    badMailDriver,
    badPhoneDriver,
  },
} = signup;

const { expect } = chai;

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

suite('Tests for signup route - /api/version/signup', () => {
  suite('POST /api/version/signup', () => {
    suite('New passenger account', () => {
      test('Expect fail for invalid email', async () => {
        try {
          await chai.request(app)
            .post(`${api}/signup`)
            .send(badMail);
          expect.fail('Expected error code');
        } catch (e) {
          expect(e.response).status(400);
          expect(e.response.body).to.have.property('msg').that.is.a('string');
        }
      });

      test('Expect fail for invalid phone', async () => {
        try {
          await chai.request(app)
            .post(`${api}/signup`)
            .send(badPhone);
          expect.fail('Expected error code');
        } catch (e) {
          expect(e.response).status(400);
          expect(e.response.body).to.have.property('msg').that.is.a('string');
        }
      });

      test('Expect fail for incomplete parameters', async () => {
        try {
          await chai.request(app)
            .post(`${api}/signup`)
            .send(incompletePassenger);
          expect.fail('Expected error code');
        } catch (e) {
          expect(e.response).status(400);
          expect(e.response.body).to.have.property('msg').that.is.a('string');
        }
      });

      test('Expect success for valid and complete parameters', async () => {
        const res = await chai.request(app)
          .post(`${api}/signup`)
          .send(gudPassenger);
        expect(res).to.have.status(201);
        expect(res.body).property('passenger').an('object');
        expect(res.body.passenger.email).equal(gudPassenger.email);
      });
    });

    suite('New driver account', () => {
      test('Expect fail for invalid driver email', async () => {
        try {
          await chai.request(app)
            .post(`${api}/signup`)
            .send(badMailDriver);
          expect.fail('Expected fail for invalid driver email');
        } catch (e) {
          expect(e.response).to.have.status(400);
          expect(e.response.body).to.have.keys('msg');
        }
      });

      test('Expect fail for incomplete driver account params', async () => {
        try {
          await chai.request(app)
            .post(`${api}/signup`)
            .send(incompleteDriver);
          expect.fail('Expected fail for incomplete driver params');
        } catch (e) {
          expect(e.response.body).to.have.keys('msg');
          expect(e.response).to.have.status(400);
        }
      });

      test('Expect fail for invalid phone number', async () => {
        try {
          await chai.request(app)
            .post(`${api}/signup`)
            .send(badPhoneDriver);

          expect.fail('Expected fail for invalid driver phone number');
        } catch (e) {
          expect(e.response).to.have.status(400);
          expect(e.response.body).to.have.property('msg');
        }
      });

      test('Expect driver instance to be returned on valid parameters', async () => {
        const res = await chai.request(app)
          .post(`${api}/signup`)
          .send(gudDriver);
        expect(res).to.have.status(201);
        expect(res.body).to.property('driver');
        expect(res.body.driver.carModel).to.equal(gudDriver.carModel);
      });
    });
  });
});
