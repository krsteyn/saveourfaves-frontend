import React, { useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import { LogEngagementEvent } from "../Logging";
import Config from "../Config";
import useScript from "../lib/useScript";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
// If you want to use the provided css
// import 'react-google-places-autocomplete/dist/assets/index.css';

// TODO this shares a lot of logic with AddLinkModal.js

export function AddNewPlaceModal(props) {
  const [giftLink, setGiftLink] = useState("");
  const [donationLink, setDonationLink] = useState("");
  const [showDonationInput, setShowDonationInput] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [preferredProvider, setPreferredProvider] = useState("");
  const [error, setError] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null);
  var googleURL =
    "https://maps.googleapis.com/maps/api/js?key=" +
    Config.GoogleAPIKey +
    "&libraries=places";
  const [scriptLoaded] = useScript(googleURL);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  // this Counter is a hack so we can have two 'pages' in this Modal
  const [counter, setCounter] = useState(0);
  function resetAndClose() {
    setGiftLink("");
    setEmail("");
    setPhoneNumber("");
    setHasSubmitted(false);
    setCounter(0);
    setPreferredProvider("");
    props.onClose();
  }
  function closeSoon() {
    window.setTimeout(() => {
      resetAndClose();
    }, 5000);
  }
  function handleLinkSubmission() {
    if (!placeDetails) {
      setError("Please select a place above.");
      return;
    }
    setHasSubmitted(true);
    LogEngagementEvent("user-action", "submitted-new-place");
    setCounter(1);
    axios
      .post("/api/places/submit_new_place", {
        place_details: placeDetails,
        email: email,
        phone_number: phoneNumber,
        gift_card_url: giftLink,
        donation_url: donationLink,
        preferred_provided: preferredProvider
      })
      .then(response => {
        closeSoon();
      })
      .catch(error => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
          setHasSubmitted(false);
          setCounter(0);
        } else {
          closeSoon();
        }
      });
  }
  return (
    <Modal
      title={<span>Add a New Small Business</span>}
      visible={props.shouldShow}
      onOk={args => {
        counter === 0 ? handleLinkSubmission() : resetAndClose();
      }}
      width="600px"
      destroyOnClose={true}
      okButtonProps={{ shape: "round", className: "primary-button" }}
      cancelButtonProps={{ shape: "round" }}
      okText={hasSubmitted ? "Done" : "Submit"}
      onCancel={resetAndClose}
    >
      {hasSubmitted && (
        <div>
          Thanks! We'll add this to our queue and add the listing as soon as
          possible.
        </div>
      )}
      {!scriptLoaded && <div>Loading...</div>}
      {scriptLoaded && !hasSubmitted && (
        <div>
          <GooglePlacesAutocomplete
            onSelect={selected => {
              setError(null);
              setPlaceDetails(selected);
            }}
            placeholder={"Find the business"}
            inputClassName={"add-link-modal-input"}
            autocompletionRequest={{
              types: ["establishment"],
              location: { lat: -29.116305, lng: 26.2174563 },
              radius: 8000,
              componentRestrictions: {
                country: "za"
              }
            }}
            types={["establishment"]}
          />
          <input
            className="add-link-modal-input"
            onChange={event => {
              setGiftLink(event.target.value);
            }}
            type="text"
            placeholder="Voucher Link (if you know it)"
            value={giftLink}
          />
          <select
            className="area-picker"
            value={preferredProvider}
            onChange={event => {
              setPreferredProvider(event.target.value);
            }}
          >
            <option value="hy">Hyperli</option>
            <option value="sc">Snapscan</option>
            {props.preferredProviders.map(provider => (
              <option value={provider.key}>{provider.name}</option>
            ))}
          </select>
          <input
            className="add-link-modal-input"
            onChange={event => {
              setEmail(event.target.value);
            }}
            type="text"
            placeholder="Contact Email (optional)"
            value={email}
          />
          <input
            className="add-link-modal-input"
            onChange={event => {
              setPhoneNumber(event.target.value);
            }}
            type="text"
            placeholder="Contact Number (optional)"
            value={phoneNumber}
          />
          <div style={{ marginTop: 8 }}>
            <a
              style={{ display: showDonationInput ? "none" : "inline" }}
              onClick={e => {
                setShowDonationInput(true);
              }}
            >
              [+] Add a donation/BackaBuddy link
            </a>
            <input
              className="add-link-modal-input"
              onChange={event => {
                setDonationLink(event.target.value);
              }}
              style={{ display: showDonationInput ? "block" : "none" }}
              type="text"
              placeholder="Donation/BackaBuddy Link"
              value={donationLink}
            />
          </div>
          {error && <div style={{ marginTop: 8 }}>{error}</div>}
        </div>
      )}
    </Modal>
  );
}

export default AddNewPlaceModal;
