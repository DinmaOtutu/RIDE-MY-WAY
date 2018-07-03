import jwt from 'jsonwebtoken';

const auth = {
  authenticate(user) {
    const token = jwt.sign({
      id: user.id,
      email: user.email,
    }, process.env.SECRET, {
      expiresIn: '48h',
    });

    return token;
  },

  verifyToken(token) {
    let decoded = {};
    try {
      const payload = jwt.verify(token, process.env.SECRET);
      decoded.payload = payload;
    } catch (error) {
      decoded = {
        error: error.message,
      };
    }
    return decoded;
  },

  verifyTokenMware(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      const tokenError = Error('No token');
      tokenError.status = 403;
      throw tokenError;
    }
    const decoded = auth.verifyToken(token);

    if (decoded.error) {
      const tokenError = Error(decoded.error);
      tokenError.status = 401;
      throw tokenError;
    }

    req.decoded = decoded;
    return next();
  },
};

export default auth;
