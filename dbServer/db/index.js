import { Pool } from 'pg';

import config from './config.json';

const env = process.env.NODE_ENV;

const database = {
  connectionString: process.env[config[env].use_env_variable],
};

const db = new Pool(database);

export default db;

