exports.handle404PathNotFound = (req, res) => {
  console.log("Calling 404 path not found");
  res.status(404).send({
    msg: "Path not found - please consult the documentation for valid paths.",
  });
};

exports.handle404EntryNotFound = (err, req, res, next) => {
  console.log("calling 404 entry not found");
  if (err === "entry not found") {
    res.status(404).send({ msg: "entry not found" });
  } else {
    next(err);
  }
};
