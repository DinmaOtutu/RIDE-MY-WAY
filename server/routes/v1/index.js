import { Signup, Signin, Ride } from '../../controllers';

import { Authorization } from '../../middlewares';

export default (app) => {
  // welcome route
  app.get('/', (req, res) =>
    res.status(200).send({
      msg: 'Welcome to ride-my-way',
    }));

  // routes for users sign up
  app.post('/signup', Signup.signup);

  // routes for users sign in
  app.post('/signin', Signin.signin);

  // route for getRides
  app.get('/rides', Authorization.verifyTokenMware, Ride.getRides);

  // route for getSingleRideOffer
  app.get('/rides/:rideId', Authorization.verifyTokenMware, Ride.getSingleRide);

  // route for createRideOffer
  app.post('/rides', Authorization.verifyTokenMware, Ride.createRide);

  // route for getSingleRideRequest
  // app.post('/rides/requests/:rideRequestId', Authorization.verifyTokenMware, Authorization.authorizeRole({ role: 'Driver' }), Ride.getSingleRide);

  // route for createRideRequest
  app.post('/rides/:rideId/requests', Authorization.verifyTokenMware, Authorization.authorizeRole({ role: 'Driver' }), Ride.request);
};
