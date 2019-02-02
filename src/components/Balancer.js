import React, { Component } from "react";
import TopNavigation from "./TopNavigation";

class Balancer extends Component {
  render() {
    return (
      <div>
        <TopNavigation history={this.props.history} />
        Balancer
      </div>
    );
  }
}

export default Balancer;
