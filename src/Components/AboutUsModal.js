import React from "react";
import { Modal } from "antd";

class FAQEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: true
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

function AboutUsModal(props) {
  const consumerFAQs = [
    {
      title: "Who Are We?:",
      body:
        "<p>" +
        "K2020183515 (South Africa) NPC (trading as Save Your Local) (“Save Your Local”, “we” or “us”) is " +
        "a non-profit company, registered and conducting its business in the Republic South Africa, under " +
        "registration number 2020/183515/08." +
        "</p>" +
        "<p>" +
        "We provide an online platform which allows small businesses (for example, merchants in the " +
        "hospitality industry, such as restaurants and hotels) (each a “Merchant”) to advertise listings of " +
        "the vouchers they wish to sell to their customers during the Covid-19 pandemic." +
        "</p>" +
        "<p>" +
        "This initiative has been designed to assist Merchants in combatting the negative financial and " +
        "economic implications of the Covid-19 pandemic and continuing to generate revenue, despite " +
        "the fact that they cannot currently service their customers. " +
        "</p>" +
        "<p>" +
        "Vouchers are sold by the Merchants through a third party voucher issuing website that the " +
        "Merchant registers with, at a discounted price and will be redeemable by customers with the " +
        "Merchants directly, once the merchants are fully operational again. Vouchers are valid for a " +
        "period of three years, in compliance with the Consumer Protection Act. " +
        "</p>" +
        "<p>" +
        "The Merchant remains responsible for ensuring that its business is compliant with all laws, " +
        "including compliance in relation to the goods and services provided against redemption of the " +
        "voucher, and the validity of the voucher itself. " +
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
    </Modal>
  );
}

export default AboutUsModal;
