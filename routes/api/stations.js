// routes/api/stations.js

const express = require("express");
const router = express.Router();

// Load Station model
const Station = require("../../models/Station");

// @route GET api/stations
// @description Get all stations
// @access Public
router.get("/", (req, res) => {
  Station.find()
    .then((stations) => {
      console.log("something?");
      res.json(stations);
    })
    .catch((err) =>
      res.status(404).json({ nostationsfound: "No stations found" })
    );
});

// @route GET api/stations/:id
// @description Get single Station by id
// @access Public
router.get("/:id", (req, res) => {
  Station.findById(req.params.id)
    .then((Station) => res.json(Station))
    .catch((err) =>
      res.status(404).json({ noStationfound: "No Station found" })
    );
});

// @route GET api/stations
// @description add/save Station
// @access Public
router.post("/", (req, res) => {
  Station.create(req.body)
    .then((Station) => res.json({ msg: "Station added successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this Station" })
    );
});

// @route GET api/stations/:id
// @description Update Station
// @access Public
router.put("/:id", (req, res) => {
  Station.findByIdAndUpdate(req.params.id, req.body)
    .then((Station) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/stations/:id
// @description Delete Station by id
// @access Public
router.delete("/:id", (req, res) => {
  Station.findByIdAndRemove(req.params.id, req.body)
    .then((Station) => res.json({ mgs: "Station entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a Station" }));
});

module.exports = router;
