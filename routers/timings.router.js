const timingsRouter = require("express").Router();
const { getTimings } = require("../controllers/timings.controllers");
const { handle404NotFound } = require("../errors");

timingsRouter.route("/").get(getTimings);
timingsRouter.use("/*", handle404NotFound);

module.exports = timingsRouter;
