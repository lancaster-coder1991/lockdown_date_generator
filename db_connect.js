const { Pool } = require("pg");

const pool = new Pool({
  user: "george",
  host: "localhost",
  database: "lockdown_dates",
  password: "georgescott123",
  port: 5432,
});

module.exports = pool;
