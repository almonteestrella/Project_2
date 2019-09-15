var express = require("express");
var router = express.Router();
var fs = require("fs");

var db = require("../models/index");

/* GET users listing. */
router.get("/lat/:lat/lon/:lon/:cat?", function(req, res, next) {
  let lat = parseFloat(req.params.lat);
  let lon = parseFloat(req.params.lon);
  let cat = req.params.cat || "all";
  res.send("lat: " + lat + ", long: " + lon + ", category: " + cat);
});

// return list of items
router.get("/f/:count?", function(req, res, next) {
  let dataset = require("../dataset/BodySafe.json");
  let countReturn = dataset.length;
  if (req.params.count !== "all") {
    countReturn = req.params.count;
  }
  let data = {};
  for (i = 0; i < countReturn; i++) {
    // console.log('id'+dataset[i].servID)
    data["id" + dataset[i].servID] = {
      name: dataset[i].estName,
      lat: dataset[i].lat,
      lon: dataset[i].lon,
      cat: dataset[i].servTypeDesc
    };
  }
  res.send(JSON.stringify(data));
});

// return list of items
router.get("/db", function(req, res, next) {
  db.review
    .findAll({
      attributes: [
        "lat",
        "lon",
        ["est_name", "name"],
        ["serv_type_desc", "cat"]
      ],
      group: ["est_name"]
    })
    .then(results => res.send(JSON.stringify(results)));
});

router.get("/db/:catego", function(req, res, next) {
  let catego = req.params.catego;
  console.log(db.bodysafereview);
  db.bodysafereview
    .findAll({
      attributes: [
        "lat",
        "lon",
        ["est_name", "name"],
        ["serv_type_desc", "cat"]
      ],
      where: {
        serv_type_desc: [catego]
      },
      group: ["est_name"]
    })
    .then(results => res.send(JSON.stringify(results)));
});

router.get("/review/:name", function(req, res, next) {
  let name = req.params.name;
  console.log(db.bodysafereview);
  db.bodysafereview
    .findAll({
      attributes: [
        "lat",
        "lon",
        ["insp_date", "date"],
        ["insp_status_desc", "status"],
        ["infr_type_desc", "infraction"],
        ["est_name", "name"],
        ["serv_type_desc", "cat"]
      ],
      where: {
        est_name: [name]
      }
    })
    .then(results => res.send(JSON.stringify(results)));
});

module.exports = router;
