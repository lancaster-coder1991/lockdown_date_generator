const e = require("express");
const pool = require("../db_connect");

exports.fetchDates = (query) => {
  const { sort_by } = query;
  return pool
    .connect()
    .then((client) => {
      if (sort_by) {
        const idLabel = sort_by === "timings" ? "timing" : "category";
        return client
          .query(
            `SELECT * FROM dates JOIN date_${sort_by} ON dates.date_id=date_${sort_by}.date_id ORDER BY ${idLabel}_id;`
          )
          .then((res) => {
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
