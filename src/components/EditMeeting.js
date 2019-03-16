import React, { Component } from "react";
import base from "../base";
import people from "../people-list";
import { statusOptions } from "../configs";

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
        <select
          name="name"
          ref={this.nameRef}
          value={meeting.name}
          onChange={this.handleChange}
          type="select"
        >
          {people.map(person => (
            <option value={person.name}>{person.name}</option>
          ))}
        </select>
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
          {Object.keys(statusOptions).map(key => (
            <option value={key} key={key}>
              {statusOptions[key]}
            </option>
          ))}
        </select>
        <button type="submit">Finished editing</button>
      </form>
    );
  }
}

EditMeeting.propTypes = {};

export default EditMeeting;
