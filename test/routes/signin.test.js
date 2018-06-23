/* eslint-disable no-undef */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../server/app';

import { signin } from '../utils/data.json';

const { expect } = chai;

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;

const {
  existingDriver,
  existingPassenger,
  nonExistentUser,
} = signin;

suite('Tests form signin route - /api/version/signup', () => {
  suite('POST /api/version/signin', () => {
    suite('Existing passenger signin', () => {
      test('Expect success for existing passenger signin', async () => {
        const res = await chai.request(app)
          .post(`${api}/signin`)
          .set('content-type', 'application/json')
          .send(existingPassenger);
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys('msg');
      });

      test('Expet success for existing driver login', async () => {
        const res = await chai.request(app)
          .post(`${api}/signin`)
          .send(existingDriver);
        expect(res).to.have.status(200);
        expect(res.body).to.have.keys('msg');
        expect(res.body.msg).to.be.a('string');
      });

      test('Expect fail for non-existent user signin', async () => {
        try {
          await chai.request(app)
            .post(`${api}/signin`)
            .send(nonExistentUser);
          expect.fail('Expected fail on non-existent user sigin');
        } catch (e) {
          expect(e).to.have.property('response');
          expect(e.response).a('json');
          expect(e.response).to.have.status(401);
          expect(e.response.body).property('msg').a('string');
        }
      });
    });
  });
});
