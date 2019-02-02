import React, { Component } from "react";
import dateFns from "date-fns";
import { Line } from "react-chartjs-2";
import TopNavigation from "./TopNavigation";
import base, { firebaseApp } from "../base";

class Tracker extends Component {
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

  targetLine = Array.from(
    new Array(this.dateDifference),
    (val, index) => this.dateDifference * 2 - 2 * index - 2
  );

  data = {
    labels: Array.from(new Array(this.dateDifference), (val, index) =>
      dateFns.format(dateFns.addDays(this.startDate, index), "DD.MM.")
    ),
    datasets: [
      {
        label: "Target",
        fill: true,
        data: this.targetLine
      }
    ]
  };

  render() {
    return (
      <div>
        <TopNavigation history={this.props.history} />
        <Line data={this.data} />
      </div>
    );
  }
}

export default Tracker;
