import React from "react";
import { Button, Row, Typography } from "antd";
import Skeleton from "react-loading-skeleton";
import { CallToActionButton } from "./CallToActionButton";
import { ExtraActionButtons } from "./ExtraActionButtons";

export class SuggestedPlaceCards extends React.Component {
  render() {
    const { Title } = Typography;
    var suggestedPlaceCards;
    if (this.props.suggestedPlaces && this.props.suggestedPlaces.length) {
      suggestedPlaceCards = this.props.suggestedPlaces.map(suggestion => (
        <div key={suggestion.placeID} className="suggested-place">
          <Row
            style={{
              backgroundSize: "cover",
              position: "relative",
              backgroundPosition: "center center",
              backgroundImage: "url(" + suggestion.imageURL + ")",
              minHeight: "155px",
              padding: "10px"
            }}
          ></Row>
          <Row style={{ minHeight: "88px" }}>
            <Title
              className="suggestion-title"
              style={{
                color: "white",
                textAlign: "center",
                width: "100%",
                marginTop: "12px",
                padding: "10px 6px"
              }}
              level={4}
            >
              {suggestion.name}
            </Title>
            <CallToActionButton place={suggestion} size={"default"} />
            <ExtraActionButtons place={suggestion} size={"default"} />
          </Row>
        </div>
      ));
    } else {
      suggestedPlaceCards = [...Array(9).keys()].map(placeholder => (
        <div key={placeholder}>
          <div style={{ marginTop: -4 }}>
            <Skeleton height={310} />
          </div>
        </div>
      ));
    }
    return (
      <div ref={this.props.passRef}>
        <Row style={{ justifyContent: "center", minWidth: 0 }}>
          {suggestedPlaceCards}
        </Row>
        {this.props.moreAvailable && (
          <div style={{ textAlign: "center" }}>
            <Button
              className="primary-button"
              shape="round"
              size="default"
              onClick={this.props.onLoadMore}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    );
  }
}
