import { Passenger, Driver } from '../models';

import { Authorization } from '../middlewares';

export default class Signin {
  static signin(req, res) {
    const passenger = Passenger.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (passenger) {
      return res.status(200).send({
        msg: 'Successfully logged in as passenger',
        token: Authorization.authenticate(passenger, 'Passenger'),
      });
    }
    const driver = Driver.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (driver) {
      return res.status(200).send({
        msg: 'Successfully logged in as driver',
        token: Authorization.authenticate(driver, 'Driver'),
      });
    }

    return res.status(401).send({
      msg: 'Please signup',
    });
  }
}
