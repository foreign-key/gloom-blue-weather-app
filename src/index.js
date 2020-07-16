import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "./styles/index.css";
import Weather from "../src/components/Weather";

var destination = document.querySelector("#weatherBody");
require("dotenv").config();

function getParams(location) {
  const searchParams = new URLSearchParams(location.search);
  return {
    query: searchParams.get("q") || "",
  };
}

const WeatherPage = (props) => {
  const { query, history } = props;
  return (
    <React.Fragment>
      <Weather query={query} history={history} />
    </React.Fragment>
  );
};

ReactDOM.render(
  <BrowserRouter>
    <Route
      path="/"
      render={(location) => {
        const { query } = getParams(location.location);
        return <WeatherPage query={query} history={location.history} />;
      }}
    />
  </BrowserRouter>,
  destination
);
