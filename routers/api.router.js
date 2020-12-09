const apiRouter = require("express").Router();
const categoriesRouter = require("./categories.router");

apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/", (req, res) => {
  res.send(
    "This is the Lockdown Date Generator API. Consult the documentation for the available endpoints and methods."
  );
});
// apiRouter.use("/topics", topicsRouter);
// apiRouter.use("/users", usersRouter);
// apiRouter.use("/articles", articlesRouter);
// apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
