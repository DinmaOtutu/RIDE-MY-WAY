import { Pool } from 'pg';

import databaseConfig from './config';

const env = process.env.NODE_ENV;

let db;

if (env === 'test') {
  // Add test config
  db = new Pool(databaseConfig.test);
} else if(env === 'dev' ) {
  db = new Pool(databaseConfig.prod);
}

export default db;

