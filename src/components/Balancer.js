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
      <React.Fragment>
        <TopNavigation history={this.props.history} />

        <div className="container">
          {Object.keys(this.state.meetings).length > 0 && (
            <React.Fragment>
              <h2>Try to arrange sessions with these people</h2>
              {this.orderPersons()
                .slice(-3)
                .map(person => (
                  <div className="balancer person-card card" key={person.name}>
                    <div className="person-details-extended">
                      <span>{person.name}</span>
                      <span>
                        <a href={`mailto:${person.email}`}>{person.email}</a>
                      </span>
                      <span>
                        <a href={`tel:${person.phone}`}>{person.phone}</a>
                      </span>
                    </div>
                    <span className="hours-count">
                      {person.totalMinutes / 60} h
                    </span>
                  </div>
                ))}
            </React.Fragment>
          )}

          {Object.keys(this.state.meetings).length > 0 && (
            <React.Fragment>
              <h2>Top 3 partners in planned & done</h2>
              {this.orderPersons()
                .slice(0, 3)
                .map(person => (
                  <div className="balancer person-card card" key={person.name}>
                    <span>{person.name}</span>
                    <span>{person.totalMinutes / 60} h</span>
                  </div>
                ))}
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Balancer;
