import React from "react";
import PropTypes from "prop-types";
import { meetingShape } from "../prop-helpers";
import ListMeetingsItem from "./ListMeetingsItem";

const ListMeetings = props => {
  return (
    <div className="meeting-list">
      {Object.keys(props.meetings)
        .sort((a, b) =>
          props.meetings[a].date > props.meetings[b].date ? 1 : -1
        )
        .map(key => (
          <ListMeetingsItem
            meeting={props.meetings[key]}
            keyValue={key}
            key={key}
            history={props.history}
          />
        ))}
    </div>
  );
};

ListMeetings.propTypes = {
  meetings: PropTypes.objectOf(meetingShape).isRequired,
  history: PropTypes.object.isRequired
};

export default ListMeetings;
