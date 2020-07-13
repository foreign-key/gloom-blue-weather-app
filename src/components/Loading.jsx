import React from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import Col from "react-bootstrap/Col";
import * as WeatherLoading from "../weatherLoading.json";
import "../styles/Loading.css";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: WeatherLoading.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRequesting: false,
    };
  }

  render() {
    return (
      <div className="splashscreen">
        <FadeIn>
          <div className="d-flex justify-content-center align-items-center">
            {this.props.isRequesting && (
              <React.Fragment>
                <Col xs={1} s={2} md={2} lg={3} />
                <Col xs={10} s={8} md={8} lg={6}>
                  <h3>Forecasting...</h3>
                  <Lottie options={defaultOptions} height={150} width={150} />
                </Col>
                <Col xs={1} s={2} md={2} lg={3} />
              </React.Fragment>
            )}
          </div>
        </FadeIn>
      </div>
    );
  }
}

export default Loading;
