const { Pool } = require("pg");
require("dotenv").config();
const { DB_USER, DB_NAME } = process.env;
const ENV = process.env.DATABASE_URL ? "development" : "test";

const pool =
  ENV === "development"
    ? new Pool({
        // connectionString: process.env.DATABASE_URL,
        connectionString:
          "postgres://zevmkvyudjpark:0f3a725645461813e70a0a8c7ba234cc623e791af45b97b4a1ba34c71070a55a@ec2-52-214-38-135.eu-west-1.compute.amazonaws.com:5432/d22e7dqidakad3",
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
