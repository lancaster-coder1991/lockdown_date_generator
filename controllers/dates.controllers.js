const { fetchDates } = require("../models/dates.models");

exports.getDates = (req, res, next) => {
  console.log(req.params);
  fetchDates(req.query, req.params)
    .then((dates) => {
      res.status(200).send({ dates });
    })
    .catch((err) => {
      next(err);
    });
};
