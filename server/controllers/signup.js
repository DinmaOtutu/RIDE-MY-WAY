import { Passenger, Driver } from '../models';

import { Authorization } from '../middlewares';

export default class Signup {
  static signup(req, res) {
    if (!req.body.driverLicense && !req.body.carModel) {
      const passenger = Passenger.create(req.body);
      if (!passenger) {
        return res.status(400).send({
          msg: 'Email in use',
        });
      }
      const token = Authorization.authenticate(passenger);
      return res.status(201).send({ passenger, token });
    }

    const driver = Driver.create(req.body);
    if (!driver) {
      return res.status(400).send({
        msg: 'Email in use',
      });
    }
    const token = Authorization.authenticate(driver);
    return res.status(201).send({ driver, token });
  }
}
