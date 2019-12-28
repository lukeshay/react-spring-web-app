import { createRef, useEffect, useState } from "react";
import React from "react";
import * as UserActions from "../../../actions/user/userActions";
import { User } from "../../../types";
import BlueButton from "../../common/buttons/BlueButton";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton";
import InlineTextInput from "../../common/inputs/ref/InlineInput";

export interface IPropsProfileForm {
  user: User;
}

const ProfileForm: React.FC<IPropsProfileForm> = ({
  user
}: IPropsProfileForm) => {
  const firstName = createRef<HTMLInputElement>();
  const lastName = createRef<HTMLInputElement>();
  const email = createRef<HTMLInputElement>();
  const emailMessage = createRef<HTMLInputElement>();
  const password = createRef<HTMLInputElement>();
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const phoneNumber = createRef<HTMLInputElement>();
  const [phoneNumberMessage, setPhoneNumberMessage] = useState<string>("");

  function handleSignOut(): void {
    UserActions.signOut();
  }

  function handleSubmit(event: any): void {
    event.preventDefault();

    UserActions.updateUser({
      email: email.current && email.current.value,
      firstName: firstName.current && firstName.current.value,
      lastName: lastName.current && lastName.current.value,
      phoneNumber: phoneNumber.current && phoneNumber.current.value,
      ...user
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
                defaultValue={user && user.firstName}
                id="firstName"
                label="First Name"
                ref={firstName}
                type="text"
              />
              <InlineTextInput
                defaultValue={user && user.lastName}
                id="lastName"
                label="Last Name"
                ref={lastName}
                type="text"
              />
              <InlineTextInput
                defaultValue={user && user.email}
                id="email"
                label="Email"
                ref={email}
                type="text"
              />
              <InlineTextInput
                defaultValue={user && user.phoneNumber}
                id="phoneNumber"
                label="Phone Number"
                ref={phoneNumber}
                type="text"
              />

              <BlueButton bootstrap="btn-block" text="Update Account" />
            </form>
          </article>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileForm);
