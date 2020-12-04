const express = require("express");
var cors = require("cors");
const app = express();
const apiRouter = require("./routers/api.router");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use("/api", apiRouter);

module.exports = app;
