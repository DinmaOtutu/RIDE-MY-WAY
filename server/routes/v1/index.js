import { Signup, Signin, Rides } from '../../controllers';

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

  // routes for getRides
  app.get('/rides', Authorization.verifyMiddleware, Rides.getRides);
};
