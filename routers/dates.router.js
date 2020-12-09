const datesRouter = require("express").Router();
const { getDates } = require("../controllers/dates.controllers");

datesRouter.route("/").get(getDates);

module.exports = datesRouter;
