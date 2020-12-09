const pool = require("../db_connect");

exports.fetchTimings = () => {
  pool.connect();
  const executeQuery = async () => {
    return await pool.query("SELECT * FROM timings;").then((res) => {
      return res.rows;
    });
  };
  return executeQuery();
};
