import React from "react";
import { useUserContext } from "../../context/user/userStore";
import ProfileForm from "./views/ProfileForm";
import SignInForm from "./views/SignInForm";
import SignUpForm from "./views/SignUpForm";

const ProfilePage: React.FC = (): JSX.Element => {
  const { state } = useUserContext();
  const [createAccount, setCreateAccount] = React.useState<boolean>(true);

  const handleSignInClick = (event: any): void => {
    event.preventDefault();
    setCreateAccount(false);
  };

  const handleSignUpClick = (event: any): void => {
    event.preventDefault();
    setCreateAccount(true);
  };

  if ((!state.user || !state.user.email) && createAccount) {
    return <SignUpForm handleSignInClick={handleSignInClick} />;
  } else if ((!state.user || !state.user.email) && !createAccount) {
    return <SignInForm handleSignUpClick={handleSignUpClick} />;
  } else if (state.user) {
    return <ProfileForm user={state.user} />;
  } else {
    return <div>Error</div>;
  }
};

export default React.memo(ProfilePage);
