import dotEnv from 'dotenv';

dotEnv.config();

const databaseConfig = {};

databaseConfig.development = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// {
//     "development": {
//         "user": process.env
//         "host":
//         "database":
//         "password":
//         "port":
//     },
//     "production": {
//         "use_env_variable": "RIDE_MY_WAY_PROD"
//     },
//     "test": {
//         "use_env_variable": "RIDE_MY_WAY_TEST"
//     }
// }

databaseConfig.secret = process.env.SECRET;

export default databaseConfig;
