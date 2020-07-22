import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DateTime from "./DateTime";
import Temperature from "./Temperature";
import moment from "moment";

import "../styles/Details.css";

class Details extends Component {
  render() {
    const GetCountry = (countries, code) => {
      if (countries === null || countries === undefined) {
        return;
      }

      let details = countries.filter((x) => x.Code === code);
      return details[0].Name;
    };

    const DisplayResult = (props) => {
      let country = GetCountry(props.countries, props.city.country);
      const timezone =
        (new Date().getTimezoneOffset() * 60 + props.city.timezone) * 1000;

      const sunrise = moment(
        new Date(props.city.sunrise * 1000 + timezone)
      ).format("h:mm:ss A");

      const sunset = moment(
        new Date(props.city.sunset * 1000 + timezone)
      ).format("h:mm:ss A");

      return (
        <div className="resultMain">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <h1>{props.city.name}</h1>
              <h6>{country}</h6>
              <hr />
              <DateTime />
              <br />
              <Row>
                <Col>
                  <div className="today-weather-visual">
                    <div className="img-weather">
                      <img
                        src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
                        alt="wthr img"
                      />
                    </div>
                    <Temperature
                      main={props.data.main}
                      isCelcius={props.tempScale}
                      weather={props.data.weather[0]}
                    />
                  </div>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col>
                  <div className="weather-extras">
                    <div className="img-weather-extras">
                      <img
                        src={require("../wind.png")}
                        alt="wthr img"
                        className="img-fluid"
                      />
                    </div>
                    <h6>
                      <span style={{ marginRight: "1rem" }}>Wind Speed</span>
                      {props.data.wind.speed} m/s
                    </h6>
                  </div>
                  <div className="weather-extras">
                    <div className="img-weather-extras">
                      <img
                        src={require("../pressure.png")}
                        alt="wthr img"
                        className="img-fluid"
                      />
                    </div>
                    <h6>
                      <span style={{ marginRight: "2.5rem" }}>Pressure</span>
                      {props.data.main.pressure} hPa
                    </h6>
                  </div>
                  <div className="weather-extras">
                    <div className="img-weather-extras">
                      <img
                        src={require("../humidity.png")}
                        alt="wthr img"
                        className="img-fluid"
                      />
                    </div>
                    <h6>
                      <span style={{ marginRight: "2.4rem" }}>Humidity</span>
                      {props.data.main.humidity} %
                    </h6>
                  </div>
                  <div className="weather-extras">
                    <div className="img-weather-extras">
                      <img
                        src={require("../sunrise.png")}
                        alt="wthr img"
                        className="img-fluid"
                      />
                    </div>
                    <h6>
                      <span style={{ marginRight: "3.1rem" }}>Sunrise</span>
                      {sunrise}
                    </h6>
                  </div>
                  <div className="weather-extras">
                    <div className="img-weather-extras">
                      <img
                        src={require("../sunset.png")}
                        alt="wthr img"
                        className="img-fluid"
                      />
                    </div>
                    <h6>
                      <span style={{ marginRight: "3.4rem" }}>Sunset</span>
                      {sunset}
                    </h6>
                  </div>
                </Col>
                <Col />
                <Col>
                  <div className="coordinates">
                    <h5>Geo Coordinates</h5>
                    <Button
                      variant="link"
                      onClick={() => this.props.geoClicked(props.city.coord)}
                    >
                      ({props.city.coord.lat}, {props.city.coord.lon})
                    </Button>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
    };

    return (
      <React.Fragment>
        {this.props.data && (
          <DisplayResult
            city={this.props.city}
            countries={this.props.countryList}
            data={this.props.data}
            tempScale={this.props.isTempCelcius}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Details;
