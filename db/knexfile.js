const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const defaults = {
  client: "postgresql",
  connection: {
    user: DB_USERNAME,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
    password: DB_PASSWORD,
  },
};



module.exports = {
  staging: {
    ...defaults,
    // debug: true,
    pool: { min: 0, max: 20, idleTimeoutMillis: 300000 },
    useNullAsDefault: true,
  },

  production: {
    ...defaults,
    debug: false,
    pool: { min: 0, max: 20, idleTimeoutMillis: 300000 },
    useNullAsDefault: true,
  },
};
