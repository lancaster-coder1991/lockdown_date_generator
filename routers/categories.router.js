const categoriesRouter = require("express").Router();
const { getCategories } = require("../controllers/categories.controllers");
const { handle405s } = require("../errors");

categoriesRouter.route("/").get(getCategories).all(handle405s);

module.exports = categoriesRouter;
