import React, { PureComponent } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Map, TileLayer, Marker } from "react-leaflet";

import "../styles/Details.css";

class Geolocation extends PureComponent {
  render() {
    const DisplayMapResult = (props) => {
      if (
        props.coordinates === undefined ||
        props.coordinates === null ||
        !props.isMapVisible
      ) {
        return null;
      }

      return (
        props.isMapVisible && (
          <div>
            <Row>
              <Col xs={12} md={12} lg={12} xl={12}>
                <Map
                  center={[
                    this.props.coordinates.lat,
                    this.props.coordinates.lon,
                  ]}
                  zoom={15}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker
                    position={[
                      this.props.coordinates.lat,
                      this.props.coordinates.lon,
                    ]}
                  />
                </Map>
              </Col>
            </Row>
          </div>
        )
      );
    };

    return (
      <div className="geoLocationMain">
        <DisplayMapResult
          coordinates={this.props.coordinates}
          isMapVisible={this.props.isMapVisible}
        />
      </div>
    );
  }
}

export default Geolocation;
