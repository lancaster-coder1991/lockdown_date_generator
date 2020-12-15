const { fetchDates, insertDate } = require("../models/dates.models");

exports.getDates = (req, res, next) => {
  fetchDates(req.query, req.params)
    .then((dates) => {
      res.status(200).send({ dates });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postDate = (req, res, next) => {
  insertDate(req.body)
    .then((insertedRow) => {
      res.status(201).send({ body: insertedRow });
    })
    .catch((err) => {
      next(err);
    });
};
