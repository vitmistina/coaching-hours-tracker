import React, { Component } from "react";
import PropTypes from "prop-types";

class AddMeeting extends Component {
  nameRef = React.createRef();
  dateRef = React.createRef();
  lengthRef = React.createRef();
  statusRef = React.createRef();

  createMeeting = event => {
    event.preventDefault();
    const meeting = {
      name: this.nameRef.current.value,
      date: this.dateRef.current.value,
      length: parseInt(this.lengthRef.current.value),
      status: this.statusRef.current.value
    };
    this.props.addMeeting(meeting);
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="meeting-edit" onSubmit={this.createMeeting}>
        <input name="name" ref={this.nameRef} placeholder="Name" type="text" />
        <input
          name="date"
          ref={this.dateRef}
          type="date"
          defaultValue={new Date().toISOString().substr(0, 10)}
        />
        <input
          name="length"
          ref={this.lengthRef}
          placeholder="30"
          type="number"
        />
        <select name="status" ref={this.statusRef}>
          <option value="planned">Planned</option>
          <option value="done">Done!</option>
        </select>
        <button type="submit">Add Meeting</button>
      </form>
    );
  }
}

AddMeeting.propTypes = {
  addMeeting: PropTypes.func.isRequired
};

export default AddMeeting;
