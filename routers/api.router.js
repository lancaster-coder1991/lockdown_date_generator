const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router");
const timingsRouter = require("./timings.router");
const datesRouter = require("./dates.router");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/timings", timingsRouter);
apiRouter.use("/dates", datesRouter);

module.exports = apiRouter;
