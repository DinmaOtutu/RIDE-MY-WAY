/* eslint-disable no-unused-vars */

export default (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  return res.status(error.status || 500).send({
    message: error.message,
  });
};

