import { useContext, useState } from "react";
import React from "react";
import { UserContext } from "../../context/user/userStore";
import ProfileForm from "./views/ProfileForm";
import SignInForm from "./views/SignInForm";
import SignUpForm from "./views/SignUpForm";

const ProfilePage: React.FC = () => {
  const { state } = useContext(UserContext);
  const [createAccount, setCreateAccount] = useState<boolean>(true);

  const handleSignInClick = (event: any) => {
    event.preventDefault();
    setCreateAccount(false);
  };

  const handleSignUpClick = (event: any) => {
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

export default ProfilePage;
