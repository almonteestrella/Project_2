var express = require("express");
var router = express.Router();
var fs = require("fs");

var db = require("../models/index");

require("dotenv").config();

("use strict");

const yelp = require("yelp-fusion");
const client = yelp.client(process.env.apikey);

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
  db.bodysafereview
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

  // console.log(db.bodysafereview);
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
        // insp_date: { [Op.gte]: "2019-01-01" }
      },
      group: ["lat", "lon", "est_name", "serv_type_desc"]
    })
    .then(results => res.send(JSON.stringify(results)));
});

router.get("/s2/:name", function(req, res, next) {
  let name = req.params.name.toUpperCase();
  const Op = require("sequelize").Op;
  // console.log(db.bodysafereview);
  db.bodysafereview
    .findAll({
      attributes: [
        "lat",
        "lon",
        "addr",
        ["est_name", "name"],
        ["serv_type_desc", "cat"]
      ],
      where: {
        [Op.or]: {
          est_name: { [Op.like]: `%${name}%` },
          addr: { [Op.like]: `%${name}%` }
        }
      },
      group: ["lat", "lon", "addr", "est_name", "serv_type_desc"]
    })
    .then(results => res.send(JSON.stringify(results)));
});

router.get("/review/:cat/:name/:lat/:lon", function(req, res, next) {
  let cat = req.params.cat;
  let name = req.params.name;
  let nlat = req.params.lat;
  let nlon = req.params.lon;

  db.bodysafereview
    .findAll({
      attributes: [
        "lat",
        "lon",
        "addr",
        "postal",
        ["insp_date", "date"],
        ["insp_status_desc", "status"],
        ["infr_type_desc", "infraction"],
        ["est_name", "name"],
        ["serv_type_desc", "cat"]
      ],
      where: {
        est_name: [name],
        lat: [nlat],
        lon: [nlon],
        serv_type_desc: [cat]
      },
      order: [["insp_date", "DESC"]]
    })
    .then(results => {
      client
        .businessMatch({
          name: name,
          address1: results[0].addr,
          city: "Toronto",
          state: "ON",
          country: "CA",
          latitude: nlat,
          longitude: nlon
        })
        .then(response => {
          let busID;
          if (typeof response.jsonBody.businesses[0] === "undefined") {
            res.send(JSON.stringify(results));
          } else {
            busId = response.jsonBody.businesses[0].alias;
            client
              .business(busId)
              .then(response => {
                results[0].dataValues.rating = response.jsonBody.rating;
                client
                  .reviews(busId)
                  .then(response => {
                    results[0].dataValues.review = response.jsonBody;
                    // console.log(results[0].dataValues);
                    res.send(JSON.stringify(results));
                  })
                  .catch(e => {
                    console.log(e);
                  });
                
              })
              .catch(e => {
                console.log(e);
              });
          }
        })
        .catch(e => {
          console.log(e);
        });
    });
});

module.exports = router;
