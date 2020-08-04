import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { filteredForecast, getCountries } from "../helpers/Helpers";
import { queryForecast } from "../helpers/RequestHandlers";
import { updateURL } from "../helpers/RouterHelpers";

import Details from "./Details";
import Forecast from "./Forecast";
import Footer from "./Footer";
import GeoLocation from "./GeoLocation";
import Loading from "./Loading";
import Message from "./Message";
import SearchInput from "./SearchInput";

var queryString = null;

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

  searchLocation = (event, inputElement) => {
    if (inputElement.value !== "") {
      const keyword = inputElement.value.trim();
      queryString = `q=${keyword}`;

      this.setState({ name: keyword });
      this.searchWeather();
      updateURL(keyword, this.props.history);
    }

    inputElement.focus();
    inputElement.value = "";
    event.preventDefault();
  };

  searchWeather = () => {
    this.setState({ isMapVisible: false, isRequesting: true });

    setTimeout(() => {
      queryForecast(queryString)
        .then((data) => {
          this.filterForecast(data);
        })
        .catch((err) => {
          this.updateDocTitle(null);
          this.setState({
            city: undefined,
            data: undefined,
            errorMessage: err.statusText,
            filteredForecast: [],
            isRequesting: false,
            isPopAlert: true,
            list: [],
          });
        });
    }, 500);
  };

  filterForecast = (response) => {
    if (response !== undefined) {
      const filteredList = filteredForecast(response.list).filter(Boolean);

      this.setState({
        name: response.city.name,
        city: response.city,
        data: filteredList[0],
        filteredForecast: filteredList,
        isRequesting: false,
        list: response.list,
      });

      this.updateDocTitle(response.city.name);
    }
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

    const countries = getCountries();
    this.setState({ countryList: countries });

    this.refreshPage(true);

    window.onpopstate = () => {
      this.refreshPage(false);
    };
  }

  refreshPage = (shouldUpdateURL) => {
    if (this.props.query !== "") {
      queryString = `q=${this.props.query}`;
      this.searchWeather();
      shouldUpdateURL && updateURL(this.props.query, this.props.history);
    } else {
      this.weatherInit();
    }
  };

  updateDocTitle = (location) => {
    let docTitle = `${process.env.REACT_APP_NAME} Weather Forecast`;

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
                <Col md={6} lg={7}>
                  <Details {...this.state} geoClicked={this.geoClickHandler} />
                </Col>
                <Col md={6} lg={5}>
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
