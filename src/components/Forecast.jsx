import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Forecast.css";
import {
  convertTemperature,
  getCurrentDay,
  getDate,
  tempColor,
  tempScale,
} from "../helpers/Helpers";

class Forecast extends Component {
  render() {
    let days = null;

    if (this.props.forecastList.length > 0) {
      days = (
        <React.Fragment>
          {this.props.forecastList.map((item, index) => {
            if (item !== undefined && item.dt_txt.split(" ")[0] !== getDate()) {
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
                      </div>
                    </Col>
                    <Col>
                      <h1 style={tempColor(item.main.temp)}>
                        {convertTemperature(
                          item.main.temp,
                          this.props.isCelcius
                        )}
                        {tempScale(this.props.isCelcius)}
                      </h1>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="weather-details">
                        <h6>({item.weather[0].description})</h6>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            }
            return null;
          })}
        </React.Fragment>
      );
    }

    return <React.Fragment>{days}</React.Fragment>;
  }
}

export default Forecast;
