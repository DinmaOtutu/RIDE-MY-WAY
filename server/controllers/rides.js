import models from '../models';

export default class Rides {
  static getRides(req, res) {
    const { decoded: { user }, decoded: { token: { role } } } = req;
    if (role === 'Driver') {
      return res.status(401).send({
        msg: 'Only passenger accounts',
      });
    }

    const { friends } = user;

    const rideOffers = friends.map(friend => friend.getRideOffers);

    return res.status(200).send({
      rideOffers,
    });
  }
}
