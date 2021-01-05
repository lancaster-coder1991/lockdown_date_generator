const datesRouter = require("express").Router();
const {
  getDates,
  getDateById,
  postDate,
} = require("../controllers/dates.controllers");
const { handle405s } = require("../errors");

datesRouter.route("/").get(getDates).post(postDate).all(handle405s);
datesRouter.route("/:date_id").get(getDateById);
datesRouter.route("/filter/timings/:timing").get(getDates);
datesRouter.route("/filter/categories/:category").get(getDates);

module.exports = datesRouter;
