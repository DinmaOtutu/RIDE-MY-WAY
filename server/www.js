/* eslint-disable no-console */

import app from './app';

const port = process.env.PORT || 8000;

app.set('port', port);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
