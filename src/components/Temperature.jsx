import React, { Component } from "react";
import { convertTemperature, tempScale, tempColor } from "../helpers/Helpers";

class Temperature extends Component {
  render() {
    let tempDetails = null;

    if (this.props !== undefined) {
      const temp = convertTemperature(
        this.props.main.temp,
        this.props.isCelcius,
        2
      );
      const feelsLike = convertTemperature(
        this.props.main.feels_like,
        this.props.isCelcius,
        2
      );

      tempDetails = (
        <React.Fragment>
          <div className="today-weather">
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
