import { useEffect, useState } from "react";
import * as React from "react";
import { User } from "../../models/index";
import userStore from "../../stores/userStore";
import ProfileForm from "./forms/ProfileForm";
import SignInForm from "./forms/SignInForm";
import SignUpForm from "./forms/SignUpForm";

const ProfilePage: React.FC = () => {
  const [createAccount, setCreateAccount] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  useEffect(() => {
    userStore.addChangeListener(onChange);
    setCurrentUser(userStore.getUser());
    return () => userStore.removeChangeListener(onChange);
  }, []);

  const onChange = (): void => {
    setCurrentUser(userStore.getUser());
  };

  const handleSignInClick = (event: any) => {
    event.preventDefault();
    setCreateAccount(false);
  };

  const handleSignUpClick = (event: any) => {
    event.preventDefault();
    setCreateAccount(true);
  };

  if (!currentUser.email && createAccount) {
    return <SignUpForm handleSignInClick={handleSignInClick} />;
  } else if (!currentUser.email && !createAccount) {
    return <SignInForm handleSignUpClick={handleSignUpClick} />;
  } else if (currentUser) {
    return <ProfileForm />;
  } else {
    return <div>Error</div>;
  }
};

export default ProfilePage;
