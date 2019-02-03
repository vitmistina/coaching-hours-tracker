import React, { Component } from "react";
import TopNavigation from "./TopNavigation";
import people from "../people-list";
import base from "../base";

class Balancer extends Component {
  state = {
    meetings: {}
  };

  componentDidMount() {
    const uid = localStorage.getItem(`uid`);
    if (uid) {
      this.ref = base.syncState(`${uid}/meetings`, {
        context: this,
        state: "meetings"
      });
    }
  }

  orderPersons = () => {
    return people
      .map(person => ({
        ...person,
        totalMinutes: Object.keys(this.state.meetings)
          .filter(key => this.state.meetings[key].name === person.name)
          .reduce((acc, key) => acc + this.state.meetings[key].length, 0)
      }))
      .sort((a, b) => (a.totalMinutes >= b.totalMinutes ? -1 : 1));
  };

  render() {
    return (
      <div>
        <TopNavigation history={this.props.history} />

        {Object.keys(this.state.meetings).length > 0 && (
          <div className="balancer-partner-suggestion-grid">
            <h2>Try to arrange sessions with these people</h2>
            {this.orderPersons()
              .slice(-3)
              .map(person => (
                <React.Fragment>
                  <span>{person.name}</span>
                  <span>{person.totalMinutes / 60} h</span>
                  <span>
                    <a href={`mailto:${person.email}`}>{person.email}</a>
                  </span>
                  <span>
                    <a href={`tel:${person.phone}`}>{person.phone}</a>
                  </span>
                </React.Fragment>
              ))}
          </div>
        )}

        {Object.keys(this.state.meetings).length > 0 && (
          <div className="balancer-top3-grid">
            <h2>Top 3 partners in planned & done</h2>
            {this.orderPersons()
              .slice(0, 3)
              .map(person => (
                <React.Fragment>
                  <span>{person.name}</span>
                  <span>{person.totalMinutes / 60} h</span>
                </React.Fragment>
              ))}
          </div>
        )}
      </div>
    );
  }
}

export default Balancer;
