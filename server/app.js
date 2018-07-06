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

// Handling 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    data: {
      message: 'Page not found',
    },
  });
});


// Handling 500
app.use((error, req, res, next) => {
  res.status(500).send({
    status: 'error',
    data: {
      message: "Don't be alarmed... The server just crashed. I will fix it ASAP.",
    },
  });
});
export default app;
