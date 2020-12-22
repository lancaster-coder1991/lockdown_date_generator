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
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      next(err);
    });
};
