/* eslint-disable no-unused-vars */

export default (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  return !error.errors
    ? res.status(error.status || 500).send({
      message: error.stack,
      serverError: !error.status && error,
    })
    : res.status(422).send({
      message: error.message,
      errors: error.errors,
    });
};
