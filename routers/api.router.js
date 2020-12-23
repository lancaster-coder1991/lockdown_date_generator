const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router");
const timingsRouter = require("./timings.router");
const datesRouter = require("./dates.router");
const { handle404NotFound } = require("../errors");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/timings", timingsRouter);
apiRouter.use("/dates", datesRouter);
apiRouter.use("/*", handle404NotFound);

module.exports = apiRouter;
