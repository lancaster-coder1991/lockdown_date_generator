const { Pool } = require("pg");
const { connectionString } = process.env;
const ENV = process.env.CONNECTION_STRING ? "development" : "test";

const pool =
  ENV === "development"
    ? new Pool({
        user: "zevmkvyudjpark",
        host: "ec2-52-214-38-135.eu-west-1.compute.amazonaws.com",
        database: "d22e7dqidakad3",
        password:
          "0f3a725645461813e70a0a8c7ba234cc623e791af45b97b4a1ba34c71070a55a",
        port: 5432,
      })
    : new Pool({ connectionString });

console.log({ connectionString });

module.exports = pool;
