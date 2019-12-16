import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InlineTextInput from "../../common/inputs/InlineTextInput.jsx";
import InlineHiddenInput from "../../common/inputs/InlineHiddenInput.jsx";
import BlueButton from "../../common/buttons/BlueButton.jsx";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton.jsx";
import * as userActions from "../../../actions/user/userActions";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUpForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = async event => {
    const { id, value } = event.target;

    if (id === "firstName") {
      setFirstName(value);
    } else if (id === "lastName") {
      setLastName(value);
    } else if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    } else if (id === "phoneNumber") {
      setPhoneNumber(value);
    }
  };

  useEffect(() => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[!@#\$%\^\&*\)\(+=._-]/g;

    if (password.length == 0) {
      setPasswordMessage("");
    } else if (password.length < 8) {
      setPasswordMessage("Password must be at least 8 characters long.");
    } else if (!password.match(lowerCaseLetters)) {
      setPasswordMessage("Password must contain a lower case letter.");
    } else if (!password.match(upperCaseLetters)) {
      setPasswordMessage("Password must contain an upper case letter.");
    } else if (!password.match(numbers)) {
      setPasswordMessage("Password must contain a number.");
    } else if (!password.match(specialCharacters)) {
      setPasswordMessage("Password must contain a special character.");
    } else {
      setPasswordMessage("");
    }
  }, [password]);

  useEffect(() => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.length === 0) {
      setEmailMessage("");
    } else if (!email.match(emailRegex)) {
      setEmailMessage("Invalid email.");
    } else {
      setEmailMessage("");
    }
  }, [email]);

  useEffect(() => {
    const tenDigits = /[0-9]{10}/;

    if (phoneNumber.length === 0) {
      setPhoneNumberMessage("");
    } else if (!phoneNumber.match(tenDigits) || phoneNumber.length > 10) {
      setPhoneNumberMessage("Invalid phone number.");
    } else {
      setPhoneNumberMessage("");
    }
  }, [phoneNumber]);

  async function handleSubmit() {
    const response = await userActions.createUser({
      firstName,
      lastName,
      password,
      email,
      phoneNumber,
      username: email,
      country: "",
      state: ""
    });

    console.log(response.url.split("/"[3]));

    if (response.url.split("/")[3])
      if (response.status !== 200) {
        toast.error("There was an error.");
      }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <header className="card-header">
            <BlueOutlineButton
              text="Sign in"
              bootstrap="float-right mt-1"
              handleClick={props.handleLogInClick}
            />
            <h4 className="card-title mt-2">Sign up</h4>
          </header>
          <article className="card-body">
            <form onSubmit={handleSubmit}>
              <InlineTextInput
                label="First Name"
                id="firstName"
                value={firstName}
                handleChange={handleChange}
              />
              <InlineTextInput
                label="Last Name"
                id="lastName"
                value={lastName}
                handleChange={handleChange}
              />
              <InlineTextInput
                label="Email"
                id="email"
                value={email}
                handleChange={handleChange}
                helpText={emailMessage}
              />
              <InlineTextInput
                label="Phone Number"
                id="phoneNumber"
                value={phoneNumber}
                handleChange={handleChange}
                helpText={phoneNumberMessage}
              />
              <InlineHiddenInput
                label="Password"
                id="password"
                value={password}
                handleChange={handleChange}
                helpText={passwordMessage}
              />
              <BlueButton bootstrap="btn-block" text="Create Account" />
            </form>
          </article>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
