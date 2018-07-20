import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';
import routesFunction from '../dbServer/routes/v1';

const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/dbServer/swagger.yaml`);

const urlParser = express.urlencoded({
  extended: true,
});

const jsonParser = express.json();
app.use(urlParser);
app.use(jsonParser);

app.use(express.static(path.join(__dirname, '../client')));
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
routesFunction(app);

app.get('/', (req, res) => {
  res.redirect(`api/${process.env.VERSION}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


// Handling 404
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    data: {
      message: 'Sorry! not found',
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
