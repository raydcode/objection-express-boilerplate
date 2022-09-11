const knex = require("knex");

const knexFile = require("./knexfile");

const DB = knex(knexFile[process.env.NODE_ENV]);

module.exports = DB;
