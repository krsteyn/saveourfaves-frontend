import React from "react";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import SFPlaces from "../CityData/Places";
import Autosuggest from "react-autosuggest";
import { LogEngagementEvent } from "../Logging";
import { AddNewPlaceModal } from "./AddNewPlaceModal";
import axios from "axios";

const { Search } = Input;

export class PlaceAutosuggestion extends React.Component {
  maxSuggestions = 8;
  places = [];
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      showAddModal: false,
      suggestions: []
    };
  }

  sanitizeInput = input => {
    return input
      .trim()
      .toLowerCase()
      .replace("é", "e");
  };

  componentDidMount = async () => {
    this.places = await this.fetchPlacesList();
  };

  getSuggestions = value => {
    const inputValue = this.sanitizeInput(value);
    const inputLength = inputValue.length;
    if (inputLength < 3) {
      return [];
    } else {
      const results = this.places
        .filter(
          place => this.sanitizeInput(place.name).indexOf(inputValue) !== -1
        )
        .slice(0, this.maxSuggestions);
      if (results.length === 0) {
        LogEngagementEvent("user-roadblock", "no-results");
      }
      results.push({ special: "letUsKnowRow" });
      return results;
    }
  };
  fetchPlacesList(ref) {
    return axios
      .get("api/places/list", {
        params: {}
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return [];
      });
  }
  getSuggestionValue = suggestion => suggestion.name || "";
  renderSuggestion = suggestion => {
    if (suggestion.special) {
      return (
        <div>
          <div>Don't see your local?</div>
          <div>
            <a
              onClick={() => {
                this.setState({ showAddModal: false });
              }}
              className="primary-link"
            >
              Let us know
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>{suggestion.name}</div>
          <div className="autosuggest-address">{suggestion.address}</div>
        </div>
      );
    }
  };
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    this.props.onSearchChanged(newValue);
  };
  onSuggestionsFetchRequested = async ({ value }) => {
    this.setState({
      suggestions: await this.getSuggestions(value)
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  renderInputComponent = inputProps => (
    <div className="react-autosuggest__wrapper">
      <div className="react-autosuggest__left-icon">
        <img src="/search-icon.png" />
      </div>
      <input {...inputProps} />
    </div>
  );

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "‍Search for a restaurant, coffee...",
      value,
      onChange: this.onChange,
      onFocus: event => {
        LogEngagementEvent("user-action", "search-entered");
      }
    };
    return (
      <div className="autosuggest-outer">
        <AddNewPlaceModal
          shouldShow={this.state.showAddModal}
          onClose={() => this.setState({ showAddModal: false })}
        />
        <Autosuggest
          suggestions={suggestions}
          focusInputOnSuggestionClick={false}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          highlightFirstSuggestion={true}
          renderInputComponent={this.renderInputComponent}
          onSuggestionSelected={(event, data) => {
            if (data.suggestion.special) {
              LogEngagementEvent(
                "user-click",
                "tell-us-missing-place",
                this.state.value
              );
              this.setState({ showAddModal: true });
            } else {
              const key = data.suggestion.key;
              this.props.onPlaceSelected(key);
            }
          }}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
      </div>
    );
  }
}
