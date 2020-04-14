import React from "react";
import { Link } from "react-router-dom";
import "../App.sass";

const StationCard = props => {
  const station = props.station;

  return (
    <Link to={`/stations/${station._id}`}>
      <div className="station-card">
        <div className="nr-logo" />
        <span>{station.station_name}</span>
      </div>
    </Link>
  );
};

export default StationCard;
