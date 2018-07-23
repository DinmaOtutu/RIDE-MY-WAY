import controllers from '../../controllers';

import auth from '../../middlewares/auth';

import errorHandler from '../../middlewares/errorHandler';

import validators from '../../middlewares/validators';

const {
  getRide, getRides,
  createRide, createRideRequest,
  signup, signin, getRequests,
  replyRequest, rideRequests,
} = controllers;

export default (app) => {
  app.use(validators);
  // welcome route
  app.get('/api/v1', (req, res) =>
    res.status(200).send({
      message: 'Welcome to ride-my-way',
    }));

  app.post('/api/v1/auth/signup', signup);

  app.post('/api/v1/auth/login', signin);

  app.get('/api/v1/rides', auth.verifyTokenMware, getRides);

  app.get('/api/v1/rides/:rideId', auth.verifyTokenMware, getRide);

  app.post('/api/v1/rides/:rideId/requests', auth.verifyTokenMware, createRideRequest);

  app.post('/api/v1/users/rides', auth.verifyTokenMware, createRide);

  app.get('/api/v1/users/rides/:rideId/requests', auth.verifyTokenMware, getRequests);

  app.put('/api/v1/users/rides/:rideId/requests/:requestId', auth.verifyTokenMware, replyRequest);

  app.get('/api/v1/requests', auth.verifyTokenMware, rideRequests);

  app.use(errorHandler);
};
