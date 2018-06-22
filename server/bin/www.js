import app from '../app';

Promise.resolve()
  .then(() => app.set('port', parseInt(process.env.PORT, 10) || 8000))
  .then(() => app.listen(app.get('port')));
