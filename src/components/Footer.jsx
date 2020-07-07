import React, { Component } from "react";
import Social from "./FooterSocial";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

// import "../styles/index.css";
import "../styles/Footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <Container>
          <Row>
            <Col xs={12} md={12} lg={12} xl={12}>
              <h6>Gloom Blue © 2020</h6>

              <div className="social-container">
                <a
                  href="https://github.com/foreign-key"
                  className="github social"
                >
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a
                  href="https://www.linkedin.com/in/jessersusi/"
                  className="linkedin social"
                >
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Footer;
