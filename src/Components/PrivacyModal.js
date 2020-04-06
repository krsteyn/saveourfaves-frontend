import React from "react";
import { Modal } from "antd";
import Constants from "../Constants";

class FAQEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  getBody = () => {
    return { __html: this.props.body };
  };

  render() {
    return (
      <>
        <h3
          style={{ cursor: "pointer" }}
          onClick={event => this.setState({ expanded: !this.state.expanded })}
        >
          {this.props.title}
        </h3>
        {this.state.expanded && (
          <p dangerouslySetInnerHTML={this.getBody()}></p>
        )}
      </>
    );
  }
}

function PrivacyModal(props) {
  function renderLink(url, text, target) {
    target = target || "_blank";
    return "<a target='" + target + "' href='" + url + "'>" + text + "</a>";
  }

  function addPlaceLink(text) {
    return renderLink(Constants.AddPlaceURL, text, "_self");
  }

  const privacyPolicy = [
    {
      title: "What is SaveOurFaves?",
      body:
        "SaveOurFaves is a directory of Bay Area restaurants and coffee shops that offer online gift cards for purchase. It’s our hope that by providing this resource, we’ll be able to mobilize loyal customers to provide much-needed support for their favorite places in town. We also link to staff donation sites, if they are available."
    },
    {
      title: "Why isn’t my favorite business on your site?",
      body:
        "Please help us add your fave Bay Area food & beverages spots " +
        addPlaceLink("here") +
        ". We're open to adding more small business categories if this catches on."
    },
    {
      title:
        "How else can I support our local businesses beyond purchasing a gift card?",
      body:
        "Delivery and pickup are great options! Some restaurants that don’t normally offer delivery have started to offer curbside pickup, and others have closed temporarily. Check their website or social media for the latest info, or browse the " +
        renderLink(
          "https://projects.sfchronicle.com/2020/restaurant-delivery/",
          "San Francisco Chronicle's list"
        ) +
        " of Bay Area restaurants offering takeout. <br />" +
        "Tip generously if you can (even for delivery/pickup), since employees are doing extra work and putting their health at risk. <br />" +
        "Encourage the government to get involved. Sign this " +
        renderLink("http://chng.it/jM97Sbf9ct", "San Francisco petition") +
        " to encourage lawmakers to offer emergency small business loans. Please call your US Representative and your Senators. You can be connected to the capitol switchboard at 202-224-3121. Demand that small businesses are part the federal stimulus plan."
    },
    {
      title: "Why is this just for the Bay Area? Can you do this for my city?",
      body:
        "As San Francisco natives, we started this project for our community. Over the past days, people have launched similar tools for their specific cities, or even nationally. Check out " +
        renderLink("https://helpmainstreet.com/", "Help Main Street") +
        ", " +
        renderLink("https://givelocal.co/", "GiveLocal") +
        ", and " +
        renderLink(
          "https://rallyforrestaurants.com/",
          "Rally for Restaurants"
        ) +
        "."
    },
    {
      title: "Who built this? And why?",
      body:
        "We’re Kaitlyn & Mike Krieger -- a husband and wife duo in San Francisco. We’re no longer going out because of COVID-19 (San Francisco is under a “shelter in place” ordinance), so we started buying gift cards to help support our favorite cafes and restaurants during this unpredictable time. SaveOurFaves is our simple way to make it easier for people to help local businesses through this difficult time. We got help and advice from some great friends and local business owners, in particular Phil Levin, Zack Schwab, Kristen Berman, Stefanie Krieger, Melissa Dyrdahl, Laura Buhler, Paul Einbund, and Eddie Hernandez. You can contact us with any questions about the site at " +
        renderLink("mailto:info@saveourfaves.org", "info@saveourfaves.org") +
        " and see more about why we decided to start it " +
        renderLink(
          "https://medium.com/@mikekrieger/launching-saveourfaves-lets-support-restaurants-with-gift-cards-c4fb3e1828cf",
          "here"
        ) +
        "."
    }
  ];
  return (
    <Modal
      title="FAQs"
      visible={props.shouldShow}
      onOk={props.onClose}
      width="80%"
      onCancel={props.onClose}
      footer={<span></span>}
    >
      <h2>Privacy Policy</h2>
      {privacyPolicy.map(faq => (
        <FAQEntry key={faq.title} title={faq.title} body={faq.body} />
      ))}
    </Modal>
  );
}

export default PrivacyModal;
