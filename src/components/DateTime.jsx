import React, { Component } from "react";
import { getCurrentDay } from "../helpers/Helpers";

class DateTime extends Component {
  componentDidMount() {
    this.interval = setInterval(
      () => this.setState({ time: Date.now() }),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const GetCurrentDate = () => {
      const date = new Date();

      return `${getCurrentDay(date)}, ${date.toLocaleString(
        navigator.language
      )}`;
    };

    return (
      <React.Fragment>
        <h5>Current Conditions</h5>
        <h6>{GetCurrentDate()}</h6>
      </React.Fragment>
    );
  }
}

export default DateTime;
