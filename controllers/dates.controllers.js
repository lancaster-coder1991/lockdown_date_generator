const {
  fetchDates,
  fetchDateById,
  insertDate,
} = require("../models/dates.models");

exports.getDates = (req, res, next) => {
  fetchDates(req.query, req.params)
    .then((dates) => {
      res.status(200).send({ dates });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getDateById = (req, res, next) => {
  const id = req.params[Object.keys(req.params)[0]];
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
    keys.length !== 4 &&
    new Set(keys).size !== keys.length &&
    !keys.every(
      (key) =>
        key === "date_name" ||
        key === "date_description" ||
        key === "timings" ||
        key === "categories"
    )
  )
    throw { status: 400, msg: "Invalid body keys, please amend your request." };
  else if (
    !body.date_name ||
      body.date_name.match(/\w+/).length !== body.date_name.length ||
      
  ) {
  }
  insertDate(req.body)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      next(err);
    });
};
