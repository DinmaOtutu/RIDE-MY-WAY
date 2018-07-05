import { Pool } from 'pg';

import databaseConfig from './config';

const env = process.env.NODE_ENV;
const db = new Pool(databaseConfig.development);

if (env === 'test') {
  // Add test config
}

export default db;

