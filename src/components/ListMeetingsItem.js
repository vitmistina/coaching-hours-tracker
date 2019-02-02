import React from "react";
import PropTypes from "prop-types";

const ListMeetingsItem = props => {
  const { meeting } = props;
  const navigate = event => {
    event.preventDefault();
    props.history.push("/meeting/" + props.keyValue);
  };
  return (
    <div>
      <span>{meeting.name}</span>
      <span>{meeting.date}</span>
      <span>{meeting.length}</span>
      <span>{meeting.status}</span>
      <button onClick={navigate}>Edit</button>
    </div>
  );
};

ListMeetingsItem.propTypes = {
  keyValue: PropTypes.string.isRequired,
  meeting: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default ListMeetingsItem;
