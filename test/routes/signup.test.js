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
