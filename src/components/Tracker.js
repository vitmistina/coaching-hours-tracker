import React, { Component } from "react";
import dateFns from "date-fns";
import { Line } from "react-chartjs-2";
import TopNavigation from "./TopNavigation";
import base from "../base";

class Tracker extends Component {
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

  startDate = new Date("2019-01-29");
  endDate = new Date("2019-02-25");
  today = new Date();
  dateDifference = dateFns.differenceInDays(this.endDate, this.startDate);
  daysToGo = dateFns.differenceInDays(this.endDate, this.today);
  currentDayIndex = dateFns.differenceInDays(this.today, this.startDate);

  totalTargetHours = this.dateDifference * 2 - 2;

  targetLine = Array.from(
    new Array(this.dateDifference),
    (val, index) => this.totalTargetHours - 2 * index
  );

  data = {
    labels: Array.from(new Array(this.dateDifference), (val, index) =>
      dateFns.format(dateFns.addDays(this.startDate, index), "ddd DD.MM.")
    ),
    datasets: [
      {
        label: "Target",
        fill: true,
        data: this.targetLine,
        backgroundColor: "#673ab788"
      }
    ]
  };

  sumHours = date =>
    Object.keys(this.state.meetings)
      .filter(key =>
        dateFns.isBefore(new Date(this.state.meetings[key].date), date)
      )
      .reduce(
        (acc, key) => acc - this.state.meetings[key].length / 60,
        this.totalTargetHours
      );

  addPlanned = () => ({
    label: "Planned & Done",
    fill: true,
    data: this.targetLine.map((val, index) =>
      this.sumHours(dateFns.addDays(this.startDate, index + 1))
    ),
    backgroundColor: "#ffca2888"
  });

  fillData = () => ({
    ...this.data,
    datasets: [...this.data.datasets, this.addPlanned()]
  });

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
        {Object.keys(this.state.meetings).length > 0 && (
          <Line data={this.fillData} />
        )}
      </div>
    );
  }
}

export default Tracker;
