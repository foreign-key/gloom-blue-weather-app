import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Weather from "../src/components/Weather";

var destination = document.querySelector("#weatherBody");

ReactDOM.render(
  <React.Fragment>
    <Weather />
  </React.Fragment>,
  destination
);
