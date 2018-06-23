import express from 'express';
import * as v1 from './routes/v1';

const VERSIONS = {
  v1,
};

const urlParser = express.urlencoded({
  extended: true,
});

const jsonParser = express.json();

const app = express();

app
  .use(urlParser)
  .use(jsonParser);

// attach versions
Object.keys(VERSIONS).forEach((v) => {
  // non-api specific router
  const router = express.Router();

  // all routes for specific version
  const routes = VERSIONS[v];

  // attach routes
  Object.keys(routes).forEach((routeId) => {
    routes[routeId](router);
  });

  app
    .use(`/api/${v}`, router);

  // define catchall on extraneous request
  router.all('/*', (req, res) => {
    res.status(501).send({
      msg: 'Not yet implemented. Maybe later, -catchall',
    });
  });
});

// redirect to api url set in process.env
app.get('/*', (req, res) => {
  res.redirect(`api/${process.env.VERSION}`);
});

export default app;

