export default {
  dbHost: process.env.DB_HOST || 'localhost',
  dbDatabase: process.env.DB_DATABASE || 'tsg',
  dbUser: process.env.DB_USER || 'postgres',
  dbPassword: process.env.DB_PASSWORD || 'secret',
  dbPort: parseInt(process.env.DB_PORT || '54321'),
  port: process.env.PORT || '4001',
};
