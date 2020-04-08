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
        <h3></h3>
        <p dangerouslySetInnerHTML={this.getBody()}></p>
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

  var target = "_blank";
  var url = "/SaveYourLocal_PrivacyPolicy.pdf";
  var text = "Click to view";

  const privacyPolicy = [
    {
      body: "<a target='" + target + "' href='" + url + "'>" + text + "</a>"
    }
  ];
  return (
    <Modal
      title="Privacy Policy"
      visible={props.shouldShow}
      onOk={props.onClose}
      width="80%"
      onCancel={props.onClose}
      footer={<span></span>}
    >
      {privacyPolicy.map(faq => (
        <FAQEntry key={faq.title} title={faq.title} body={faq.body} />
      ))}
    </Modal>
  );
}

export default PrivacyModal;
