const timingsRouter = require("express").Router();
const { getTimings } = require("../controllers/timings.controllers");

timingsRouter.route("/").get(getTimings);

module.exports = timingsRouter;
