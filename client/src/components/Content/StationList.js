import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../../App.sass";
import axios from "axios";
import { Link } from "react-router-dom";
import StationCard from "../StationCard";
import { TransitionGroup } from "react-transition-group";

const StationCardMemo = React.memo(StationCard);

class StationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationsLoading: true,
      stations: [],
      filter: "",
      filteredStations: []
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:8082/api/stations")
      .then(res => {
        this.setState({
          stations: res.data,
          stationsLoading: false
        });
      })
      .catch(err => {
        console.log("Error from StationList");
      });
  };

  changeHandler = async (event, filter) => {
    await this.setState({ filter: event.target.value });

    let filteredStations;

    if (this.state.filter.length >= 2) {
      filteredStations = this.state.stations.filter(station => {
        return (
          station.station_name.toLowerCase().indexOf(filter.toLowerCase()) > -1
        );
      });

      this.setState({ filteredStations });
    } else {
      this.setState({ filteredStations: [] });
    }
  };

  render() {
    console.log(this.state.filteredStations);

    const filtered = this.state.filteredStations.map((station, k) => {
      return <StationCardMemo station={station} key={k} />;
    });

    return (
      <div className="inner-wrapper">
        {this.state.stationsLoading ? (
          <div className="inner-section loading-stations">
            <div>Loading Stations</div> <img src="/assets/loader.svg" />
          </div>
        ) : (
          <div className="inner-section">
            <div className="inner-section filter-input">
              <input
                placeholder="Filter Stations"
                className="filter"
                name="filter"
                autoComplete="off"
                onChange={e => {
                  this.changeHandler(e, this.state.filter);
                }}
                value={this.state.searchKeyword}
              />
            </div>
            <div className="inner-section filtered-stations">{filtered}</div>
          </div>
        )}
      </div>
    );
  }
}

export default StationList;
