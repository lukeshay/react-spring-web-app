import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "react-toastify";
import * as userActions from "../../../state/user/userActions";
import { User } from "../../../types";
import * as ResponseUtils from "../.././../utils/responseUtils";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";

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
    validatePassword();
  }, [password]);

  useEffect(() => {
    validateEmail();
  }, [email]);

  useEffect(() => {
    validatePhoneNumber();
  }, [phoneNumber]);

  const validatePassword = (): boolean => {
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialCharacters = /[!@#\$%\^\&*\)\(+=._-]/g;

    if (password.length === 0) {
      setPasswordMessage("");
      return false;
    } else if (password.length < 8) {
      setPasswordMessage("Password must be at least 8 characters long.");
      return false;
    } else if (!password.match(lowerCaseLetters)) {
      setPasswordMessage("Password must contain a lower case letter.");
      return false;
    } else if (!password.match(upperCaseLetters)) {
      setPasswordMessage("Password must contain an upper case letter.");
      return false;
    } else if (!password.match(numbers)) {
      setPasswordMessage("Password must contain a number.");
      return false;
    } else if (!password.match(specialCharacters)) {
      setPasswordMessage("Password must contain a special character.");
      return false;
    } else {
      setPasswordMessage("");
      return true;
    }
  };

  const validateEmail = (): boolean => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.length === 0) {
      setEmailMessage("");
      return false;
    } else if (!email.match(emailRegex)) {
      setEmailMessage("Invalid email.");
      return false;
    } else {
      setEmailMessage("");
      return true;
    }
  };

  const validatePhoneNumber = (): boolean => {
    const tenDigits = /[0-9]{10}/;

    if (phoneNumber.length === 0) {
      setPhoneNumberMessage("");
      return false;
    } else if (!phoneNumber.match(tenDigits) || phoneNumber.length > 10) {
      setPhoneNumberMessage("Invalid phone number. Format: ##########");
      return false;
    } else {
      setPhoneNumberMessage("");
      return true;
    }
  };

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

    if (validatePhoneNumber() && validateEmail()) {
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
          ResponseUtils.createUserResponse(response).then((message) =>
            toast.error("Error: " + message)
          );
        }
      }
    }
  }

  const formInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="First Name"
        id="firstName"
        value={firstName}
        handleChange={handleChange}
        type="text"
      />
      <Input
        placeholder="Last Name"
        id="lastName"
        value={lastName}
        handleChange={handleChange}
        type="text"
      />
      <Input
        placeholder="Email"
        id="email"
        value={email}
        handleChange={handleChange}
        helpText={emailMessage}
        type="text"
      />
      <Input
        placeholder="Phone Number"
        id="phoneNumber"
        value={phoneNumber}
        handleChange={handleChange}
        helpText={phoneNumberMessage}
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
        Sign up
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <BlueOutlineButton
          text="Sign in"
          bootstrap="float-right mt-1"
          handleClick={props.handleSignInClick}
        />
      </div>
    </div>
  );

  return (
    <Form
      title={title}
      buttonText="Create Account"
      formInputs={formInputs}
      handleSubmit={handleSubmit}
    />
  );
};

export default React.memo(SignUpForm);
