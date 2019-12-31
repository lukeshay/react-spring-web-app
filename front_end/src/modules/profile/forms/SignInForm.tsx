import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import React from "react";
import { signIn } from "../../../state/user/userActions";
import Button from "../../common/buttons/ButtonSecondary";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";

export interface IPropsLogInForm {
  handleSignUpClick(event: any): void;
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

  const formInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="Email"
        id="email"
        value={email}
        handleChange={handleChange}
        helpText={emailMessage}
        type="text"
      />
      <Input
        placeholder="Password"
        id="password"
        value={password}
        handleChange={handleChange}
        helpText={passwordMessage}
        type="password"
      />
    </React.Fragment>
  );

  const title: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Sign in
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <Button
          text="Sign up"
          onClick={props.handleSignUpClick}
          type="button"
          variant="outlined"
        />
      </div>
    </div>
  );

  return (
    <Form
      title={title}
      buttonText="Sign in"
      formInputs={formInputs}
      handleSubmit={handleSubmit}
    />
  );
};

export default React.memo(LogInForm);
