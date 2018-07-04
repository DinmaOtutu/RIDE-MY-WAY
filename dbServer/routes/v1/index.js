import controllers from '../../controllers';

import auth from '../../middlewares/auth';

import encrypt from '../../middlewares/encrypt';

import errorHandler from '../../middlewares/errorHandler';

const {
  getRide, getRides,
  createRide, createRideRequest,
  signup, signin, getRequests,
  replyRequest,
} = controllers;

export default (app) => {
  // welcome route
  app.get('/api/v1', (req, res) =>
    res.status(200).send({
      message: 'Welcome to ride-my-way',
    }));

  app.post('/api/v1/auth/signup', encrypt.hash, signup);

  app.post('/api/v1/auth/login', signin);

  app.get('/api/v1/rides', auth.verifyTokenMware, getRides);

  app.get('/api/v1/rides/:rideId', auth.verifyTokenMware, getRide);

  app.post('/api/v1/rides/:rideId/requests', auth.verifyTokenMware, createRideRequest);

  app.post('/api/v1/users/rides', auth.verifyTokenMware, createRide);

  app.get('/api/v1/users/rides/:rideId/requests', auth.verifyTokenMware, getRequests);

  app.put('/api/v1/users/rides/:rideId/requests/:requestId', auth.verifyTokenMware, replyRequest);

  app.use(errorHandler);
};
