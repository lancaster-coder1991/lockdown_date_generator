exports.handle404EntryNotFound = (err, req, res, next) => {
  console.log("calling 404 entry not found");
  if (err === "entry not found") {
    res.status(404).send({ msg: "entry not found" });
  } else {
    res.status(404).send({ msg: "test" });
  }
};
