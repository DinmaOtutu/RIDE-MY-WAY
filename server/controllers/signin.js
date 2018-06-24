import models from '../models';

import { Authorization } from '../middlewares';

const { Passenger, Driver } = models;

export default class Signin {
  static signin(req, res) {
    const passenger = Passenger.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (passenger) {
      return res.status(200).send({
        msg: 'Successfully logged in as passenger',
        token: Authorization.generateToken(passenger),
      });
    }
    const driver = Driver.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (driver) {
      return res.status(200).send({
        msg: 'Successfully logged in as driver',
        token: Authorization.generateToken(driver),
      });
    }

    return res.status(401).send({
      msg: 'Please signup',
    });
  }
}
