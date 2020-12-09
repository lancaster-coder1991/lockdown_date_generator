const pool = require("../db_connect");

exports.fetchCategories = () => {
  return pool.connect().then((client) => {
    client.query("SELECT * FROM categories;").then((res) => {
      console.log("model response:", res);
      client.release();
      return res.rows;
    });
  });
};
