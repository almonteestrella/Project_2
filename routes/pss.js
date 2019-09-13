var express = require("express");
var router = express.Router();

var db = require("../models/index");

/* GET users listing. */
router.get("/:lat/:lon/:cat?", function(req, res, next) {
  let lat = parseFloat(req.params.lat);
  let lon = parseFloat(req.params.lon);
  let cat = req.params.cat || "all";
  res.send("lat: " + lat + ", long: " + lon + ", category: " + cat);
});

// category

// area

module.exports = router;
