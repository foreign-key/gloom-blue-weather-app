import React, { Component } from "react";
import runtimeEnv from "@mars/heroku-js-runtime-env";

const env = runtimeEnv();

class Temperature extends Component {
  render() {
    let tempDetails = null;

    if (this.props) {
      const tempScale = this.props.isCelcius
        ? env.REACT_APP_CELC
        : env.REACT_APP_FAHR;
      const ConvertTemperature = (temp, tempScale) => {
        temp = temp - 273.15;
        const formula = tempScale ? temp : temp * 1.8 + 32;
        return formula.toLocaleString(navigator.language, {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
      };

      const temp = ConvertTemperature(
        this.props.main.temp,
        this.props.isCelcius
      );
      const feelsLike = ConvertTemperature(
        this.props.main.feels_like,
        this.props.isCelcius
      );

      const tempColor = (temp) => {
        return {
          color: parseInt(temp) > 298 ? "#E74C3C" : "#3498DB",
        };
      };

      tempDetails = (
        <React.Fragment>
          <h5>ACTUAL TEMPERATURE</h5>
          <h1 style={tempColor(this.props.main.temp)}>
            {temp}
            {tempScale}
          </h1>
          <h6>
            Feels like {feelsLike}
            {tempScale}
          </h6>
        </React.Fragment>
      );
    }

    return <React.Fragment>{tempDetails}</React.Fragment>;
  }
}
export default Temperature;
