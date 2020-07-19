import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { filteredForecast } from "./Helpers";

import Details from "./Details";
import Forecast from "./Forecast";
import Footer from "./Footer";
import GeoLocation from "./GeoLocation";
import Loading from "./Loading";
import Message from "./Message";
import SearchInput from "./SearchInput";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();

var xhr;
var queryString = null;

export function setParams({ query }) {
  const searchParams = new URLSearchParams();
  searchParams.set("q", query || "");
  return searchParams.toString();
}

class Weather extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      city: null,
      coordinates: [],
      data: null,
      filteredForecast: [],
      errorMessage: "",
      isMapVisible: false,
      isPopAlert: false,
      isRequesting: false,
      isTempCelcius: true,
      list: [],
    };

    this.searchLocation = this.searchLocation.bind(this);
    this.tempChangeHandler = this.tempChangeHandler.bind(this);
  }

  updateURL = (query) => {
    const url = setParams({ query: query });
    this.props.history.push(`?${url}`);
  };

  searchLocation = (event, inputElement) => {
    if (inputElement.value !== "") {
      queryString = `q=${inputElement.value.trim()}`;

      this.setState({
        name: inputElement.value.trim(),
      });
      this.searchWeather();
      this.updateURL(inputElement.value.trim());
    }

    inputElement.focus();
    inputElement.value = "";
    event.preventDefault();
  };

  searchWeather = () => {
    xhr = new XMLHttpRequest();

    this.setState({
      isMapVisible: false,
      isRequesting: true,
    });

    xhr.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/forecast?${queryString}&appid=${env.REACT_APP_OPENWEATHER_API_KEY}`,
      true
    );
    setTimeout(() => {
      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.response);
            this.setState({
              name: response.city.name,
              city: response.city,
              isRequesting: false,
              list: response.list,
            });
            this.filterForecast();
            this.getTodayForecast();
            this.updateDocTitle(response.city.name);
          } else {
            this.updateDocTitle(null);
            this.setState({
              city: undefined,
              data: undefined,
              errorMessage: xhr.statusText,
              filteredForecast: [],
              isRequesting: false,
              isPopAlert: true,
              list: [],
            });
          }
        }
      }.bind(this);

      xhr.send(null);
    }, 500);
  };

  filterForecast = () => {
    const list = [...this.state.list];
    const filteredList = filteredForecast(list).filter(Boolean);
    this.setState({ filteredForecast: filteredList });
  };

  getTodayForecast = () => {
    this.setState({ data: this.state.filteredForecast[0] });
  };

  tempChangeHandler = (value) => {
    this.setState({ isTempCelcius: value });
  };

  geoClickHandler = (coordinates) => {
    this.setState({ isMapVisible: true, coordinates: coordinates });
  };

  toggleModal = () => {
    this.setState({ isPopAlert: false });
  };

  componentDidMount() {
    this.updateDocTitle(null);

    fetch(
      "https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json"
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ countryList: data });
      });

    if (this.props.query !== "") {
      queryString = `q=${this.props.query}`;
      this.searchWeather();
      this.updateURL(this.props.query);
    } else {
      this.weatherInit();
    }
  }

  updateDocTitle = (location) => {
    let docTitle = `${env.REACT_APP_NAME} Weather Forecast`;

    if (location !== null) {
      docTitle = location.concat(` | ${docTitle}`);
    }

    document.title = docTitle;
  };

  weatherInit = () => {
    const success = (position) => {
      queryString = `lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
      this.searchWeather();
    };

    const error = () => {
      alert("Unable to retrieve location.");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      alert(
        "Your browser does not support location tracking or permission is denied."
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <SearchInput
            searchHandler={this.searchLocation}
            tempChangeHandler={this.tempChangeHandler}
          />
          {this.state.isRequesting ? (
            <React.Fragment>
              <Loading {...this.state} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {this.state.isPopAlert && (
                <Message
                  searchParameter={this.state.name}
                  errorMessage={this.state.errorMessage}
                  isPopAlert={this.state.isPopAlert}
                  toggleModal={this.toggleModal}
                />
              )}
              <Row>
                <Col>
                  <Details {...this.state} geoClicked={this.geoClickHandler} />
                </Col>
                <Col>
                  <Forecast
                    forecastList={this.state.filteredForecast}
                    isCelcius={this.state.isTempCelcius}
                  />
                </Col>
              </Row>
              <GeoLocation
                isMapVisible={this.state.isMapVisible}
                coordinates={this.state.coordinates}
              />
            </React.Fragment>
          )}
          <Footer />
        </Container>
      </React.Fragment>
    );
  }
}

export default Weather;
