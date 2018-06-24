import models from '../models';

const { Passenger, Driver } = models;

export default (req, res) => {
  if (Passenger.findOne({
    email: req.body.email,
    password: req.body.password,
  })) {
    return res.status(200).send({
      msg: 'Successfully logged in as passenger',
    });
  }

  if (Driver.findOne({
    email: req.body.email,
    password: req.body.password,
  })) {
    return res.status(200).send({
      msg: 'Successfully logged in as driver',
    });
  }

  return res.status(401).send({
    msg: 'Please signup',
  });
};
