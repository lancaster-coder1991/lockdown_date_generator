const datesRouter = require("express").Router();
const {
  getDates,
  getDateById,
  postDate,
} = require("../controllers/dates.controllers");
const { handle405s } = require("../errors");

datesRouter.route("/").get(getDates).post(postDate).all(handle405s);
datesRouter.route("/filter/:date_id").get(getDateById);

module.exports = datesRouter;
