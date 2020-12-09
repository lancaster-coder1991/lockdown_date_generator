const { fetchCategories } = require("../models/categories.models");

exports.getCategories = (req, res, next) => {
  fetchCategories()
    .then((categories) => {
      console.log({ categories });
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};
