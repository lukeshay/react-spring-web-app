import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import * as UserActions from "../../../context/user/userActions";
import { useUserContext } from "../../../context/user/userStore";
import { User } from "../../../types";
import * as RegexUtils from "../../../utils/regexUtils";
import * as ResponseUtils from "../../../utils/responseUtils";
import Button from "../../common/buttons/ButtonSecondary";
import Form from "../../common/forms/Form";
import Input from "../../common/inputs/Input";

export interface IPropsSignUpForm {
  handleSignInClick(event: any): void;
}

const SignUpForm: React.FC<IPropsSignUpForm> = (
  props: IPropsSignUpForm
): JSX.Element => {
  const { dispatch } = useUserContext();
  const [firstName, setFirstName] = React.useState<string>("");
  const [lastName, setLastName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [emailMessage, setEmailMessage] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordMessage, setPasswordMessage] = React.useState<string>("");
  const [repeatPassword, setRepeatPassword] = React.useState<string>("");
  const [repeatPasswordMessage, setRepeatPasswordMessage] = React.useState<
    string
  >("");
  const [phoneNumber, setPhoneNumber] = React.useState<string>("");
  const [phoneNumberMessage, setPhoneNumberMessage] = React.useState<string>(
    ""
  );

  const validatePassword = (): boolean => {
    if (password.length === 0) {
      setPasswordMessage("");
      return false;
    } else if (password.length < 8) {
      setPasswordMessage("Password must be at least 8 characters long.");
      return false;
    } else if (!RegexUtils.containsLowercase(password)) {
      setPasswordMessage("Password must contain a lower case letter.");
      return false;
    } else if (!RegexUtils.containsUppercase(password)) {
      setPasswordMessage("Password must contain an upper case letter.");
      return false;
    } else if (!RegexUtils.containsNumber(password)) {
      setPasswordMessage("Password must contain a number.");
      return false;
    } else if (!RegexUtils.containsSpecialCharacter(password)) {
      setPasswordMessage("Password must contain a special character.");
      return false;
    } else {
      setPasswordMessage("");
      return true;
    }
  };

  const validateEmail = (): boolean => {
    if (email.length === 0) {
      setEmailMessage("");
      return false;
    } else if (!RegexUtils.validEmail(email)) {
      setEmailMessage("Invalid email.");
      return false;
    } else {
      setEmailMessage("");
      return true;
    }
  };

  const validatePhoneNumber = (): boolean => {
    if (phoneNumber.length === 0) {
      setPhoneNumberMessage("");
      return false;
    } else if (
      !RegexUtils.containsOnlyNumbers(phoneNumber) ||
      phoneNumber.length > 10 ||
      phoneNumber.length < 10
    ) {
      setPhoneNumberMessage("Invalid phone number. Format: ##########");
      return false;
    } else {
      setPhoneNumberMessage("");
      return true;
    }
  };

  React.useEffect(() => {
    validatePassword();
  }, [password]);

  React.useEffect(() => {
    validateEmail();
  }, [email]);

  React.useEffect(() => {
    validatePhoneNumber();
  }, [phoneNumber]);

  React.useEffect(() => {
    if (repeatPassword !== password) {
      setRepeatPasswordMessage("Passwords do not match.");
    } else {
      setRepeatPasswordMessage("");
    }
  }, [password, repeatPassword]);

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
    } else if (id === "repeatPassword") {
      setRepeatPassword(value);
    }
  };

  async function handleSubmit(event: any): Promise<void> {
    event.preventDefault();

    if (validatePhoneNumber() && validateEmail()) {
      const response = await UserActions.createUser(dispatch, {
        country: "",
        email,
        firstName,
        lastName,
        password,
        phoneNumber,
        state: "",
        username: email
      } as User);

      ResponseUtils.toastIfNotOk(response, "Error creating user.");
    }
  }

  const formInputs: JSX.Element = (
    <React.Fragment>
      <Input
        placeholder="First Name"
        id="firstName"
        value={firstName}
        onChange={handleChange}
        type="text"
        autoComplete="first-name"
        autoCapitalize="true"
      />
      <Input
        placeholder="Last Name"
        id="lastName"
        value={lastName}
        onChange={handleChange}
        type="text"
        autoComplete="last-name"
        autoCapitalize="true"
      />
      <Input
        placeholder="Email"
        id="email"
        value={email}
        onChange={handleChange}
        helpText={emailMessage}
        type="text"
        autoComplete="email"
      />
      <Input
        placeholder="Phone Number"
        id="phoneNumber"
        value={phoneNumber}
        onChange={handleChange}
        helpText={phoneNumberMessage}
        type="text"
        autoComplete="phone-number"
      />
      <Input
        placeholder="Password"
        id="password"
        value={password}
        onChange={handleChange}
        helpText={passwordMessage}
        type="password"
        autoComplete="password"
      />
      <Input
        placeholder="Repeat Password"
        id="repeatPassword"
        value={repeatPassword}
        onChange={handleChange}
        helpText={repeatPasswordMessage}
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
        <Button
          id="signIn"
          onClick={props.handleSignInClick}
          type="button"
          variant="outlined"
        >
          Sign in
        </Button>
      </div>
    </div>
  );

  return (
    <Form
      buttonText="Create Account"
      formInputs={formInputs}
      handleSubmit={handleSubmit}
      icon={<LockOutlinedIcon />}
      title={title}
    />
  );
};

export default SignUpForm;
