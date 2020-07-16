import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DateTime from "./DateTime";
import Temperature from "./Temperature";

import "../styles/Details.css";

class Details extends Component {
  render() {
    const GetCountry = (countries, code) => {
      if (countries === null || countries === undefined) {
        return;
      }

      let details = countries.filter((x) => x.Code === code);
      return details[0].Name;
    };

    const DisplayResult = (props) => {
      let country = GetCountry(props.countries, props.city.country);

      return (
        <div className="resultMain">
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <h1>{props.city.name}</h1>
              <h6>{country}</h6>
              <hr />
              <DateTime />
              <br />
              <Row>
                <Col>
                  <div className="today-weather-visual">
                    <div className="img-weather">
                      <img
                        src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
                        alt="wthr img"
                      />
                    </div>
                    <div className="weather-details">
                      <h5>{props.data.weather[0].main}</h5>
                      <h6>({props.data.weather[0].description})</h6>
                    </div>
                  </div>
                </Col>
                <Col>
                  <Temperature
                    main={props.data.main}
                    isCelcius={props.tempScale}
                  />
                </Col>
              </Row>
              <hr />

              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="td-title">Wind Speed</td>
                    <td className="td-value">{props.data.wind.speed} m/s</td>
                  </tr>
                  <tr>
                    <td className="td-title">Pressure</td>
                    <td className="td-value">{props.data.main.pressure} hPa</td>
                  </tr>
                  <tr>
                    <td className="td-title">Humidity</td>
                    <td className="td-value">{props.data.main.humidity} %</td>
                  </tr>
                </tbody>
              </table>

              <hr />
              <h5>Geo Coordinates</h5>
              <Button
                variant="link"
                onClick={() => this.props.geoClicked(props.city.coord)}
              >
                ({props.city.coord.lat}, {props.city.coord.lon})
              </Button>
            </Col>
          </Row>
        </div>
      );
    };

    return (
      <React.Fragment>
        {this.props.data && (
          <DisplayResult
            city={this.props.city}
            countries={this.props.countryList}
            data={this.props.data}
            tempScale={this.props.isTempCelcius}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Details;
