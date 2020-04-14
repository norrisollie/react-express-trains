import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.sass";

class UpdateStationInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationName: "",
      stationCode: ""
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get("http://localhost:8082/api/stations/" + this.props.match.params.id)
      .then(res => {
        // this.setState({...this.state, station: res.data})
        this.setState({
          stationName: res.data.stationName,
          code: res.data.stationCode
        });
      })
      .catch(err => {
        console.log("Error from UpdateStationInfo");
      });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      stationName: this.state.stationName,
      stationCode: this.state.stationCode
    };

    axios
      .put(
        "http://localhost:8082/api/stations/" + this.props.match.params.id,
        data
      )
      .then(res => {
        this.props.history.push("/show-station/" + this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateStationInfo!");
      });
  };

  render() {
    return (
      <div className="UpdateStationInfo">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show Station List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Station</h1>
              <p className="lead text-center">Update Station's Info</p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="stationName">Title</label>
                <input
                  type="text"
                  placeholder="Title of the Station"
                  name="stationName"
                  className="form-control"
                  value={this.state.stationName}
                  onChange={this.onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <label htmlFor="stationCode">ISBN</label>
                <input
                  type="text"
                  placeholder="ISBN"
                  name="stationCode"
                  className="form-control"
                  value={this.state.stationCode}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-outline-info btn-lg btn-block"
              >
                Update Station
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateStationInfo;
