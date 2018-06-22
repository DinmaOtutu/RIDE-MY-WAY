import models from '../models';

const { Passenger, Driver } = models;

export default (req, res) => {
  if (!req.body.driverLicense && !req.body.carModel) {
    const passenger = Passenger.create(req.body);
    return res.status(201).send({ passenger });
  }

  const driver = Driver.create(req.body);
  return res.status(201).send({ driver });
};
