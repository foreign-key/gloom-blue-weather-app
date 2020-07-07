import React, { Component } from "react";

import SearchInput from "./SearchInput";
import Details from "./Details";
import Container from "react-bootstrap/Container";
import GeoLocation from "./GeoLocation";

var xhr;

class Weather extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      isTempCelcius: true,
      coordinates: [],
      data: null,
      errorMessage: "",
      isMapVisible: false,
    };

    this.searchLocation = this.searchLocation.bind(this);
    this.tempChangeHandler = this.tempChangeHandler.bind(this);
  }

  searchLocation = (event, inputElement) => {
    if (inputElement.value !== "") {
      this.setState({
        isMapVisible: false,
      });

      xhr = new XMLHttpRequest();
      xhr.open(
        "GET",
        `http://api.openweathermap.org/data/2.5/weather?q=${inputElement.value}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`,
        true
      );
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            this.setState({
              name: response.name,
              data: response,
            });
            const Capitalize = (string) => {
              return string.charAt(0).toUpperCase() + string.slice(1);
            };
            document.title = Capitalize(response.name) + " | Weather Forecast";
          } else {
            this.setState({
              errorMessage: xhr.statusText,
            });
            console.error(xhr.statusText);
          }
        }
      }.bind(this);
      xhr.onerror = function (e) {
        console.error(xhr.statusText);
      };
      xhr.send(null);
    }

    inputElement.focus();
    inputElement.value = "";
    event.preventDefault();
  };

  tempChangeHandler = (value) => {
    this.setState({ isTempCelcius: value });
  };

  geoClickHandler = (event, coordinates) => {
    this.setState({ isMapVisible: true, coordinates: coordinates });
    // event.preventDefault();
  };

  componentDidMount() {
    fetch(
      "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ countryList: data });
      });
  }

  render() {
    return (
      <Container>
        <SearchInput
          searchHandler={this.searchLocation}
          tempChangeHandler={this.tempChangeHandler}
        />

        <Details {...this.state} geoClicked={this.geoClickHandler} />
        <GeoLocation
          isMapVisible={this.state.isMapVisible}
          coordinates={this.state.coordinates}
        />
      </Container>
    );
  }
}

export default Weather;
