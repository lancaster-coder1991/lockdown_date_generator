const pool = require("../db_connect");

//If there is either timings or categories
exports.fetchDates = () => {
  return pool
    .connect()
    .then((client) => {
      return client
        .query(
          "SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id JOIN timings ON date_timings.timing_id=timings.timing_id JOIN date_categories ON dates.date_id=date_categories.date_id JOIN categories ON date_categories.category_id=categories.category_id "
        )
        .then((res) => {
          client.release();
          return res.rows;
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.fetchDateById = (id) => {
  return pool.connect().then((client) => {
    return client
      .query(`SELECT * FROM dates WHERE date_id=${id}`)
      .then((res) => {
        client.release();
        return res;
      });
  });
};

exports.insertDate = (date) => {
  return pool.connect().then((client) => {
    const datesQueryStr = `INSERT INTO dates(date_name, date_description) VALUES('${date.date_name}', '${date.date_description}') RETURNING *`;
    const timingsQueries = date.timings.map((timing) =>
      client.query(
        `SELECT timing_id FROM timings WHERE timing_name='${timing}'`
      )
    );
    return Promise.all(timingsQueries)
      .then((resArr) => {
        const timingIDs = resArr.map((res) => res.rows[0].timing_id);
        const categoriesQueries = date.categories.map((category) =>
          client.query(
            `SELECT category_id FROM categories WHERE category_name='${category}'`
          )
        );
        return Promise.all([...categoriesQueries, timingIDs]);
      })
      .then((response) => {
        const timingIDs = response[response.length - 1];
        const categoryIDs = response
          .slice(0, response.length - 1)
          .map((res) => res.rows[0].category_id);
        return Promise.all([
          client.query(datesQueryStr),
          categoryIDs,
          timingIDs,
        ]);
      })
      .then(([insertDateResponse, categoryIDs, timingIDs]) => {
        const insertDateTimingQueries = timingIDs.map((ID) =>
          client.query(
            `INSERT INTO date_timings(timing_id, date_id) VALUES(${ID}, ${insertDateResponse.rows[0].date_id}) RETURNING *`
          )
        );
        const insertDateCategoryQueries = categoryIDs.map((ID) =>
          client.query(
            `INSERT INTO date_categories(category_id, date_id) VALUES(${ID}, ${insertDateResponse.rows[0].date_id}) RETURNING *`
          )
        );
        return Promise.all([
          insertDateResponse,
          ...insertDateTimingQueries,
          ...insertDateCategoryQueries,
        ]);
      })
      .then((resArr) => {
        client.release();
        return resArr;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
