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

function TermsModal(props) {
  function renderLink(url, text, target) {
    target = target || "_blank";
    return "<a target='" + target + "' href='" + url + "'>" + text + "</a>";
  }

  function addPlaceLink(text) {
    return renderLink(Constants.AddPlaceURL, text, "_self");
  }

  const terms = [
    {
      title: "1. General Disclaimer",
      body:
        "Anyone may use any information presented on this website for non-commercial purposes, subject to any specific terms of use that might appear with such information,<br>" +
        "provided that the use of such information is accompanied by an acknowledgement that Save Your Local (“SYL”) is the source." +
        "<br>" +
        "<br>" +
        "If you choose to access and use any of the information made available to you on this site, you do so subject to these Website Terms and Conditions of Use<br>" +
        "and any specific terms that the owner or provider of that information has imposed on its use." +
        "<br>" +
        "<br>" +
        "Please take note of all Website Terms and Conditions of Use. Your use of this website implies an acceptance of the Website Terms and Conditions of Use and any <br>" +
        "other specific terms and an agreement to be bound by them. In the event of a conflict between the Website Terms and Conditions of Use of this website and any <br>" +
        "specific terms applicable, and only to the extent of the conflict, the more specific term will apply." +
        "<br>" +
        "<br>" +
        "SYL grants you a limited, revocable license to use this website subject to the Terms. The license is a personal, nontransferable, non-sublicensable, <br>" +
        "revocable license to access and use the website only as expressly permitted in these Website Terms and Conditions of Use. <br>" +
        "Except for this limited license, we do not grant you any other rights or license with respect to this website." +
        "<br>" +
        "<br>" +
        "Unless we have granted you permission in advance and in writing, you may use the website only for your personal, non-commercial use, and not to provide services <br>" +
        "to a third party. Any person wishing to use this web site contrary to the Website Terms and Conditions of Use must obtain prior written consent from SYL." +
        "<br>" +
        "<br>" +
        "SYL makes every effort to ensure, but cannot and does not guarantee, and makes no warranties as to, the accuracy, accessibility, integrity and timeliness of any <br>" +
        "information on the website. SYL assumes no liability or responsibility for any errors or omissions in the content of this site and further disclaims any liability <br>" +
        "of any nature for any loss howsoever arising in connection with using this website or any content contained herein. Furthermore, SYL reserves the right to make <br>" +
        "changes to these materials at any time without notice. If you find any inaccurate, out of date or incomplete information or material on this website, or if you <br>" +
        "suspect that something is an infringement of intellectual property rights, you must let us know immediately by contacting SYL or<br>" +
        "the owner or provider of the information to which the issue relates." +
        "<br>" +
        "<br>" +
        "<b>Intellectual Property</b> <br>" +
        "Unless otherwise stated, all right, title, interest, and ownership (including all rights under all copyright, patent, and other intellectual property laws) in, <br>" +
        "to or of this website are the sole property of or will vest in SYL. All moral rights are reserved." +
        "You should independently verify any information and material on this website before relying upon it. The information and material on this website are not substitutes <br>" +
        "for the exercise of professional judgment.  If you are not qualified or experienced enough to make that judgment, you should take professional advice or contact the <br>" +
        "relevant information owner or provider for further information and advice."
    },
    {
      title: "2. Third Party Links",
      body:
        "Hyperlinks provided on this website may direct you to other websites. SYL makes no warranty, either express or implied, as to the accuracy, availability, reliability or content <br>" +
        "of such information, text, graphics and hyperlinks. SYL will not be liable for any indirect or consequential loss, or for any loss of business, profit, revenue, goodwill or<br>" +
        "data, lost or wasted management time or the lost time of other employees arising from your use of this website or any information or material on it,<br>" +
        "or your inability to use it (whether that loss is direct or indirect)." +
        "<br>" +
        "<br>" +
        "Before purchasing any coupon, it is your responsibility to understand the policies of that establishment."
    },
    {
      title: "3. Security",
      body:
        "While SYL makes every effort to ensure that any executable material available to be downloaded from SYL’s website is free of any virus, it cannot guarantee that the material is <br>" +
        "free from any or all viruses. SYL is not responsible for any loss or damage howsoever caused by the executable material and potentially malicious code contained therein." +
        "<br>" +
        "<br>" +
        "You are responsible for ensuring that your computer systems are suitable to access and use this website. You are responsible for implementing sufficient anti-virus and other security <br>" +
        "checks to ensure the accuracy of data input and output."
    },
    {
      title: "4. Trademarks",
      body:
        "SYL’s logo and sub-logos, marks, and trade names are the trademarks of SYL and no person may use them without permission.  Any other trademarks or trade names that may appear on this <br>" +
        "web site or other marketing material of SYL is the property of the respective owners."
    },
    {
      title: "5. Privacy",
      body:
        "Any personal information we collect and/or retain through our website and through the registration process is subject to the terms of the SYL Privacy Policy currently in force and <br>" +
        "which policy available for review on this website"
    },
    {
      title: "6. Restrictions on Use of Website:",
      body:
        "a. Framing.  No one may frame this website or any of the pages on this website, or use any other framing technique to enclose any portion or aspect of the website, or mirror or<br>" +
        "replicate any portion of the website;<br>" +
        "b. Linking. We prohibit “deep linking” to any other pages in a manner that would incorrectly suggest endorsement or support of SYL or which would suggest you are the owner <br>" +
        "of any intellectual property belonging to SYL.<br>" +
        "c. Spiders and Crawlers.  No one may use any technology (including spiders or crawlers) to search and gain any information from this website.<br>" +
        "d. You specifically may not:<br>" +
        "i. Copy, reproduce, upload, post, display, republish, distribute, transmit, any part of the content in any form whatsoever;<br>" +
        "ii. Modify, translate into any language or computer language, or create derivative works from, any content or any part of this website;<br>" +
        "iii. Reverse engineer any part of this website; <br>" +
        "iv. Use the website other than to purchase a coupon;<br>" +
        "v Use the website to make any false, fraudulent or speculative reservation, or any reservation in anticipation of demand;<br>" +
        "vi. Disguise the information transmitted through the website;<br>" +
        "vii. Sell, offer for sale, transfer, or license any portion of the website in any form to any third parties;<br>" +
        "Viii. Use or access the website in any way that, in our reasonable judgment, adversely affects the performance or function of the website, or any other computer systems or <br>" +
        "networks used by SYL other website users;<br>" +
        "ix. Upload or transmit to the website or use any device, software or routine that contains viruses, Trojan horses, worms, time bombs, or other computer programming routines that<br>" +
        "may damage, interfere or attempt to interfere with, intercept, the normal operation of our website, or appropriate the website or any system, or take any action that imposes an <br>" +
        "unreasonable load on our computer equipment, or that infringes upon the rights of a third party;<br>" +
        "x. Use any device, software, or routine that interferes, or attempts to interfere, with the normal operation of our website, or take any action that impose an unreasonable load on our equipment; or<br>" +
        "xi. disguise the origin of the information transmitted through the website.All warranties, representations, terms, conditions and undertakings, whether implied by statute, common law, <br>" +
        "custom, trade usage, course of dealing or otherwise (including any implied warranty, representation, term, condition or undertaking of satisfactory quality or fitness for a particular<br>" +
        "purpose) are excluded to the fullest extent allowed by law by SYL and the information owners and providers."
    },
    {
      title: "7. No Waiver",
      body:
        "No delay, neglect or forbearance on the part of SYL in enforcing any of its rights under the Website Terms and Conditions of Use will be, or be deemed to be, a waiver of, <br>" +
        "and will not prejudice, any right of SYL."
    },
    {
      title: "8. Severability",
      body:
        "If any of the Website Terms and Conditions of Use is held to be unenforceable, illegal or in some other way invalid, the unenforceable, illegal or invalid provision will be deemed <br>" +
        "to be severable and will not affect the remainder of the Website Terms and Conditions of Use which will continue to be of full force and effect."
    },
    {
      title: "9. Applicable Laws",
      body:
        "All conditions and terms of use contained in this website are governed by South African law and you agree to submit to the non-exclusive jurisdiction of the courts of South Africa." +
        "<br>" +
        "<br>" +
        "If the use of any information or material on this website is unlawful in any jurisdiction (because of your nationality, residence or for some other reason), then that information or <br>" +
        "material is not offered.  If you are outside the Republic of South Africa you must satisfy yourself that you are lawfully able to use any such information and materials.  We accept no <br>" +
        "liability, to the extent allowed by the law, for any costs, losses or damages resulting from or related to the access or attempted access of any information or materials by anyone outside <br>" +
        "the Republic of South Africa."
    },
    {
      title: "10. Whole Agreement",
      body:
        "No addition to or modification of any provision of these Website Terms and Conditions of Use will be binding on SYL unless made in writing and signed by their duly authorised representatives." +
        "<br>" +
        "<br>" +
        "SYL may modify, suspend, or discontinue providing this web site (with or without notice) and will not be liable."
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
