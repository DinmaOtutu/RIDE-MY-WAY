import express from 'express';
import routesFunction from './routes/v1';

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

const port = process.env.PORT || 8000;

app.set('port', port);

app.listen(port, () => {
  console.log('App is running on port ');
});

