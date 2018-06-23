import { signup } from '../../controllers';

export default (app) => {
  // welcome route
  app.get('/', (req, res) =>
    res.status(200).send({
      msg: 'Welcome to ride-my-way',
    }));

  // routes for users sign up
  app.post('/signup', signup);
};
