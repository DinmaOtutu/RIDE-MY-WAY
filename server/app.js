import express from 'express';
import routesFunction from '../dbServer/routes/v1';

const urlParser = express.urlencoded({
  extended: true,
});

const jsonParser = express.json();

const app = express();

app.use(urlParser);
app.use(jsonParser);


routesFunction(app);

app.get('/', (req, res) => {
  res.redirect(`api/${process.env.VERSION}`);
});

export default app;
