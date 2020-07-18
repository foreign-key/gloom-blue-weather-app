import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Forecast.css";
import {
  convertTemperature,
  getCurrentDay,
  tempColor,
  tempScale,
} from "./Helpers";

class Forecast extends Component {
  render() {
    let days = null;

    if (this.props.forecastList.length > 0) {
      days = (
        <React.Fragment>
          {this.props.forecastList.map((item, index) => {
            return (
              <div className="forecastMain" key={index}>
                <h6>{getCurrentDay(new Date(item.dt_txt))}</h6>
                <hr />
                <Row>
                  <Col>
                    <div className="img-weather">
                      <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt="wthr img"
                      />
                    </div>
                    <div className="weather-details">
                      <h5>{item.weather[0].main}</h5>
                      <h6>({item.weather[0].description})</h6>
                    </div>
                  </Col>
                  <Col>
                    <h1 style={tempColor(item.main.temp)}>
                      {convertTemperature(item.main.temp, this.props.isCelcius)}
                      {tempScale(this.props.isCelcius)}
                    </h1>
                  </Col>
                </Row>
              </div>
            );
          })}
        </React.Fragment>
      );
    }

    return <React.Fragment>{days}</React.Fragment>;
  }
}

export default Forecast;
