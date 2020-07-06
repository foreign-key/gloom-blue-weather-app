import React, { Component } from "react";
import "./Location.css";

class Location extends Component {
  render() {
    const GetCountry = (countries, code) => {
      if (countries === null || countries === undefined) {
        return;
      }

      let details = countries.filter((x) => x.Code === code);
      return details[0].Name;
    };

    const ConvertTemperature = (temp) => {
      return (temp - 273.15).toLocaleString(navigator.language, {
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

      const dateFormat = `${days[date.getDay()]}, ${new Date().toLocaleString(
        navigator.language
      )}`;

      return dateFormat;
    };

    const DisplayResult = (props) => {
      if (props.result === undefined || props.result === null) {
        return null;
      }

      let temp = ConvertTemperature(props.result.main.temp);
      let feelsLike = ConvertTemperature(props.result.main.feels_like);
      let country = GetCountry(props.countries, props.result.sys.country);

      return (
        <div className="weatherMain">
          <h1>{props.result.name}</h1>
          <h5>{country}</h5>
          <hr />
          <h3>Current Conditions</h3>
          <h6>{GetCurrentDate()}</h6>
          <hr />
          <h6>ACTUAL TEMPERATURE</h6>
          <h1>{temp}°C</h1>
          <h6>Feels like {feelsLike}°C</h6>
          <hr />
          <h5>
            {props.result.weather[0].main} (
            {props.result.weather[0].description})
          </h5>
          <hr />
          <div className="table-responsive-sm table-borderless">
            <table className="table">
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
          </div>
          <hr />
          <h5>Geo Coordinates</h5>
          <h6>
            ({props.result.coord.lat}, {props.result.coord.lon})
          </h6>
        </div>
      );
    };

    return (
      <div className="resultMain">
        <DisplayResult
          result={this.props.data}
          countries={this.props.countryList}
        />
      </div>
    );
  }
}

export default Location;
