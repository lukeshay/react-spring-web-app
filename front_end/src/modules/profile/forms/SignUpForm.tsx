import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import * as userActions from "../../../actions/user/userActions";
import { User } from "../../../types";
import BlueButton from "../../common/buttons/BlueButton";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton";
import InlineHiddenInput from "../../common/inputs/onchange/InlineHiddenInput";
import InlineTextInput from "../../common/inputs/onchange/InlineTextInput";

export interface IPropsSignUpForm {
  handleSignInClick?(event: any): void;
}

const SignUpForm: React.FC<IPropsSignUpForm> = (props: IPropsSignUpForm) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>("");
  const [errorCode, setErrorCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[!@#\$%\^\&*\)\(+=._-]/g;

    if (password.length === 0) {
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

  const handleChange = async (event: any): Promise<void> => {
    event.preventDefault();
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

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();

    const response = await userActions.createUser({
      country: "",
      email,
      firstName,
      lastName,
      password,
      phoneNumber,
      state: "",
      username: email
    } as User);

    if (response instanceof Response && response.url.split("/")[3]) {
      if (response.status !== 200) {
        toast.error("Error creating user");
      }
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
              handleClick={props.handleSignInClick}
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
};

export default React.memo(SignUpForm);
