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
      title: "What we do:",
      body:
        "<ul>" +
        "<li>K2020183515 (South Africa) NPC (trading as Save Your Local) (“Save Your Local”, “we” or “us”) is a non-profit company, registered and conducting its business in the Republic South Africa, under registration number 2020/183515/08.</li>" +
        "<li>We provide an online platform which allows small businesses (for example, merchants in the hospitality industry, such as restaurants and hotels or any other service based business) to sell vouchers in exchange for products or services to their customers during the Covid-19 pandemic.</li>" +
        "<li>The coupons are sold by the merchants at a discounted price and will be redeemable by customers with the merchants directly, once the merchants are fully operational again.</li>" +
        "<li>The contract of sale for the coupon/vouchure will be entered into between the merchant and the customer, with Save Your Local merely facilitating the transaction. </li>" +
        "<li>This transaction between the merchant and customer, will be conducted through the Hyperli platform, and merchants need to comply with their Terms and conditions?</li>" +
        "<li>The customer will pay the merchant directly and upon receipt of proof of payment, Save Your Local will issue the customer with a redeemable voucher/coupon on behalf of the merchant.</li>" +
        "<li>This initiative has been designed to assist merchants in combatting the negative financial and economic implications of the Covid-19 pandemic and continuing to generate revenue, despite the fact that they cannot currently service their customers.</li>" +
        "<li>The merchant remains responsible for ensuring that its business is compliant with all laws, including compliance in relation to the goods and services provided against redemption of the voucher, and the validity of the voucher itself.</li>" +
        "<li>Save Your Local does not guarantee any customers will buy vouchers or coupons for your products or services.</li>" +
        "<li>Save Your Local is a platform designed to allow you the merchant to market and sell vouchers to your existing customers using various channels that you own e.g. newsletters, social media, SMS etc.</li>" +
        "</ul>"
    }
    // {
    //   title: "Are you a merchant?",
    //   body:
    //     "<h4>Please send us: </h4>" +
    //     "<ul>" +
    //     "<li>The name of your business</li>" +
    //     "<li>The location at which you trade</li>" +
    //     "<li>Your business contact details (we require an invoice from a supplier / landlord reflecting your trading name, and confirming the physical address at which you trade)</li>" +
    //     "<li>a bank letter containing your banking details and </li>" +
    //     "<li>a description of the coupons or vouchers which you will be offering to customers</li>" +
    //     "<li>Copies of the IDs of the directors and shareholders / owners of the business</li>" +
    //     "</ul>"
    // }
  ];

  const ansFAQs = [
    {
      title: "What is Save Your Local?",
      body:
        "Save your Local is a collaboration between various entrepreneurs in South Africa. We wanted to be able to use our skills and experience to assist small and medium sized businessesd in South African during the Covid-19 pandemic." +
        "Save your Local is a non-profit company which has secured, on a pro bono basis, the services of a number of businesses and partner organisation (see here) which have worked together to create a marketplace where small businesses can advertise their goods and services and sell vouchers which can later be redeemed at their establishments."
    },
    {
      title: "What kinds of businesses can participate? ",
      body:
        "Any small business, formally registered in South Africa and tax compliant, can apply for registration and participation on this platform. "
    },
    {
      title: "Why isn’t my favourite business on your site?",
      body:
        "If you want to support a business that isn’t reflected, please let them, and us, know. If they register, we can load them onto our system (we do have a validation process that they must work through), and you can support them."
    },
    {
      title:
        "Is this just for Jo’burg, Cape Town and Durbs? Can you do this for my town or suburb?",
      body:
        "SYL is open to any registered South African business regardless of location in South Africa. If a business registers successfully with us, they can be reflected on our platform."
    },
    {
      title: "Who built this? And why?",
      body:
        "The businesses and people reflected here have all been involved to ensure that Save Your Local was able to launch and assist businesses as fast as possible, because we know the importance of small businesses to the economy, jobs and the country. We have all been involved with or built small businesses of our own, and we are aware of the stresses placed on business owners at this time."
    }
  ];

  const bizFAQs = [
    {
      title: "Why do you want so much paperwork from me?",
      body:
        "We want to minimise any risk that there may be in inadvertently listing a fraudulent voucher or business. By making sure that we only have vetted, operational businesses on the platform, we are protecting everyone’s brand and reputation including your own."
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
