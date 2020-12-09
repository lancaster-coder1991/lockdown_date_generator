const { Client } = require("pg");

const client = new Client({
  user: "george",
  host: "localhost",
  database: "lockdown_dates",
  password: "georgescott123",
  port: 5432,
});

exports.fetchCategories = () => {
  client.connect();
  const executeQuery = async () => {
    return await client.query("SELECT * FROM categories;").then((res) => {
      client.end();
      return res.rows;
    });
  };
  return executeQuery();
};
