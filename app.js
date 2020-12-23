const express = require("express");
var cors = require("cors");
const app = express();
const apiRouter = require("./routers/api.router");
const { handle404NotFound } = require("./errors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handle404NotFound);

module.exports = app;
