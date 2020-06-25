const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  station_name: {
    type: String,
    required: true,
  },
});

module.exports = Station = mongoose.model(
  "StationList",
  StationSchema,
  "StationList"
);
