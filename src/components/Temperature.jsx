import React, { Component } from "react";
import { convertTemperature, tempScale, tempColor } from "../helpers/Helpers";

export function ActualTemperature(props) {
  return (
    <h1 style={tempColor(props.temp)}>
      {convertTemperature(props.temp, props.isCelcius)}
      {tempScale(props.isCelcius)}
    </h1>
  );
}

class Temperature extends Component {
  render() {
    let tempDetails = null;

    if (this.props !== undefined) {
      const feelsLike = convertTemperature(
        this.props.main.feels_like,
        this.props.isCelcius
      );

      tempDetails = (
        <React.Fragment>
          <div className="today-weather">
            <ActualTemperature
              temp={this.props.main.temp}
              isCelcius={this.props.isCelcius}
            />
            <h6>
              Feels like {feelsLike}
              {tempScale(this.props.isCelcius)} with{" "}
              {this.props.weather.description}
            </h6>
          </div>
        </React.Fragment>
      );
    }

    return <React.Fragment>{tempDetails}</React.Fragment>;
  }
}
export default Temperature;
