import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Weather from "./Weather/Weather";

var destination = document.querySelector("#container");

ReactDOM.render(
  <div>
    <Weather />
  </div>,
  destination
);
