import config from '../src/config';
import { Kysely, PostgresDialect } from 'kysely';
import * as pg from 'pg';

export interface Database {}

const Pool = pg.Pool;

export const db = new Kysely<Database>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: config.dbHost,
      database: config.dbDatabase,
      user: config.dbUser,
      password: config.dbPassword,
      port: config.dbPort,
    }),
  }),
});
