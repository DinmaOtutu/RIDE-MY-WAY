import { signup } from '../../controllers';
import { signin } from '../../controllers';


export default (app) => {
	// routes for users sign up and sign in
  app.post('/signup', signup);
  app.post('/signin', signin);
  
};
