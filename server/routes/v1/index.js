import controllers from '../../controllers';

const {
  getRide, getRides,
  createRide, createRideRequest,
} = controllers;

export default (app) => {
  // welcome route
  app.get('/api/v1', (req, res) =>
    res.status(200).send({
      message: 'Welcome to ride-my-way',
    }));
  app.get('/api/v1/rides/:rideId', getRide);

  // route for getRides
  app.get('/api/v1/rides', getRides);

  app.post('/api/v1/rides', createRide);

  app.post('/api/v1/rides/:rideId/request', createRideRequest);
};
