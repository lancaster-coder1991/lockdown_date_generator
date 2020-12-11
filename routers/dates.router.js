const datesRouter = require("express").Router();
const {
  getDates,
  getDatesByFilter,
} = require("../controllers/dates.controllers");

datesRouter.route("/").get(getDates);
datesRouter.route("/filter/timings/:timing").get(getDates);
datesRouter.route("/filter/categories/:category").get(getDates);

module.exports = datesRouter;
