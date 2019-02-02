import React, { Component } from "react";
import base, { firebaseApp } from "../base";

class EditMeeting extends Component {
  state = {
    meeting: {
      name: "",
      date: "",
      length: "",
      status: ""
    }
  };

  componentDidMount() {
    const uid = localStorage.getItem(`uid`);
    const meetingId = this.props.match.params.id;
    if (uid) {
      this.ref = base.syncState(`${uid}/meetings/${meetingId}`, {
        context: this,
        state: "meeting"
      });
    }
  }

  handleChange = event => {
    const { value, name } = event.currentTarget;
    const typedValue = name === "length" ? parseInt(value, 10) : value;
    this.setState({ meeting: { ...this.state.meeting, [name]: typedValue } });
  };

  finishEditing = event => {
    event.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const { meeting } = this.state;
    return (
      <form className="meeting-edit" onSubmit={this.finishEditing}>
        <input
          name="name"
          placeholder="Name"
          type="text"
          value={meeting.name}
          onChange={this.handleChange}
        />
        <input
          name="date"
          type="date"
          value={meeting.date}
          onChange={this.handleChange}
        />
        <input
          name="length"
          placeholder="30"
          type="number"
          value={meeting.length}
          onChange={this.handleChange}
        />
        <select
          name="status"
          value={meeting.status}
          onChange={this.handleChange}
        >
          <option value="planned">Planned</option>
          <option value="done">Done!</option>
        </select>
        <button type="submit">Finished editing</button>
      </form>
    );
  }
}

EditMeeting.propTypes = {};

export default EditMeeting;
