const express = require("express");
var cors = require("cors");
const app = express();
const apiRouter = require("./routers/api.router");
const { handle404EntryNotFound } = require("./errors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);
app.use(handle404EntryNotFound);

module.exports = app;
