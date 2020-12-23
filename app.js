const express = require("express");
var cors = require("cors");
const app = express();
const apiRouter = require("./routers/api.router");
const { handle404EntryNotFound } = require("./errors");

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  //why doesn't this work?
  console.log("hi from the app");
});

module.exports = app;
