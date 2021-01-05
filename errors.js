exports.handle404PathNotFound = (req, res) => {
  console.log("Calling 404 path not found");
  res.status(404).send({
    msg: "Path not found - please consult the documentation for valid paths.",
  });
};

exports.handle404EntryNotFound = (err, req, res, next) => {
  console.log("calling 404 entry not found");
  if (err === "entry not found")
    res.status(404).send({ msg: "entry not found" });
  else next(err);
};

exports.handle400BadRequest = (err, req, res, next) => {
  console.log("calling 400 bad request");
  console.log(err);
  if (err === "Invalid body keys")
    res
      .status(400)
      .send({ msg: "Invalid body keys, please amend your request." });
  else if (err === "Invalid body values") {
    res
      .status(400)
      .send({ msg: "Invalid body values, please amend your request." });
  } else if (err === "Invalid id")
    res.status(400).send({ msg: "Invalid id, please amend your request." });
  else if (err === "invalid query value")
    res
      .status(400)
      .send({ msg: "Invalid query value, please amend your request." });
  else if (err === "invalid query key")
    res
      .status(400)
      .send({ msg: "Invalid query key, please amend your request." });
  else next(err);
};

exports.handle405s = (req, res, next) => {
  console.log("handle405s being called");
  res.status(405).send({ msg: "Invalid method" });
};
