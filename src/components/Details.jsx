import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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

    const ConvertTemperature = (temp, tempScale) => {
      temp = temp - 273.15;
      const formula = tempScale ? temp : temp * 1.8 + 32;
      return formula.toLocaleString(navigator.language, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
    };

    const GetCurrentDate = () => {
      const date = new Date();

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      return `${days[date.getDay()]}, ${new Date().toLocaleString(
        navigator.language
      )}`;
    };

    const tempColor = (temp) => {
      return {
        color: parseInt(temp) > 298 ? "#E74C3C" : "#3498DB",
      };
    };

    const DisplayResult = (props) => {
      if (props.result === undefined || props.result === null) {
        return null;
      }

      let temp = ConvertTemperature(props.result.main.temp, props.tempScale);
      let feelsLike = ConvertTemperature(
        props.result.main.feels_like,
        props.tempScale
      );
      let country = GetCountry(props.countries, props.result.sys.country);
      let tempScale = props.tempScale ? "°C" : "°F";

      return (
        <div className="weatherMain">
          <Row>
            <Col xs={12} md={12} lg={12} xl={12}>
              <h1>{props.result.name}</h1>
              <h6>{country}</h6>
              <hr />
              <h5>Current Conditions</h5>
              <h6>{GetCurrentDate()}</h6>
              {/* <hr /> */}
              <br />
              <h5>ACTUAL TEMPERATURE</h5>
              <h1 style={tempColor(props.result.main.temp)}>
                {temp}
                {tempScale}
              </h1>
              <h6>
                Feels like {feelsLike}
                {tempScale}
              </h6>
              <hr />
              <h5>
                {props.result.weather[0].main} (
                {props.result.weather[0].description})
              </h5>
              <hr />

              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Wind</td>
                    <td>{props.result.wind.speed} m/s</td>
                  </tr>
                  <tr>
                    <td>Pressure</td>
                    <td>{props.result.main.pressure} hPa</td>
                  </tr>
                  <tr>
                    <td>Humidity</td>
                    <td>{props.result.main.humidity} %</td>
                  </tr>
                </tbody>
              </table>

              <hr />
              <h5>Geo Coordinates</h5>
              <Button
                variant="link"
                onClick={(event) =>
                  this.props.geoClicked(event, props.result.coord)
                }
              >
                ({props.result.coord.lat}, {props.result.coord.lon})
              </Button>
            </Col>
          </Row>
        </div>
      );
    };

    return (
      <div className="resultMain">
        <DisplayResult
          result={this.props.data}
          countries={this.props.countryList}
          tempScale={this.props.isTempCelcius}
        />
      </div>
    );
  }
}

export default Details;
