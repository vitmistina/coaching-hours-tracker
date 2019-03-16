import React, { Component } from "react";
import dateFns from "date-fns";
import { Line } from "react-chartjs-2";
import TopNavigation from "./TopNavigation";
import Filter from "./Filter";
import base from "../base";
import { seasonOptions } from "../configs";

class Tracker extends Component {
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

  today = new Date();
  dateDifference = () =>
    dateFns.differenceInDays(
      seasonOptions[this.state.season].endDate,
      seasonOptions[this.state.season].startDate
    );
  daysToGo = () =>
    dateFns.differenceInDays(
      seasonOptions[this.state.season].endDate,
      this.today
    );
  currentDayIndex = () =>
    dateFns.differenceInDays(
      this.today,
      seasonOptions[this.state.season].startDate
    );

  totalTargetHours = () => this.dateDifference() * 2 - 2;

  targetLine = () =>
    Array.from(
      new Array(this.dateDifference()),
      (val, index) => this.totalTargetHours() - 2 * index
    );

  data = () => ({
    labels: Array.from(new Array(this.dateDifference()), (val, index) =>
      dateFns.format(
        dateFns.addDays(seasonOptions[this.state.season].startDate, index),
        "ddd DD.MM."
      )
    ),
    datasets: [
      {
        label: "Target",
        fill: true,
        data: this.targetLine(),
        backgroundColor: "#673ab788"
      }
    ]
  });

  sumHours = date =>
    Object.keys(this.state.meetings)
      .filter(key => this.state.meetings[key].status != "cancelled")
      .filter(key =>
        dateFns.isWithinRange(
          new Date(this.state.meetings[key].date),
          seasonOptions[this.state.season].startDate,
          dateFns.subDays(date, 1)
        )
      )
      .reduce(
        (acc, key) => acc - this.state.meetings[key].length / 60,
        this.totalTargetHours()
      );

  addPlanned = () => ({
    label: "Planned & Done",
    fill: true,
    data: this.targetLine().map((val, index) =>
      this.sumHours(
        dateFns.addDays(seasonOptions[this.state.season].startDate, index + 1)
      )
    ),
    backgroundColor: "#ffca2888"
  });

  fillData = () => ({
    ...this.data(),
    datasets: [...this.data().datasets, this.addPlanned()]
  });

  handleSeasonFilter = event => {
    const season = event.target.value;
    localStorage.setItem(`filterSeason`, season);
    this.setState({ season });
  };

  render() {
    return (
      <div>
        <TopNavigation history={this.props.history} />
        {/* <div>
          You have {this.daysToGo} days to go and{" "}
          {this.data &&
            this.data.datasets[1] &&
            this.data.datasets[1].data[this.currentDayIndex] +
              "hours to complete"}{" "}
        </div> */}
        <div className="container">
          <h2>Filter</h2>
          <Filter
            season={this.state.season}
            handleSeasonFilter={this.handleSeasonFilter}
            status=""
            handleStatusFilter={() => console.log("status not supported")}
          />
          <hr />
          <h2>Tracker Line</h2>
          {Object.keys(this.state.meetings).length > 0 && (
            <Line data={this.fillData} />
          )}
        </div>
      </div>
    );
  }
}

export default Tracker;
