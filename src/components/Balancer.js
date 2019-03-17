import React, { Component } from "react";
import dateFns from "date-fns";
import TopNavigation from "./TopNavigation";
import Filter from "./Filter";
import people from "../people-list";
import base from "../base";
import { seasonOptions } from "../configs";

class Balancer extends Component {
  state = {
    meetings: {},
    season: "february"
  };

  componentDidMount() {
    const uid = localStorage.getItem(`uid`);
    const season = localStorage.getItem(`filterSeason`);
    if (uid) {
      this.ref = base.syncState(`${uid}/meetings`, {
        context: this,
        state: "meetings"
      });
    }
    let newState = {};
    if (season) newState.season = season;

    if (Object.keys(newState).length > 0) this.setState(newState);
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  filterSeason = key => {
    if (this.state.season === "all") return true;
    return dateFns.isWithinRange(
      new Date(this.state.meetings[key].date),
      seasonOptions[this.state.season].startDate,
      seasonOptions[this.state.season].endDate
    );
  };

  orderPersons = () => {
    return people
      .map(person => ({
        ...person,
        totalMinutes: Object.keys(this.state.meetings)
          .filter(key => this.state.meetings[key].name === person.name)
          .filter(this.filterSeason)
          .reduce((acc, key) => acc + this.state.meetings[key].length, 0)
      }))
      .sort((a, b) => (a.totalMinutes >= b.totalMinutes ? -1 : 1));
  };

  handleSeasonFilter = event => {
    const season = event.target.value;
    localStorage.setItem(`filterSeason`, season);
    this.setState({ season });
  };

  render() {
    return (
      <React.Fragment>
        <TopNavigation history={this.props.history} />

        <div className="container">
          <h2>Filter</h2>
          <Filter
            season={this.state.season}
            handleSeasonFilter={this.handleSeasonFilter}
            status=""
            handleStatusFilter={() => console.log("status not supported")}
          />
          <hr />
          {Object.keys(this.state.meetings).length > 0 && (
            <React.Fragment>
              <h2>Try to arrange sessions with these people</h2>
              {this.orderPersons()
                .slice(-8)
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
                      {(person.totalMinutes / 60).toFixed(2)} h
                    </span>
                  </div>
                ))
                .reverse()}
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
                    <span>{(person.totalMinutes / 60).toFixed(2)} h</span>
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
