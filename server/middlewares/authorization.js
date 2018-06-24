import jwt from 'jsonwebtoken';

import models from '../models';

const { Passenger, Driver } = models;

// import data from '../data';

export default class Authorization {
  static generateToken(user) {
    const token = jwt.sign({
      id: user.id,
      role: user.constructor.name,
      email: user.email,
    }, process.env.SECRET, {
      expiresIn: '48h',
    });

    return token;
  }

  // returns passenger or driver instance
  static verifyToken(token) {
    let decoded = {};
    try {
      const payload = jwt.verify(token, process.env.SECRET);

      if (payload.role === 'Driver') {
        const user = Driver.findOne({
          email: payload.email,
          id: payload.id,
        });
        decoded = {
          user,
          token: payload,
        };
        if (!user) throw Error();
      } else if (payload.role === 'Passenger') {
        const user = Passenger.findOne({
          email: payload.email,
          id: payload.id,
        });
        decoded = {
          user,
          token: payload,
        };
        if (!user) throw Error();
      } else {
        throw Error();
      }
    } catch (e) {
      decoded.error = 'Cannot verify token here';
    }
    return decoded;
  }

  static verifyMiddleware(req, res, next) {
    if (req.headers['x-access-token']) {
      const token = req.headers['x-access-token'];
      const decoded = Authorization.verifyToken(token);
      if (!decoded.error) {
        req.decoded = decoded;
        next();
      } else {
        res.status(401).send({
          msg: decoded.error,
        });
      }
    } else {
      res.status(401).send({
        msg: 'No token',
      });
    }
  }
}
