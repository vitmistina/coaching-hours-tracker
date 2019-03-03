import React from "react";
import PropTypes from "prop-types";
import { statusOptions, seasonOptions } from "../configs";

const Filter = props => {
  return (
    <div>
      <div>
        <label htmlFor="status">Status</label>
        <select
          name="status"
          onChange={props.handleStatusFilter}
          value={props.status}
        >
          <option value="all">All</option>
          {Object.keys(statusOptions).map(key => (
            <option value={key} key={key}>
              {statusOptions[key]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="season">Season</label>
        <select
          name="season"
          onChange={props.handleSeasonFilter}
          value={props.season}
        >
          <option value="all">All</option>
          {Object.keys(seasonOptions).map(key => (
            <option value={key} key={key}>
              {seasonOptions[key].title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

Filter.propTypes = {
  handleStatusFilter: PropTypes.func.isRequired,
  handleSeasonFilter: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  season: PropTypes.string.isRequired
};

export default Filter;
