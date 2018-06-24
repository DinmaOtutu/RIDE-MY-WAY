import chai from 'chai';

import chaiHttp from 'chai-http';

import { passengers, drivers } from '../../server/data';

import app from '../../server/app';

chai.use(chaiHttp);

const api = `/api/${process.env.VERSION}`;


// logs in and returns a token

export async function passengerToken(passengerId) {
  const { email, password } = passengers.find(passenger => passenger.id === passengerId);

  const res = await chai.request(app)
    .post(`${api}/signin`)
    .send({ email, password });
  return res.body.token;
}

export async function driverToken(driverId) {
  const { email, password } = drivers.find(driver => driver.id === driverId);

  const res = await chai.request(app)
    .post(`${api}/signin`)
    .send({ email, password });
  return res.body.token;
}
