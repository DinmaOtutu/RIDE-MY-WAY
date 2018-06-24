import jwt from 'jsonwebtoken';

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
}
