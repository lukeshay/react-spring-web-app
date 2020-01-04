import { useContext, useState } from "react";
import React from "react";
import * as UserActions from "../../../context/user/userActions";
import { UserContext } from "../../../context/user/userStore";
import { User } from "../../../types";
import Button from "../../common/buttons/ButtonSecondary";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";

export interface IPropsProfileForm {
  user: User;
}

const ProfileForm: React.FC<IPropsProfileForm> = ({ user }) => {
  const { dispatch } = useContext(UserContext);
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>(user.phoneNumber);

  async function handleSignOutClick(): Promise<void> {
    UserActions.signOut(dispatch);
  }

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();

    UserActions.updateUser(dispatch, {
      ...user,
      email,
      firstName,
      lastName,
      phoneNumber
    } as User);
  }

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

  const formInputs: JSX.Element = (
    <React.Fragment>
      <Input
        value={firstName}
        id="firstName"
        placeholder="First Name"
        type="text"
        handleChange={handleChange}
      />
      <Input
        value={lastName}
        id="lastName"
        placeholder="Last Name"
        type="text"
        handleChange={handleChange}
      />
      <Input
        value={email}
        id="email"
        placeholder="Email"
        type="text"
        handleChange={handleChange}
      />
      <Input
        value={phoneNumber}
        id="phoneNumber"
        placeholder="Phone Number"
        type="text"
        handleChange={handleChange}
      />
    </React.Fragment>
  );

  const title: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Your profile
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <Button onClick={handleSignOutClick} type="button" variant="outlined">
          Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      title={title}
      buttonText="Update Account"
      formInputs={formInputs}
      handleSubmit={handleSubmit}
    />
  );
};

export default React.memo(ProfileForm);
