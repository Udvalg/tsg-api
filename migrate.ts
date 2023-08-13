import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from 'kysely';
import { run } from 'kysely-migration-cli';
import path from 'path';
import { promises as fs } from 'fs';
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    path,
    fs,
    migrationFolder: path.resolve(process.cwd(), './migrations'),
  }),
});

run(db as any, migrator as any);
