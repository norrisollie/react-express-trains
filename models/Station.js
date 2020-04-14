// models/Station.js

const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  station_name: {
    type: String,
    required: true
  },
  crs_code: {
    type: String,
    required: true
  }
});

module.exports = Station = mongoose.model(
  "StationList",
  StationSchema,
  "StationList"
);
