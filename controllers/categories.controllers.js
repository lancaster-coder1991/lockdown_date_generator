const { fetchCategories } = require("../models/categories.models");

exports.getCategories = (req, res, next) => {
  console.log(process.env.LOCAL_CONNECTION_STRING);
  fetchCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};
