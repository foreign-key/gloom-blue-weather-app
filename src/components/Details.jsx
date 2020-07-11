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
      if (props.result === undefined || props.result === null) {
        return null;
      }

      let country = GetCountry(props.countries, props.result.sys.country);

      return (
        <div className="resultMain">
          <Row>
            <Col xs={12} md={12} lg={12} xl={12}>
              <h1>{props.result.name}</h1>
              <h6>{country}</h6>
              <hr />
              <DateTime />
              <br />
              <Temperature
                main={props.result.main}
                isCelcius={props.tempScale}
              />
              <hr />
              <div className="img-weather">
                <img
                  src={`http://openweathermap.org/img/wn/${props.result.weather[0].icon}@2x.png`}
                  alt="wthr img"
                />
              </div>
              <div className="weather-details">
                <h5>{props.result.weather[0].main}</h5>
                <h6>({props.result.weather[0].description})</h6>
              </div>
              <hr />

              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td className="td-title">Wind Speed</td>
                    <td className="td-value">{props.result.wind.speed} m/s</td>
                  </tr>
                  <tr>
                    <td className="td-title">Pressure</td>
                    <td className="td-value">
                      {props.result.main.pressure} hPa
                    </td>
                  </tr>
                  <tr>
                    <td className="td-title">Humidity</td>
                    <td className="td-value">{props.result.main.humidity} %</td>
                  </tr>
                </tbody>
              </table>

              <hr />
              <h5>Geo Coordinates</h5>
              <Button
                variant="link"
                onClick={(event) =>
                  this.props.geoClicked(event, props.result.coord)
                }
              >
                ({props.result.coord.lat}, {props.result.coord.lon})
              </Button>
            </Col>
          </Row>
        </div>
      );
    };

    return (
      <React.Fragment>
        <DisplayResult
          result={this.props.data}
          countries={this.props.countryList}
          tempScale={this.props.isTempCelcius}
        />
      </React.Fragment>
    );
  }
}

export default Details;
