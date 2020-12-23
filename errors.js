exports.handle404NotFound = (err, req, res, next) => {
  console.log("hello");
  if ((err = "entry not found")) {
    console.log(err);
    res.status(404).send({ msg: "entry not found" });
  } else {
    console.log(err);
    res.status(404).send({ msg: "path not found" });
  }
};
