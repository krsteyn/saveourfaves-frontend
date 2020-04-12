import "./App.scss";
import React from "react";
import axios from "axios";

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
              <p>
                <strong>Stay informed!</strong> Visit the SA Department of
                Health's website for COVID-19 updates:
                <a
                  href="https://www.sacoronavirus.co.za"
                  className="header-link"
                  target="_blank"
                >
                  www.sacoronavirus.co.za
                </a>
              </p>
            </Row>
            <Row className="hero-row" justify="centre">
              <Row
                style={{
                  maxWidth: "1100px",
                  margin: "0px auto",
                  minWidth: "0",
                  width: "100%"
                }}
              >
                <Row className="top-header">
                  <Col span={12} offset={0}>
                    <div
                      style={{
                        width: "100%"
                      }}
                    >
                      <Title
                        style={{ float: "left", color: "white" }}
                        level={4}
                      >
                        <img
                          src="/landscape-logo.png"
                          className="header-logo"
                        />
                      </Title>
                    </div>
                  </Col>
                  <Col span={12} offset={0}>
                    <div
                      style={{
                        width: "100%"
                      }}
                    >
                      <div style={{ float: "right" }}>
                        <a href="#">
                          <Title
                            onClick={() => {
                              this.showAboutUsModal();
                            }}
                            className="header-link"
                            level={4}
                          >
                            About Us
                          </Title>
                        </a>
                        <a href="#">
                          <Title
                            onClick={() => {
                              this.showFAQModal();
                            }}
                            className="header-link"
                            level={4}
                          >
                            FAQ
                          </Title>
                        </a>
                        <Popover content={<ShareOptions />}>
                          <a>
                            <Title
                              className="header-link header-share-link"
                              level={4}
                            >
                              Tell friends
                            </Title>
                          </a>
                        </Popover>
                        <Button
                          onClick={event => {
                            this.showAddModal();
                          }}
                          shape="round"
                          className="header-button header-add-place-button"
                        >
                          Add Local
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row
                  justify="center"
                  style={{
                    width: "100%"
                  }}
                >
                  <Col
                    xs={{ span: 20, offset: 0 }}
                    span={20}
                    offset={0}
                    style={{ textAlign: "center", padding: "20px 0px" }}
                  >
                    <Title
                      level={1}
                      style={{ color: "white", textAlign: "center" }}
                    >
                      Your favorite South African local business might close
                      forever. Help save it now.
                    </Title>
                    <Row justify="space-around">
                      <Col className="action-button-wrapper">
                        <img
                          src="./register.png"
                          className="action-button-images"
                          onClick={event => {
                            this.showAddModal();
                          }}
                        />{" "}
                        <br />
                        <span className="action-button-images-text">
                          Add Your Local
                        </span>
                      </Col>
                      <Col className="action-button-wrapper">
                        <img
                          src="./donate.png"
                          className="action-button-images"
                          onClick={event => {
                            this.showDonateModal();
                          }}
                        />{" "}
                        <br />
                        <span className="action-button-images-text">
                          Donate
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    sm={{ span: 20, offset: 0 }}
                    md={{ span: 20, offset: 0 }}
                    lg={{ span: 20, offset: 0 }}
                  >
                    <div className="main-results">
                      <div style={{ padding: 20 }}>
                        <AreaContext.Consumer>
                          {value => {
                            return (
                              <PlaceFilterDisplay
                                updateArea={value.updateArea}
                              />
                            );
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
                  </Col>
                </Row>
                <Row className="footer-content" justify="space-around">
                  <Col
                    offset={0}
                    xs={18}
                    sm={18}
                    md={9}
                    lg={{ span: 9, offset: 0 }}
                    xl={{ span: 8, offset: 0 }}
                    style={{ textAlign: "left" }}
                  >
                    <Title level={3}>Our duty as loyal customers</Title>
                    <p>
                      Our small businesses need us more than ever. Even though
                      we can't leave home, we can still support our local
                      restaurants, and other small businesses by buying a
                      voucher now, use it later.
                    </p>
                  </Col>
                  <Col
                    offset={0}
                    xs={18}
                    sm={18}
                    md={9}
                    lg={8}
                    xl={{ span: 8, offset: 0 }}
                    style={{ textAlign: "left" }}
                  >
                    <Title level={3}>3 weeks can kill a business</Title>
                    <p>
                      Businesses have many fixed costs: rent, labour, loan
                      repayments, insurance, supplies, repairs - and the list
                      goes on. Even successful small businesses have very thin
                      margins of 3-5%. The lockdown is keeping customers at
                      home, and tipping the balance towards bankruptcy.
                    </p>
                  </Col>
                </Row>
              </Row>
              <Row className="footer-menu" justify="space-around">
                <Col
                  xs={{ span: 20, offset: 0 }}
                  sm={{ span: 20, offset: 0 }}
                  md={{ span: 6, offset: 0 }}
                  lg={{ span: 6, offset: 0 }}
                  xl={{ span: 6, offset: 0 }}
                  style={{ textAlign: "left" }}
                >
                  <img className="footer-logo" src="/footer-logo.png" />
                </Col>
                <Col
                  xs={{ span: 20, offset: 0 }}
                  sm={{ span: 20, offset: 0 }}
                  md={{ span: 6, offset: 0 }}
                  lg={{ span: 6, offset: 0 }}
                  xl={{ span: 6, offset: 0 }}
                  style={{ textAlign: "left" }}
                >
                  <div>
                    <Title level={3} style={{ color: "white" }}>
                      Quick Menu
                    </Title>
                    <ul className="menu-list">
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
                  </div>
                </Col>
              </Row>
              <Row className="footer-row">
                <Col offset={5} span={9} style={{ textAlign: "left" }}>
                  <div>
                    <br />
                  </div>
                </Col>
                <Col offset={0} span={9} style={{ textAlign: "left" }}>
                  <div>
                    <p>Copyright saveyourlocal 2020</p>
                  </div>
                </Col>
              </Row>
            </Row>
          </div>
        </div>
        <GoogleAnalyticsTag analyticsID={Config.GoogleAnalyticsID} />
      </AreaContext.Provider>
    );
  }
}

export default App;
