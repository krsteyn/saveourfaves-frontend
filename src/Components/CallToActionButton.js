import React from "react";
import { Button } from "antd";
import { EmailSubscription } from "./EmailSubscription";
import { LogEngagementEvent } from "../Logging";

export class CallToActionButton extends React.Component {
  render() {
    var place = this.props.place;
    var size = this.props.size;
    const className =
      size === "large" ? "large-primary-button" : "secondary-button";
    return (
      <div key={place.placeID} className={" neighborhood-card-button-buy"}>
        {place.giftCardURL && (
          <Button
            size={size}
            className={"ant-btn header-button"}
            onClick={event => {
              LogEngagementEvent(
                "user-click",
                "get-gift-card-" + size,
                place.placeID
              );
              window.open(place.giftCardURL);
            }}
          >
            <p-custom style={{ "font-size": "0.8em" }}>
              {" "}
              <b>BUY A VOUCHER</b>
            </p-custom>
          </Button>
        )}
        {!place.giftCardURL && (
          <EmailSubscription place={this.props.place} buttonClass={className} />
        )}
      </div>
    );
  }
}
