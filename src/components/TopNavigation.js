import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const TopNavigation = props => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/tracker">Tracker</Link>
        </li>
        <li>
          <Link to="/balancer">Client Balancer</Link>
        </li>
      </ul>
    </nav>
  );
};

TopNavigation.propTypes = {
  history: PropTypes.object.isRequired
};

export default TopNavigation;
