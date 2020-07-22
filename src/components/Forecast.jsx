import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { WeatherImage } from "./Details";
import { ActualTemperature } from "./Temperature";
import { getCurrentDay, getDate } from "../helpers/Helpers";
import "../styles/Forecast.css";

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
                      <WeatherImage icon={item.weather[0].icon} />
                      <div className="weather-details">
                        <h5>{item.weather[0].main}</h5>
                      </div>
                    </Col>
                    <Col>
                      <ActualTemperature
                        temp={item.main.temp}
                        isCelcius={this.props.isCelcius}
                      />
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
