var express = require("express");
var router = express.Router();
var fs = require("fs");

var db = require("../models/index");

/* GET users listing. */
router.get("/lat/:lat/lon/:lon/:cat?", function (req, res, next) {
  let lat = parseFloat(req.params.lat);
  let lon = parseFloat(req.params.lon);
  let cat = req.params.cat || "all";
  res.send("lat: " + lat + ", long: " + lon + ", category: " + cat);
});

// return list of items
router.get("/r/:itmes", function (req, res, next) {
  let dataset = require("../dataset/BodySafe.json");
  let data = [];
  for (i = 0; i < req.params.itmes; i++) {
    data.push(dataset[i]);
  }

  // console.log(JSON.stringify(data))

  res.send(JSON.stringify(data));
});

// return list of items
router.get("/f", function (req, res, next) {
  let dataset = require("../dataset/BodySafe.json");
  let data = {};
  for (i = 0; i < dataset.length; i++) {
    // console.log('id'+dataset[i].servID)
    data["id"+dataset[i].servID] = {
      name: dataset[i].estName,
      lat: dataset[i].lat,
      lon: dataset[i].lon
    };
  }

  // console.log(JSON.stringify(data))

  res.send(JSON.stringify(data));
});

router.get("/all", function (req, res, next) {
  let dataset = require("../dataset/BodySafe.json");

  // console.log(JSON.stringify(data))

  res.send(JSON.stringify(dataset));
});

// category

// area

module.exports = router;
