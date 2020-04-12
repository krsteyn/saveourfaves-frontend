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
        <h4
          style={{ cursor: "pointer" }}
          onClick={event => this.setState({ expanded: !this.state.expanded })}
        >
          {this.props.title}
        </h4>
        {this.state.expanded && (
          <p dangerouslySetInnerHTML={this.getBody()}></p>
        )}
      </>
    );
  }
}

function FAQModal(props) {
  function renderLink(url, text, target) {
    target = target || "_blank";
    return "<a target='" + target + "' href='" + url + "'>" + text + "</a>";
  }

  function addPlaceLink(text) {
    return renderLink(Constants.AddPlaceURL, text, "_self");
  }

  const consumerFAQs = [
    {
      title: "What is Save Your Local?:",
      body:
        "<p>" +
        "Save your Local is a collaboration between various entrepreneurs in South Africa. We wanted to " +
        "be able to use our skills and experience to assist small and medium size businesses in South " +
        "African during the Covid-19 lockdown.  " +
        "</p>" +
        "<p>" +
        "Save your Local is a non-profit company which has secured, on a pro bono basis, the services of" +
        "a number of partner businesses which have worked together to create a marketplace where" +
        "small businesses can advertise their goods and services and sell vouchers which can later be" +
        "redeemed at their establishments. " +
        "</p>"
    },
    {
      title: "Who built this? And why?:",
      body:
        "<p>" +
        "A number of businesses and people have all been involved to ensure that Save Your Local was " +
        "able to launch and assist businesses as fast as possible. Have a look at the tab at the top of our" +
        "landing page, to see who has been involved. " +
        "</p>" +
        "<p>" +
        "We have all been involved with or built small businesses of our own, and we are aware of the " +
        "stresses placed on business owners at this time. Some of us share the same concerns and " +
        "worries." +
        "</p>"
    },
    {
      title: "How does SaveYourLocal work?:",
      body:
        "<p>" +
        "We provide a platform which facilitates the advertising and sale of vouchers by local businesses " +
        "or Merchants. If you wish to purchase a voucher or make a donation to the establishment of your " +
        "choice, you will be directed to a third party website to complete the transaction. The affiliate " +
        "website is selected by the listed Merchant. " +
        "</p>"
    },
    {
      title: "What kinds of businesses can participate?:",
      body:
        "<p>" +
        "Any small business can apply for registration, subject to the requirements of the affiliate " +
        "platforms selected to complete the sale of the voucher. " +
        "</p>"
    },
    {
      title: "Why isn’t my favourite business on your site?:",
      body:
        "<p>" +
        "If you want to support a business that isn’t reflected, please let them, and us, know. If they " +
        "register, we can assist them with registering as a merchant (there is a validation process that " +
        "they must work through). Once they are loaded as a merchant, you can support them. " +
        "</p>"
    },
    {
      title:
        "Is this just for Jo’berg, Cape Town and Durbs? Can you do this for my city?:",
      body:
        "<p>" +
        "If a business registers successfully with one of the third party websites which fulfils the voucher " +
        "process, they can be reflected on our platform. " +
        "</p>"
    },
    {
      title:
        "Why is so much paperwork needed before I can register as a merchant with the voucher platforms? :",
      body:
        "<p>" +
        "It is necessary to prove that the person listing the voucher is actually linked to the business " +
        "advertised." +
        "</p>"
    },
    {
      title: "Who are the voucher issuing platforms?:",
      body:
        "<p>" +
        "We provide a platform which facilitates the advertising and sale of vouchers by local businesses. " +
        "If you wish to purchase a voucher or make a donation to the establishment of your choice, you " +
        "will be directed to a third party website to complete the transaction. The third party website is " +
        "selected by the listed business. " +
        "</p>" +
        "<p>" +
        "Rather than building out a tech capability of our own, we have partnered with the experts to " +
        "speedily provide a much needed service to small businesses. " +
        "</p>" +
        "<p>" +
        "We are busy contracting these voucher issuing platforms to ensure as far as we are able to, that " +
        "vouchers are issued with no costs. However, there may be some charges which are unavoidable, " +
        "and some voucher issuing platforms may charge a nominal amount. " +
        "<strong>Please read their terms carefully, as this is a contract between you and that platform.</strong> " +
        "The voucher will be issued in accordance with their standard practice" +
        "</p>"
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
      <h2>SAVE YOUR LOCAL</h2>
      <p>
        Save Your Local provides a curated online marketplace which connects
        local businesses to local customers. Save Your Local’s partners are able
        to issue a voucher which contains a unique code (numerical/alphabetical
        code or QR code) which can be used for redemption.
      </p>
      <br />

      {consumerFAQs.map(faq => (
        <FAQEntry key={faq.title} title={faq.title} body={faq.body} />
      ))}

      {/*{ansFAQs.map(faq => (*/}
      {/*  <FAQEntry key={faq.title} title={faq.title} body={faq.body} />*/}
      {/*))}*/}

      {/*<br />*/}
      {/*<h2>For Businesses</h2>*/}

      {/*{bizFAQs.map(faq => (*/}
      {/*  <FAQEntry key={faq.title} title={faq.title} body={faq.body} />*/}
      {/*))}*/}
    </Modal>
  );
}

export default FAQModal;
