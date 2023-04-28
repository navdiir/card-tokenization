export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || '0.0.0.0',
  databaseuri: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
  node_env: process.env.NODE_ENV || 'dev',
  jwt_secret: process.env.JWT_SECRET || 'hard-secret',
  jwt_expired_time: process.env.JWT_EXPIRED_TIME || '60s'
})