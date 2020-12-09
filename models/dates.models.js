const pool = require("../db_connect");

exports.fetchDates = () => {
  pool.connect();
  const executeQuery = async () => {
    return await pool.query("SELECT * FROM dates;").then((res) => {
      return res.rows;
    });
  };
  return executeQuery();
};
