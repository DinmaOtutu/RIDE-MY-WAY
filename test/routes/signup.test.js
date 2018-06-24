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
      test('Expect error 400 for invalid email', async () => {
        const res = await chai.request(app)
          .post(`${api}/signup`)
          .send(badMail);

        expect(res).status(400);
        expect(res.body).to.have.property('msg').that.is.a('string');
      });

      test('Expect fail for invalid phone', async () => {
        const res = await chai.request(app)
          .post(`${api}/signup`)
          .send(badPhone);

        expect(res).status(400);
        expect(res.body).to.have.property('msg').that.is.a('string');
      });

      test('Expect status 400 for incomplete parameters', async () => {
        const res = await chai.request(app)
          .post(`${api}/signup`)
          .send(incompletePassenger);

        expect(res).status(400);
        expect(res.body).to.have.property('msg').that.is.a('string');
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
      test('Expect status 400 for invalid driver email', async () => {
        const res = await chai.request(app)
          .post(`${api}/signup`)
          .send(badMailDriver);
        expect(res).to.have.status(400);
        expect(res.body).to.have.keys('msg');
      });

      test('Expect status 400 for incomplete driver account params', async () => {
        const res = await chai.request(app)
          .post(`${api}/signup`)
          .send(incompleteDriver);

        expect(res.body).to.have.keys('msg');
        expect(res).to.have.status(400);
      });

      test('Expect status 400 for invalid phone number', async () => {
        const res = await chai.request(app)
          .post(`${api}/signup`)
          .send(badPhoneDriver);

        expect(res).to.have.status(400);
        expect(res.body).to.have.property('msg');
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
