import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import "../styles/SearchInput.css";

class SearchInput extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <div className="searchMain">
        <Row>
          <Col
            xs={{ span: 9 }}
            sm={{ span: 10 }}
            md={{ span: 6 }}
            lg={{ span: 4 }}
            xl={{ span: 4 }}
          >
            <form
              onSubmit={(event) =>
                this.props.searchHandler(event, this._inputElement)
              }
            >
              <div className="searchInput">
                <span className="fa fa-search search-feedback"></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter location"
                  ref={(search) => (this._inputElement = search)}
                />
              </div>
            </form>
          </Col>
          <Col
            xs={{ span: 3 }}
            sm={{ span: 2 }}
            md={{ span: 2, offset: 4 }}
            lg={{ span: 2, offset: 6 }}
            xl={{ span: 1, offset: 7 }}
          >
            <BootstrapSwitchButton
              checked={true}
              onlabel={process.env.REACT_APP_CELC}
              offlabel={process.env.REACT_APP_FAHR}
              onChange={(event) => this.props.tempChangeHandler(event)}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchInput;
