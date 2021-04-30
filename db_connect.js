const { Pool } = require("pg");
require("dotenv").config();
const { DB_USER, DB_NAME } = process.env;
const ENV = process.env.DATABASE_URL ? "development" : "test";

const pool =
  ENV === "development"
    ? new Pool({
        // connectionString: process.env.DATABASE_URL,
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      })
    : new Pool({
        host: "localhost",
        user: DB_USER,
        database: DB_NAME,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
      });

module.exports = pool;
