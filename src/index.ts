if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import 'dotenv/config';

const port = 4000;

import app from './app';
import './config';

app.listen(port, async () => {
  console.log(`😺 TSG backend server listening at http://localhost:${port}`);
});
