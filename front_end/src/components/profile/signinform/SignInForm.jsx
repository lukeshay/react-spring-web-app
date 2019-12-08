import React, { useState, useEffect } from "react";
import InlineTextInput from "../../common/inputs/InlineTextInput.jsx";
import InlineHiddenInput from "../../common/inputs/InlineHiddenInput.jsx";
import BlueButton from "../../common/buttons/BlueButton.jsx";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { signIn } from "../../../actions/user/userActions";

function LogInForm(props) {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  async function handleChange(event) {
    const { id, value } = event.target;

    if (id === "username") {
      setUsername(value);
    } else if (id === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit() {
    signIn(username, password);
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <header className="card-header">
            <BlueOutlineButton
              text="Sign up"
              bootstrap="float-right mt-1"
              handleClick={props.handleSignUpClick}
            />
            <h4 className="card-title mt-2">Sign in</h4>
          </header>
          <article className="card-body">
            <form onSubmit={handleSubmit}>
              <InlineTextInput
                label="Username"
                id="username"
                value={username}
                handleChange={handleChange}
                helpText={usernameMessage}
              />
              <InlineHiddenInput
                label="Password"
                id="password"
                value={password}
                handleChange={handleChange}
                helpText={passwordMessage}
              />
              <BlueButton bootstrap="btn-block" text="Sign in" />
            </form>
          </article>
        </div>
      </div>
    </div>
  );
}

export default LogInForm;
