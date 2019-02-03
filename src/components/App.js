import React, { Component } from "react";
import Login from "./Login";
import AddMeeting from "./AddMeeting";
import ListMeetings from "./ListMeetings";
import base, { firebaseApp } from "../base";
import firebase from "firebase";
import TopNavigation from "./TopNavigation";

class App extends Component {
  state = {
    uid: null,
    meetings: {},
    loading: false
  };

  componentDidMount() {
    const uid = localStorage.getItem(`uid`);
    this.setState({ uid });
    if (uid) {
      this.ref = base.syncState(`${uid}/meetings`, {
        context: this,
        state: "meetings"
      });
    }
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  authHandler = async result => {
    const uid = result.user.uid;
    this.setState({
      uid: uid,
      loading: false
    });
    localStorage.setItem(`uid`, uid);
    if (!this.ref) {
      this.ref = base.syncState(`${uid}/meetings`, {
        context: this,
        state: "meetings"
      });
    }
  };

  authenticate = provider => {
    this.setState({
      loading: true
    });
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  addMeeting = meeting => {
    const meetings = { ...this.state.meetings };
    meetings[`${meeting.name}-${Date.now()}`] = meeting;
    this.setState({ meetings });
    localStorage.setItem("meetings", JSON.stringify(meetings));
  };

  render() {
    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    return (
      <div>
        <h1 className="primaryD">Coaching hours tracker</h1>
        <TopNavigation history={this.props.history} />
        <div className="container">
          <AddMeeting addMeeting={this.addMeeting} />
          <ListMeetings
            meetings={this.state.meetings}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

export default App;
