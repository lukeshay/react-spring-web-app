import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import React from "react";
import { signIn } from "../../../actions/user/userActions";
import BlueButton from "../../common/buttons/BlueButton";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton";
import InlineHiddenInput from "../../common/inputs/onchange/InlineHiddenInput";
import InlineTextInput from "../../common/inputs/onchange/InlineTextInput";

export interface IPropsLogInForm {
  handleSignUpClick?(event: any): void;
}

const LogInForm: React.FC<IPropsLogInForm> = (props: IPropsLogInForm) => {
  const [email, setEmail] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");

  async function handleChange(event: any): Promise<void> {
    const { id, value } = event.target;

    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();

    const response = await signIn(email, password);

    if (response instanceof Response && response.status === 401) {
      setPasswordMessage(
        "User not found or incorrect password. Try a different username or password."
      );
    } else if (response instanceof Response && response.status === 200) {
      setPasswordMessage("");
    } else {
      setPasswordMessage("There was an error. Please try again.");
    }
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
                label="Email"
                id="email"
                value={email}
                handleChange={handleChange}
                helpText={emailMessage}
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
};

export default React.memo(LogInForm);
