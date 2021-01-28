const {
  fetchDates,
  fetchDateById,
  insertDate,
} = require("../models/dates.models");

exports.getDates = (req, res, next) => {
  console.log(req.query);
  if (
    Object.keys(req.query).length &&
    !Object.keys(req.query).every(
      (key) =>
        key === "sort_by" || key === "order_by" || "timings" || "categories"
    )
  )
    throw "invalid query key";
  const timings = req.query.timings ? req.query.timings : undefined;
  if (
    timings &&
    !timings.every(
      (timing) =>
        timing === "Morning" || timing === "Afternoon" || timing === "Evening"
    )
  )
    throw "invalid timing query value";
  const sorting = req.query.sort_by ? req.query.sort_by : undefined;
  if (sorting && sorting !== "timings" && sorting !== "categories")
    throw "invalid query value";
  const order = req.query.order_by ? req.query.order_by.toUpperCase() : "ASC";
  if (order !== "ASC" && order !== "DESC") throw "invalid query value";
  fetchDates(sorting, req.params, order)
    .then((dates) => {
      res.status(200).send({ dates });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getDateById = (req, res, next) => {
  const id = req.params[Object.keys(req.params)[0]];
  if (
    !id
      .toString()
      .split("")
      .every((character) => /\d/.test(character))
  )
    throw "Invalid id";
  fetchDateById(id)
    .then((date) => {
      if (!date.rows.length) return Promise.reject("entry not found");
      res.status(200).send(date.rows[0]);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postDate = (req, res, next) => {
  const { body } = req;
  const keys = Object.keys(body);
  if (
    keys.length !== 4 ||
    new Set(keys).size !== keys.length ||
    !keys.every(
      (key) =>
        key === "date_name" ||
        key === "date_description" ||
        key === "timings" ||
        key === "categories"
    )
  )
    throw "Invalid body keys";
  else if (
    !body.date_name ||
    body.date_name.match(/(\w||\s)+/)[0].length !== body.date_name.length ||
    !body.timings.every(
      (timing) =>
        timing === "Morning" || timing === "Afternoon" || timing === "Evening"
    ) ||
    !body.categories.every(
      (category) =>
        category === "Food and Drink" ||
        category === "Outdoors" ||
        category === "Games" ||
        category === "Streaming" ||
        category === "Social"
    )
  )
    throw "Invalid body values";

  insertDate(body)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      next(err);
    });
};
