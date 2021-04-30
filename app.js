const express = require("express");
var cors = require("cors");
const app = express();
const apiRouter = require("./routers/api.router");

const {
  handle404EntryNotFound,
  handle404PathNotFound,
  handle400BadRequest,
} = require("./errors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handle404EntryNotFound);
app.use(handle400BadRequest);
app.use("*", handle404PathNotFound);

module.exports = app;
