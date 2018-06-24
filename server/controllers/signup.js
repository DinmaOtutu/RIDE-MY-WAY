import models from '../models';

import { Authorization } from '../middlewares';

const { Passenger, Driver } = models;

export default class Signup {
  static signup(req, res) {
    if (!req.body.driverLicense && !req.body.carModel) {
      const passenger = Passenger.create(req.body);
      const token = Authorization.generateToken(passenger);
      return res.status(201).send({ passenger, token });
    }

    const driver = Driver.create(req.body);
    const token = Authorization.generateToken(driver);
    return res.status(201).send({ driver, token });
  }
}
