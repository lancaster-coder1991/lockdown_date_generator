const { Pool } = require("pg");
const { connectionString } = process.env;
const ENV = process.env.DATABASE_URL ? "development" : "test";

const pool =
  ENV === "development"
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
      })
    : new Pool({ connectionString });

console.log(pool);

module.exports = pool;
