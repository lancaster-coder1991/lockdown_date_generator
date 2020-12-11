const pool = require("../db_connect");

exports.fetchCategories = () => {
  return pool.connect().then((client) => {
    return client.query("SELECT * FROM categories;").then((res) => {
      client.release();
      return res.rows;
    });
  });
};
