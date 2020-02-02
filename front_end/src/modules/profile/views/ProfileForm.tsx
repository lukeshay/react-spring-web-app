import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import React from "react";
import * as UserActions from "../../../context/user/userActions";
import { useUserContext } from "../../../context/user/userStore";
import { User } from "../../../types";
import Button from "../../common/buttons/ButtonSecondary";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";

export interface IPropsProfileForm {
  user: User;
}

const ProfileForm: React.FC<IPropsProfileForm> = ({ user }): JSX.Element => {
  const { dispatch: userDispatch } = useUserContext();
  const [firstName, setFirstName] = React.useState<string>(user.firstName);
  const [lastName, setLastName] = React.useState<string>(user.lastName);
  const [email, setEmail] = React.useState<string>(user.email);
  const [phoneNumber, setPhoneNumber] = React.useState<string>(
    user.phoneNumber
  );

  async function handleSignOutClick(): Promise<void> {
    await UserActions.signOut(userDispatch);
  }

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();

    await UserActions.updateUser(userDispatch, {
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
      // } else if (id === "password") {
      //   setPassword(value);
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
        onChange={handleChange}
        autoComplete="first-name"
        autoCapitalize="true"
      />
      <Input
        value={lastName}
        id="lastName"
        placeholder="Last Name"
        type="text"
        onChange={handleChange}
        autoComplete="last-name"
        autoCapitalize="true"
      />
      <Input
        value={email}
        id="email"
        placeholder="Email"
        type="text"
        onChange={handleChange}
        autoComplete="email"
      />
      <Input
        value={phoneNumber}
        id="phoneNumber"
        placeholder="Phone Number"
        type="text"
        onChange={handleChange}
        autoComplete="phone-number"
      />
    </React.Fragment>
  );

  const title: JSX.Element = (
    <div style={{ display: "inline" }}>
      <div style={{ float: "left", marginRight: "25px", marginTop: "5px" }}>
        Your profile
      </div>
      <div style={{ float: "right", marginLeft: "25px" }}>
        <Button
          id="signOut"
          onClick={handleSignOutClick}
          type="button"
          variant="outlined"
        >
          Sign out
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      buttonText="Update Account"
      handleSubmit={handleSubmit}
      formInputs={formInputs}
      title={title}
      icon={<AccountCircleIcon />}
    />
  );
};

export default ProfileForm;
