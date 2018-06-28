import controllers from '../../controllers';

const {
  requestRide, rideOffer,
  createRide, createRideRequest,
} = controllers;

export default (app) => {
  // welcome route
  app.get('/', (req, res) =>
    res.status(200).send({
      msg: 'Welcome to ride-my-way',
    }));
  app.get('/api/v1/rides/:rideId', requestRide);

  // route for getRides
  app.get('/api/v1/rides', rideOffer);

  app.post('/api/v1/rides', createRide);

  app.post('/api/v1/rides/:rideId/request', createRideRequest);
};
