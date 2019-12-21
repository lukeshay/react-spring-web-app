import { useState, useEffect } from "react";
import * as React from "react";
import userStore from "../../../stores/userStore";
import * as UserActions from "../../../actions/user/userActions";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton.tsx";
import BlueButton from "../../common/buttons/BlueButton.tsx";
import InlineTextInput from "../../common/inputs/InlineTextInput.tsx";

function ProfileForm() {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [password, setPassword] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberMessage, setPhoneNumberMessage] = useState("");

  useEffect(() => {
    userStore.addChangeListener(handleUserChange);

    setUser(userStore.getUser());

    return () => userStore.removeChangeListener(handleUserChange);
  });

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

  function handleUserChange() {
    setUser(userStore.getUser());
  }

  function handleSignOut() {
    UserActions.signOut();
  }

  function handleChange(event) {
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
  }

  function handleSubmit(event) {
    event.preventDefault();

    UserActions.updateUser({
      ...user,
      email,
      firstName,
      lastName,
      phoneNumber
    });
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <header className="card-header">
            <BlueOutlineButton
              text="Sign out"
              bootstrap="float-right mt-1"
              handleClick={handleSignOut}
            />
            <h4 className="card-title mt-2">Your profile</h4>
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
              <BlueButton bootstrap="btn-block" text="Update Account" />
            </form>
          </article>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
