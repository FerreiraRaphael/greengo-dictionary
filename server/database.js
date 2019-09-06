const knex = require('knex');
const knexfile = require('./knexfile');
const isProd = process.env.NODE_ENV === 'production';

const database = knex(isProd ? knexfile.production : knexfile.development);

module.exports = database;
