const pool = require("../db_connect");

exports.fetchDates = (timings, categories, sorting, order) => {
  console.log(timings, categories, sorting, order);
  return pool
    .connect()
    .then((client) => {
      let queryStr;
      if (sorting && timings && categories) {
        const orderBy =
          sorting === "timings"
            ? "timings.timing_id"
            : "categories.category_name";
        queryStr = `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id JOIN timings ON date_timings.timing_id=timings.timing_id JOIN date_categories ON dates.date_id=date_categories.date_id JOIN categories ON date_categories.category_id=categories.category_id WHERE timings.timing_name IN (${timings.join(
          ", "
        )} AND WHERE categories.category_name IN (${categories.join(
          ", "
        )}) ORDER BY ${orderBy} ${order}`;
      } else if (sorting && timings) {
        queryStr =
          sorting === "timings"
            ? `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id JOIN timings ON date_timings.timing_id=timings.timing_id JOIN date_categories ON dates.date_id = date_categories.date_id JOIN categories ON date_categories.category_id = categories.category_id WHERE timings.timing_name IN (${timings.join(
                ", "
              )}) ORDER BY timings.timing_id ${order}`
            : `SELECT * FROM dates JOIN date_categories ON dates.date_id=date_categories.date_id JOIN categories ON date_categories.category_id=categories.category_id JOIN date_timings ON dates.date_id=date_timings.date_id JOIN timings ON date_timings.timing_id=timings.timing_id WHERE timings.timing_name IN (${timings.join(
                ", "
              )}) ORDER BY categories.category_name ${order};`;
      } else if (sorting && categories) {
        console.log("hitting correct sorting block");
        queryStr =
          sorting === "timings"
            ? `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id JOIN timings ON date_timings.timing_id=timings.timing_id JOIN date_categories ON dates.date_id = date_categories.date_id JOIN categories ON date_categories.category_id = categories.category_id WHERE categories.category_name IN (${categories.join(
                ", "
              )}) ORDER BY timings.timing_id ${order}`
            : `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id JOIN timings ON date_timings.timing_id=timings.timing_id JOIN date_categories ON dates.date_id = date_categories.date_id JOIN categories ON date_categories.category_id = categories.category_id WHERE categories.category_name IN (${categories.join(
                ", "
              )}) ORDER BY categories.category_name ${order};`;
      } else if (timings && categories) {
        queryStr = `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id JOIN timings ON date_timings.timing_id=timings.timing_id JOIN date_categories ON dates.date_id=date_categories.date_id JOIN categories ON date_categories.category_id=categories.category_id WHERE timings.timing_name IN (${timings.join(
          ", "
        )} AND WHERE categories.category_name IN (${categories.join(
          ", "
        )}) ORDER BY date_name ${order}`;
      } else if (sorting) {
        queryStr =
          sorting === "timings"
            ? `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id ORDER BY timing_id ${order}`
            : `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id ORDER BY category_id${order}`;
      } else if (timings) {
        queryStr = `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id JOIN timings ON date_timings.timing_id=timings.timing_id JOIN date_categories ON dates.date_id=date_categories.date_id JOIN categories ON date_categories.category_id=categories.category_id WHERE timing_name IN (${timings.join(
          ", "
        )}) ORDER BY date_name ${order}`;
      } else if (categories) {
        queryStr = `SELECT * FROM dates JOIN date_timings ON dates.date_id=date_timings.date_id JOIN timings ON date_timings.timing_id=timings.timing_id JOIN date_categories ON dates.date_id=date_categories.date_id JOIN categories ON date_categories.category_id=categories.category_id WHERE categories.category_name IN (${categories.join(
          ", "
        )}) ORDER BY date_name ${order}`;
      } else {
        queryStr = `SELECT * FROM dates ORDER BY date_name ${order};`;
      }
      return client.query(queryStr).then((res) => {
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
