import React, { Component } from "react";

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

    return (
      <>
        <h5>Current Conditions</h5>
        <h6>{GetCurrentDate()}</h6>
      </>
    );
  }
}

export default DateTime;
