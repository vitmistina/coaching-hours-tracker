import React, { Component } from "react";
import PropTypes from "prop-types";
import people from "../people-list";

class AddMeeting extends Component {
  state = {
    error: ""
  };

  nameRef = React.createRef();
  dateRef = React.createRef();
  lengthRef = React.createRef();
  statusRef = React.createRef();

  allRefs = [this.nameRef, this.dateRef, this.lengthRef, this.statusRef];

  validateRef = ref => (ref.current.value ? true : false);

  createMeeting = event => {
    event.preventDefault();
    if (!this.allRefs.map(this.validateRef).every(valid => valid)) {
      this.setState({ error: "You have to fill out every field in the form" });
      return;
    }
    this.setState({ error: "" });
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
        <select name="name" ref={this.nameRef} type="select">
          {people.map(person => (
            <option value={person.name} key={person.email}>
              {person.name}
            </option>
          ))}
        </select>
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
        {this.state.error.length > 0 && (
          <span className="error">{this.state.error}</span>
        )}
      </form>
    );
  }
}

AddMeeting.propTypes = {
  addMeeting: PropTypes.func.isRequired
};

export default AddMeeting;
