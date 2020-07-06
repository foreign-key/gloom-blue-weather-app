import React, { Component } from "react";
import "./Weather.css";
import Location from "./Location";

var xhr;

class Weather extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      data: null,
      windowWidth: null,
    };

    this.mediaQuery = {
      desktop: 1200,
      tablet: 768,
      phone: 576,
    };

    this.processRequest = this.processRequest.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
  }

  searchLocation = (e) => {
    if (this._inputElement.value !== "") {
      xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `http://api.openweathermap.org/data/2.5/weather?q=${this._inputElement.value}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
        true
      );
      xhr.send();
      xhr.addEventListener("readystatechange", this.processRequest, false);
    }

    this._inputElement.focus();
    this._inputElement.value = "";

    e.preventDefault();
  };

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.setState({ windowWidth: document.body.clientWidth });
    });

    fetch(
      "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ countryList: data });
      });
  }

  processRequest(e) {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);

      this.setState({
        name: response.name,
        data: response,
      });

      const Capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      document.title = Capitalize(response.name) + " | Weather Forecast";
    }
  }

  render() {
    return (
      <div
        className="searchMain"
        style={{
          width:
            this.state.windowWidth > this.mediaQuery.phone ? "50%" : "100%",
        }}
      >
        <div className="header">
          <form onSubmit={this.searchLocation}>
            <input
              placeholder="Enter location"
              ref={(a) => (this._inputElement = a)}
            ></input>
            <button type="submit">Search</button>
          </form>
        </div>

        <Location {...this.state} />
      </div>
    );
  }
}

export default Weather;
