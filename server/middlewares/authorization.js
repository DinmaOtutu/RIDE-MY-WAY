import jwt from 'jsonwebtoken';

import { Driver, Passenger } from '../models';

export default class Authorization {
  static authenticate(user, role = null) {
    const token = jwt.sign({
      id: user.id,
      role: role || user.constructor.name,
      email: user.email,
    }, process.env.SECRET, {
      expiresIn: '48h',
    });

    return token;
  }

  static verifyToken(token) {
    let decoded;
    try {
      const payload = jwt.verify(token, process.env.SECRET);
      if (payload.role === 'Driver') {
        const user = Driver.findOne({ id: payload.id, email: payload.email });
        if (!user) {
          throw Error('No driver account found');
        }
        decoded = {
          user, payload,
        };
      } else if (payload.role === 'Passenger') {
        const user = Passenger.findOne({ id: payload.id, email: payload.email });
        if (!user) {
          throw Error('No passenger account found');
        }
        decoded = {
          user, payload,
        };
      } else {
        throw Error('Invalid token');
      }
    } catch (e) {
      decoded = {
        error: e.message,
      };
    }
    return decoded;
  }

  static verifyTokenMware(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        msg: 'No token',
      });
    }
    const decoded = Authorization.verifyToken(token);

    if (decoded.error) {
      return res.status(401).send({
        msg: decoded.error,
      });
    }

    req.decoded = decoded;
    return next();
  }

  static authorizeRole({ role }) {
    return (req, res, next) => (req.decoded.payload.role === role && (() => { next(); })()) || res
      .status(401)
      .send({
        msg: `Action not available for ${role === 'Driver' ? 'Passenger' : 'Driver'}`,
      });
  }
}

