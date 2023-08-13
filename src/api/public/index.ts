import { Request, Response, Router } from 'express';
import { query, validationResult } from 'express-validator';

export default (app: Router): Router => {
  app.get(
    '/newsfeed',
    query('page').isNumeric().optional(),
    query('limit').isNumeric().optional(),
    async (req: Request, res: Response, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      res.setHeader('Content-Type', 'text/plain');
      res.send('Hello world!');
    }
  );

  return app;
};
