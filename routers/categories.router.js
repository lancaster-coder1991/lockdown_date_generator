const categoriesRouter = require("express").Router();
const { getCategories } = require("../controllers/categories.controllers");
const { handle404NotFound } = require("../errors");

categoriesRouter.route("/").get(getCategories);
categoriesRouter.use("/*", handle404NotFound);

module.exports = categoriesRouter;
