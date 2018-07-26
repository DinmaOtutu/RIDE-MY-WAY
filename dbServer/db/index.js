import { Pool } from 'pg';

import databaseConfig from './config';

const env = process.env.NODE_ENV;

let db;

if (env === 'test') {
  // Add test config
  db = new Pool(databaseConfig.test);
} else {
  // db = new Pool(databaseConfig.development);
  db = new Pool({ connectionString: databaseConfig.production });
}

export default db;

