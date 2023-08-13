"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kysely_1 = require("kysely");
var kysely_migration_cli_1 = require("kysely-migration-cli");
var path_1 = require("path");
var fs_1 = require("fs");
var pg_1 = require("pg");
var dotenv_1 = require("dotenv");
// Load environment variables
dotenv_1.default.config();
var db = new kysely_1.Kysely({
    dialect: new kysely_1.PostgresDialect({
        pool: new pg_1.Pool({
            connectionString: process.env.DATABASE_URL,
        }),
    }),
});
var migrator = new kysely_1.Migrator({
    db: db,
    provider: new kysely_1.FileMigrationProvider({
        path: path_1.default,
        fs: fs_1.promises,
        migrationFolder: path_1.default.resolve(process.cwd(), './migrations'),
    }),
});
(0, kysely_migration_cli_1.run)(db, migrator);
