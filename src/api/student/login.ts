import { Request, Response, Router } from 'express';
import { query, validationResult } from 'express-validator';
import { db } from '../../database';

export default (app: Router): Router => {
  app.get(
    '/sign-up',
    query('user_name').isString(),
    query('password').isString(),
    query('student_id').isString(),
    query('gmail').isEmail(),
    async (req: Request, res: Response, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { user_name, password, student_id, gmail } = req.query;
    }
  );

  return app;
};
