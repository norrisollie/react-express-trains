import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.sass";
import axios from "axios";

class CreateStation extends Component {
  constructor() {
    super();
    this.state = {
      station_name: "",
      crs_code: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      station_name: this.state.station_name,
      crs_code: this.state.crs_code
    };

    axios
      .post("http://localhost:8082/api/stations", data)
      .then(res => {
        this.setState({
          station_name: "",
          crs_code: ""
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log("Error in CreateStation!");
      });
  };

  render() {
    return (
      <div className="CreateStation">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/" className="btn btn-outline-warning float-left">
                Show BooK List
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Station</h1>
              <p className="lead text-center">Add New Station</p>

              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Station Name"
                    name="station_name"
                    className="form-control"
                    value={this.state.station_name}
                    onChange={this.onChange}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="CRS Code"
                    name="crs_code"
                    className="form-control"
                    value={this.state.crs_code}
                    onChange={this.onChange}
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-outline-warning btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateStation;
