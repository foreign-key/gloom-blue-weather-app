import React, { Component } from "react";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();

export function convertTemperature(temp, tempScale) {
  temp = temp - 273.15;
  const formula = tempScale ? temp : temp * 1.8 + 32;
  return formula.toLocaleString(navigator.language, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}

export function tempScale(isCelcius) {
  return isCelcius ? env.REACT_APP_CELC : env.REACT_APP_FAHR;
}

export function tempColor(temp) {
  return {
    color: parseInt(temp) > 298 ? "#E74C3C" : "#3498DB",
  };
}

class Temperature extends Component {
  render() {
    let tempDetails = null;

    if (this.props !== undefined) {
      const temp = convertTemperature(
        this.props.main.temp,
        this.props.isCelcius
      );
      const feelsLike = convertTemperature(
        this.props.main.feels_like,
        this.props.isCelcius
      );

      tempDetails = (
        <React.Fragment>
          <div className="today-weather">
            <h5>ACTUAL TEMPERATURE</h5>
            <h1 style={tempColor(this.props.main.temp)}>
              {temp}
              {tempScale(this.props.isCelcius)}
            </h1>
            <h6>
              Feels like {feelsLike}
              {tempScale(this.props.isCelcius)}
            </h6>
          </div>
        </React.Fragment>
      );
    }

    return <React.Fragment>{tempDetails}</React.Fragment>;
  }
}
export default Temperature;
