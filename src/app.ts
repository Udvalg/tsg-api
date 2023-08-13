import express from 'express';

import logger from './logger';
import morgan from 'morgan';

import publicApi from './api/public';

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }
);

const generalMiddlewares = [express.json(), morganMiddleware];

const app = express();

const publicRouter = express.Router();
publicRouter.use([...generalMiddlewares]);
publicApi(publicRouter);

app.use('/public', publicRouter);

// app.get('/public', (req, res) => {
//   res.send('Hello World!');
// });

export default app;
