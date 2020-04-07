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
    return <p>{this.props.title}</p>;
  }
}

function TermsModal(props) {
  function renderLink(url, text, target) {
    target = target || "_blank";
    return "<p target='" + target + "' href='" + url + "'>" + text + "</a>";
  }

  function addPlaceLink(text) {
    return renderLink(Constants.AddPlaceURL, text, "_self");
  }

  const terms = [
    {
      title: "1.You have 12 months to redeem your voucher."
    },
    {
      title:
        "2.Your voucher is non-refundable, from time of purchase. The sale is final."
    },
    {
      title:
        "3.Your voucher is not changeable - you cannot change the ‘local’ for which the voucher was bought."
    },
    {
      title:
        "4.Your voucher can only be redeemed by presenting the voucher to your chosen local."
    },
    {
      title:
        "5.Should the local you support not be trading any longer, at the time of redemption, your voucher becomes non-redeemable."
    }
  ];
  return (
    <Modal
      title="Tc's & C's"
      visible={props.shouldShow}
      onOk={props.onClose}
      width="80%"
      onCancel={props.onClose}
      footer={<span></span>}
    >
      <h2>Terms and Conditions</h2>
      {terms.map(faq => (
        <FAQEntry key={faq.title} title={faq.title} body={faq.body} />
      ))}
    </Modal>
  );
}

export default TermsModal;
