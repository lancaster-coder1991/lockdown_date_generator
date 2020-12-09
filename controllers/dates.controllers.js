const { fetchDates } = require("../models/dates.models");

exports.getDates = (req, res, next) => {
  fetchDates()
    .then((dates) => {
      res.status(200).send({ dates });
    })
    .catch((err) => {
      next(err);
    });
};
