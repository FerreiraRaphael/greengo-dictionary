module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'test',
      password: 'test',
      database: 'test',
      port: 5432,
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
};
