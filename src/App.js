import "./App.scss";
import React from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";

import { FacebookProvider, Share } from "react-facebook";
import { Button, Popover, Typography, Row, Col } from "antd";
import Areas from "./CityData/Areas";

import Config from "./Config";
import GoogleAnalyticsTag from "./Components/GoogleAnalyticsTag";
import FAQModal from "./Components/FAQModal";
import AboutUsModal from "./Components/AboutUsModal";
import AddNewPlaceModal from "./Components/AddNewPlaceModal";
import DonateModal from "./Components/DonateModal";
import LogEngagementEvent from "./Logging";
import NeighborhoodCards from "./Components/NeighborhoodCards";
import PlaceFilterDisplay from "./Components/PlaceFilterDisplay";
import ShareOptions from "./Components/ShareOptions";
import Constants from "./Constants";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const { Title } = Typography;

/*
 * This holds the context of what area (eg, SF, East Bay, etc)
 * is currently enabled
 */
const AreaContext = React.createContext({
  currentArea: null,
  updateArea: () => {}
});

class App extends React.Component {
  constructor(props) {
    super(props);
    // TODO this is janktown routing
    const path = window.location.pathname.slice(1).toLowerCase();
    const currentArea = Areas[path] ? path : "GT";

    this.state = {
      faqVisible: false,
      shareVisible: true,
      currentArea: currentArea,
      addPlaceVisible: path === "addplace",
      donateVisible: false,
      aboutUsVisible: false,
      preferredProviders: ["Hyperli"]
    };

    this.selfRef = React.createRef();
  }

  componentDidMount = () => {
    axios
      .get("/api/places/preferred_provider/list")
      .then(response => {
        this.setState({ preferredProviders: response.data });
      })
      .catch(error => {
        console.error("Could not get preferred voucher providers");
      });
  };

  showFAQModal() {
    this.setState({ faqVisible: true });
  }

  hideFAQModal() {
    this.setState({ faqVisible: false });
  }

  showAboutUsModal() {
    this.setState({ aboutUsVisible: true });
  }

  hideAboutUsModal() {
    this.setState({ aboutUsVisible: false });
  }

  showDonateModal() {
    this.setState({ donateVisible: true });
  }

  hideDonateModal() {
    this.setState({ donateVisible: false });
  }

  showShareModal() {
    this.setState({ shareVisible: true });
  }

  hideShareModal() {
    this.setState({ shareVisible: false });
  }

  showAddModal() {
    this.setState({ addPlaceVisible: true });
  }

  hideAddModal() {
    window.history.pushState({}, "", "/");
    this.setState({ addPlaceVisible: false });
  }

  render() {
    return (
      <AreaContext.Provider
        value={{
          currentArea: this.state.currentArea,
          updateArea: newArea => {
            LogEngagementEvent("user-action", "selected-area", newArea);
            window.history.pushState({}, null, "/" + newArea);
            this.setState({ currentArea: newArea });
          }
        }}
      >
        <div>
          <div style={{ marginTop: "0px" }}>
            <FAQModal
              shouldShow={this.state.faqVisible}
              onClose={() => {
                this.hideFAQModal();
              }}
            />
            <AboutUsModal
              shouldShow={this.state.aboutUsVisible}
              onClose={() => {
                this.hideAboutUsModal();
              }}
            />
            <AddNewPlaceModal
              shouldShow={this.state.addPlaceVisible}
              preferredProviders={this.state.preferredProviders}
              onClose={() => {
                this.hideAddModal();
              }}
            />
            <DonateModal
              shouldShow={this.state.donateVisible}
              onClose={() => {
                this.hideDonateModal();
              }}
            />
            <Row className="covid-banner">
              <h4>
                <strong>Stay informed!</strong> Visit the SA Department of
                Health's website for COVID-19 updates:
                <a
                  href="https://www.sacoronavirus.co.za"
                  className="header-link"
                  target="_blank"
                >
                  www.sacoronavirus.co.za
                </a>
              </h4>
            </Row>

            <Row className="hero-row" justify="centre">
              <Col span={7}>
                <img src="/landscape-logo.png" className="header-logo" />
              </Col>
              <Col span={17}>
                <div className="banner-layout">
                  <a href="#">
                    <Title
                      onClick={() => {
                        this.showAboutUsModal();
                      }}
                      className="header-link"
                      level={4}
                      style={{ color: "white" }}
                    >
                      <b>ABOUT</b>
                    </Title>
                  </a>
                  <a href="#">
                    <Title
                      onClick={() => {
                        this.showFAQModal();
                      }}
                      className="header-link"
                      level={4}
                      style={{ color: "white" }}
                    >
                      <b>FAQ</b>
                    </Title>
                  </a>
                  <Button
                    onClick={event => {
                      this.showAddModal();
                    }}
                    className="header-button header-add-place-button"
                  >
                    <b>ADD A BUSINESS</b>
                  </Button>
                </div>
              </Col>
            </Row>

            <Row className="top-body">
              <div className="upper-body-layout">
                <Title level={1}>
                  Your favorite South African local business might close
                  forever.<strong> Help save it now.</strong>
                </Title>
                <p className="font-body-custom">
                  Our small businesses need us more than ever. Even though we
                  can't leave home, we can still support our local restaurants,
                  and other small businesses by buying a voucher now, use it
                  later.
                </p>
              </div>
              <div className="upper-picture-layout">
                <img
                  className="suggested-place-custom"
                  src="https://media.defense.gov/2019/Jul/30/2002164249/-1/-1/0/190730-A-HG995-1002.PNG"
                />
              </div>
            </Row>
          </div>
        </div>

        <Row className="footer-logo"></Row>

        <Col span={24} className="hero-row">
          <div className="main-results">
            <div style={{ padding: "50px 0px" }}>
              <AreaContext.Consumer>
                {value => {
                  return <PlaceFilterDisplay updateArea={value.updateArea} />;
                }}
              </AreaContext.Consumer>
            </div>
            <div className="neighborhood-card-container-outer">
              <AreaContext.Consumer>
                {value => {
                  return (
                    <NeighborhoodCards
                      currentArea={value.currentArea}
                      updateArea={value.updateArea}
                    />
                  );
                }}
              </AreaContext.Consumer>
            </div>
          </div>
          <div
            style={{
              width: "100%",
              padding: "40px",
              textAlign: "center"
            }}
          >
            <Title level={1} style={{ color: "black" }}>
              3 weeks can kill a business
            </Title>
            <p className="font-body-custom">
              Businesses have many fixed costs: rent, labour, loan repayments,
              insurance, supplies, repairs - and the list goes on. Even
              successful small businesses have very thin margins of 3-5%. The
              lockdown is keeping customers at home, and tipping the balance
              towards bankruptcy.
            </p>
          </div>
          <Row className="footer-menu" justify="centre">
            <Col span={7} offset={0}>
              <img src="/landscape-logo.png" className="header-logo" />
            </Col>
            <Col span={17} offset={0} style={{ padding: "26px" }}>
              <ul>
                <li>
                  <a
                    style={{ color: "white" }}
                    target="_blank"
                    href="/syl_privacy_policy.pdf"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    style={{ color: "white" }}
                    target="_blank"
                    href="/syl_website_terms_and_conditions_of_use.pdf"
                  >
                    Terms and Conditions
                  </a>
                </li>
                <li>
                  <a
                    style={{ color: "white" }}
                    onClick={() => {
                      this.showAboutUsModal();
                    }}
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    style={{ color: "white" }}
                    target="_blank"
                    href="/syl_merchant_agreement.pdf"
                  >
                    Merchant Agreement
                  </a>
                </li>
                <li>
                  <a
                    style={{ color: "white" }}
                    target="_blank"
                    href="/syl_user_agreement.pdf"
                  >
                    User Agreement
                  </a>
                </li>
                <li>
                  <a
                    style={{ color: "white" }}
                    target="_self"
                    href={Constants.AddPlaceURL}
                  >
                    Register your local
                  </a>
                </li>
                <li>
                  <a
                    style={{ color: "white" }}
                    onClick={() => {
                      this.showFAQModal();
                    }}
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </Col>
          </Row>
          <div className="footer-row" style={{ textAlign: "center" }}>
            <p-custom className="font-body-custom">
              TELL YOUR FRIENDS
              <a
                class="fab fa-facebook"
                style={{ "font-size": "24px", color: "white" }}
              ></a>
              <a
                class="fab fa-twitter"
                style={{ "font-size": "24px", color: "white" }}
                onClick={() => {
                  window.open(
                    "https://twitter.com/intent/tweet?url=https://saveyourlocal.co.za&text=Local%20businesses%20need%20us%20more%20than%20ever%20%E2%80%93%20gift%20cards%20can%20make%20a%20big%20difference.%20Please%20join%20me%20in%20supporting%20your%20favorite%20local%20restaurants%20at"
                  );
                }}
              ></a>
            </p-custom>
          </div>
        </Col>
        <GoogleAnalyticsTag analyticsID={Config.GoogleAnalyticsID} />
      </AreaContext.Provider>
    );
  }
}

export default App;
