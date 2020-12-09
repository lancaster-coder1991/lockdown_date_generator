const { fetchTimings } = require("../models/timings.models");

exports.getTimings = (req, res, next) => {
  fetchTimings()
    .then((timings) => {
      res.status(200).send({ timings });
    })
    .catch((err) => {
      next(err);
    });
};
