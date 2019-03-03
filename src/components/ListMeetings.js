import React from "react";
import PropTypes from "prop-types";
import dateFns from "date-fns";
import { meetingShape } from "../prop-helpers";
import { statusOptions, seasonOptions } from "../configs";
import ListMeetingsItem from "./ListMeetingsItem";
import Filter from "./Filter";

class ListMeetings extends React.Component {
  state = {
    status: "all",
    season: "all"
  };

  componentDidMount() {
    const status = localStorage.getItem(`filterStatus`);
    const season = localStorage.getItem(`filterSeason`);
    let newState = {};
    if (status) newState.status = status;
    if (season) newState.season = season;

    if (Object.keys(newState).length > 0) this.setState(newState);
  }

  handleStatusFilter = event => {
    const status = event.target.value;
    localStorage.setItem(`filterStatus`, status);
    this.setState({ status });
  };

  handleSeasonFilter = event => {
    const season = event.target.value;
    localStorage.setItem(`filterSeason`, season);
    this.setState({ season });
  };

  filterStatusFn = key => {
    const meeting = this.props.meetings[key];
    const status = this.state.status;
    if (status === "all") return true;
    if (status === meeting.status) return true;
    return false;
  };

  filterSeasonFn = key => {
    const meeting = this.props.meetings[key];
    if (this.state.season === "all") return true;
    const { startDate, endDate } = seasonOptions[this.state.season];
    return dateFns.isWithinRange(meeting.date, startDate, endDate);
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="full">Filter for list of meetings</h2>
        <Filter
          season={this.state.season}
          status={this.state.status}
          handleSeasonFilter={this.handleSeasonFilter}
          handleStatusFilter={this.handleStatusFilter}
        />
        <hr className="full" />
        <h2 className="full">List of meetings</h2>
        <div className="meeting-list">
          {Object.keys(this.props.meetings)
            .filter(this.filterStatusFn)
            .filter(this.filterSeasonFn)
            .sort((a, b) =>
              this.props.meetings[a].date > this.props.meetings[b].date ? 1 : -1
            )
            .map(key => (
              <ListMeetingsItem
                meeting={this.props.meetings[key]}
                keyValue={key}
                key={key}
                history={this.props.history}
              />
            ))}
        </div>
      </React.Fragment>
    );
  }
}

ListMeetings.propTypes = {
  meetings: PropTypes.objectOf(meetingShape).isRequired,
  history: PropTypes.object.isRequired
};

export default ListMeetings;
