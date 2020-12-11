const e = require("express");
const pool = require("../db_connect");

exports.fetchDates = (query) => {
  const { sort_by } = query;
  return pool
    .connect()
    .then((client) => {
      if (sort_by) {
        const queryStr =
          sort_by === "timings"
            ? `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id ORDER BY timing_id;`
            : `SELECT * FROM dates JOIN date_categories ON dates.date_id=date_categories.date_id JOIN categories on date_categories.category_id=categories.category_id ORDER BY category_name;`;
        return client.query(queryStr).then((res) => {
          console.log(res.rows);
          client.release();
          return res.rows;
        });
      } else {
        return client.query("SELECT * FROM dates;").then((res) => {
          client.release();
          return res.rows;
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
