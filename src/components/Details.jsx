import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DateTime from "./DateTime";
import Temperature from "./Temperature";
import moment from "moment";

import "../styles/Details.css";

export function WeatherImage(props) {
  return (
    <div className="img-weather">
      <img
        src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
        alt="wthr img"
      />
    </div>
  );
}

function WeatherExtrasInfo(props) {
  return (
    <React.Fragment>
      <div className="img-weather-extras">
        <img
          src={require(`../${props.fileName}.png`)}
          alt="wthr img"
          className="img-fluid"
        />
      </div>
      <h6>
        <span style={{ marginRight: `${props.margin}` }}>{props.label}</span>
        {props.details}
      </h6>
    </React.Fragment>
  );
}

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

      const twilight = (minutes) =>
        moment(new Date(minutes * 1000 + timezone)).format("h:mm:ss A");

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
                    <WeatherImage icon={props.data.weather[0].icon} />
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
                    <WeatherExtrasInfo
                      fileName="wind"
                      margin="1rem"
                      label="Wind Speed"
                      details={`${props.data.wind.speed} m/s`}
                    />
                  </div>
                  <div className="weather-extras">
                    <WeatherExtrasInfo
                      fileName="pressure"
                      margin="2.5rem"
                      label="Pressure"
                      details={`${props.data.main.pressure} hPa`}
                    />
                  </div>
                  <div className="weather-extras">
                    <WeatherExtrasInfo
                      fileName="humidity"
                      margin="2.4rem"
                      label="Humidity"
                      details={`${props.data.main.humidity} %`}
                    />
                  </div>
                  <div className="weather-extras">
                    <WeatherExtrasInfo
                      fileName="sunrise"
                      margin="3.1rem"
                      label="Sunrise"
                      details={twilight(props.city.sunrise)}
                    />
                  </div>
                  <div className="weather-extras">
                    <WeatherExtrasInfo
                      fileName="sunset"
                      margin="3.4rem"
                      label="Sunset"
                      details={twilight(props.city.sunset)}
                    />
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
