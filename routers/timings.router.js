const timingsRouter = require("express").Router();
const { getTimings } = require("../controllers/timings.controllers");
const { handle405s } = require("../errors");

timingsRouter.route("/").get(getTimings).all(handle405s);

module.exports = timingsRouter;
