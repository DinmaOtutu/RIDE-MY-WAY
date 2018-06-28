import rideOffers from '../model/rideOffers';

export default (req, res) => {
  const type = (param, typeOf) => {
    if (typeof param !== typeOf) {
      throw Error(`${param} should be type ${typeOf}`);
    }
    return true;
  };

  const {
    body: {
      driverName, destination, depart, date,
    },
  } = req;

  try {
    type(driverName, 'string');
    type(destination, 'string');
    type(depart, 'string');
    type(date, 'string');
  } catch (e) {
    return res.status(400).json({
      message: e.message,
    });
  }

  const newOffer = {
    id: rideOffers.length + 1,
    driverName,
    destination,
    depart,
    date,
  };

  rideOffers.push(newOffer);

  return res.status(201).json({
    newOffer,
  });
};
