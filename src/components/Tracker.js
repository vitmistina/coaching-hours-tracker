import React, { Component } from "react";
import TopNavigation from "./TopNavigation";

class Tracker extends Component {
  render() {
    return (
      <div>
        <TopNavigation history={this.props.history} />
        Tracker
      </div>
    );
  }
}

export default Tracker;
