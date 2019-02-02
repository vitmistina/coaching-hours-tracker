import React from "react";
import PropTypes from "prop-types";

const loginProviders = ["Google", "Facebook"];

const Login = props => (
  <nav className="login">
    <h1>Coaching hours tracker</h1>
    <div className="buttons">
      {loginProviders.map(provider => (
        <button
          key={provider}
          className={`small-button primaryD ${provider.toLowerCase()}`}
          onClick={() => props.authenticate(provider)}
        >
          Log in with {provider}
        </button>
      ))}
    </div>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired
};

export default Login;
