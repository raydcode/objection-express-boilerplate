const { postgraphile } = require("postgraphile");

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

module.exports = postgraphile(
  {
    database: DB_NAME,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
  },
  "public",
  {
    subscriptions: true,
    watchPg: true,
    dynamicJson: true,
    retryOnInitFail: true,
    setofFunctionsContainNulls: false,
    ignoreRBAC: false,
    showErrorStack: "json",
    extendedErrors: ["hint", "detail", "errcode"],
    appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
    exportGqlSchemaPath: "schema.graphql",
    graphiql: true,
    enhanceGraphiql: true,
    allowExplain(req) {
      // customise condition!
      return true;
    },
    enableQueryBatching: true,
    legacyRelations: "omit",
    pgSettings(req) {
      /*  */
    },
  }
);
