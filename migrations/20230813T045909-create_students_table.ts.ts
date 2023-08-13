import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`.execute(db);
  await db.schema
    .createTable('students')
    .addColumn('id', 'uuid', (col) =>
      col.primaryKey().defaultTo(sql`uuid_generate_v4()`)
    )
    .addColumn('student_id', 'varchar')
    .addColumn('username', 'varchar', (col) => col.notNull())
    .addColumn('email', 'varchar')
    .addColumn('hash_password', 'varchar')
    .addColumn('phone_number', 'integer')
    .addColumn('cover_img', 'varchar')
    .addColumn('profile_img', 'varchar')
    .addColumn('work_detail', 'varchar')
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`)
    )
    .addColumn('updated_at', 'timestamptz')
    .addColumn('deleted_at', 'timestamptz')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('students').execute();
}
