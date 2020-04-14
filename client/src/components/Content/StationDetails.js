import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../App.sass";
import axios from "axios";
import Map from "./MapContainer";

class showStationDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      station: {},
      stationLoaded: false
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get("http://localhost:8082/api/stations/" + this.props.match.params.id)
      .then(res => {
        // console.log("Print-showStationDetails-API-response: " + res.data);
        this.setState({
          station: res.data,
          stationLoaded: true
        });
      })
      .catch(err => {
        console.log("Error from ShowStationDetails");
      });
  }

  onDeleteClick(id) {
    axios
      .delete("http://localhost:8082/api/stations/" + id)
      .then(res => {
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error form ShowStationDetails_deleteClick");
      });
  }

  render = () => {
    const { station_name, crs_code, latitude, longitude } = this.state.station;

    return this.state.stationLoaded ? (
      <div className="inner-wrapper col">
        <div className="inner-section">
          <div className="title">{station_name + " (" + crs_code + ")"}</div>
        </div>
        <div className="inner-section map">
          <Map
            className="maps"
            options={{
              center: {
                lat: latitude,
                lng: longitude
              },
              zoom: 15
            }}
          />
        </div>
      </div>
    ) : (
      <div className="inner-wrapper col">LOADING</div>
    );
  };
}

export default showStationDetails;
