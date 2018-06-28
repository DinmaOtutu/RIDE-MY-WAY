 import { getAllRides } from '../../controllers/rideOffer';
 import { getRideRequest } from '../../controllers/requestRide';
 
 export default (app) => {
  // welcome route
  app.get('/', (req, res) =>
    res.status(200).send({
      msg: 'Welcome to ride-my-way',
    }));
  app.get('/api/v1/rides/:rideId', getRideRequest);
  // route for getRides
  app.get('/api/v1/rides', getAllRides);

  app.post('/api/v1/rides',  )
};
