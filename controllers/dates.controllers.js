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
  insertDate(req.body)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      next(err);
    });
};
