/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { signin } from '../utils/data.json';

const { expect } = chai;

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

const {
  existingPassenger,
  nonExistentUser,
} = signin;

suite('Tests for signin route - /api/version/signin', () => {
  suite('POST /api/version/signin', () => {
    suite('Existing passenger signin', () => {
      test('Expect success for existing passenger signin', async () => {
        const res = await chai.request(app)
          .post(`${api}/signin`)
          .set('content-type', 'application/json')
          .send(existingPassenger);
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys('msg', 'token');
      });
      
      test('Expect error 401 for non-existent user signin', async () => {
        const res = await chai.request(app)
          .post(`${api}/signin`)
          .send(nonExistentUser);
        expect(res).to.have.status(401);
        expect(res.body).property('msg').a('string');
      });
    });
  });
});
