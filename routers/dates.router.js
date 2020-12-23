const datesRouter = require("express").Router();
const {
  getDates,
  getDateById,
  postDate,
} = require("../controllers/dates.controllers");
const { handle404NotFound } = require("../errors");

datesRouter.route("/").get(getDates).post(postDate);
datesRouter.route("/:date_id").get(getDateById);
datesRouter.route("/filter/timings/:timing").get(getDates);
datesRouter.route("/filter/categories/:category").get(getDates);

module.exports = datesRouter;
