const pool = require("../db_connect");

exports.fetchTimings = () => {
  return pool.connect().then((client) => {
    return client.query("SELECT * FROM timings;").then((res) => {
      client.release();
      return res.rows;
    });
  });
};
