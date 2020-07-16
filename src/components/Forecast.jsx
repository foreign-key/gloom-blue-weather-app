import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../styles/Forecast.css";
import { getCurrentDay } from "./DateTime";
import { convertTemperature, tempScale, tempColor } from "./Temperature";

class Forecast extends Component {
  render() {
    if (this.props.city) {
      let days = null;

      if (this.props.list.length > 0) {
        const todayWeather = this.props.list[0];

        const filteredItems = (list) => {
          const uniqueDates = [
            ...new Set(list.map((data) => data.dt_txt.split(" ")[0])),
          ];

          const todayDate = todayWeather.dt_txt.split(" ");
          return uniqueDates
            .map((item) => {
              const date = Date.parse(`${item} ${todayDate[1]}`);
              return list.filter((x) => Date.parse(x.dt_txt) === date)[0];
            })
            .slice(1, uniqueDates.length - 1);
        };

        days = (
          <React.Fragment>
            {filteredItems(this.props.list).map((item, index) => {
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
                        {convertTemperature(
                          item.main.temp,
                          this.props.isTempCelcius
                        )}
                        {tempScale(this.props.isTempCelcius)}
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
    } else {
      return <></>;
    }
  }
}

export default Forecast;
