require('dotenv').config();
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DB_PORT,
  DB_DIALECT
} = process.env;

module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT,
    "port": DB_PORT,
    "timezone": '+07:00'
  },
  "test": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT,
    "port": DB_PORT,
    "timezone": '+07:00'
  },
  "production": {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": DB_DIALECT,
    "port": DB_PORT,
    "timezone": '+07:00'
  }
}