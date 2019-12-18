import { useState, useEffect } from "react";
import * as React from "react";
import { lazy } from "@loadable/component";
import userStore from "../../stores/userStore";

const SignUpForm = lazy(() => import("./forms/SignUpForm.jsx"));
const SignInForm = lazy(() => import("./forms/SignInForm.jsx"));
const ProfileForm = lazy(() => import("./forms/ProfileForm.jsx"));

function ProfilePage() {
  const [createAccount, setCreateAccount] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    userStore.addChangeListener(onChange);
    setCurrentUser(userStore.getUser());
    return () => userStore.removeChangeListener(onChange);
  }, []);

  const onChange = () => {
    setCurrentUser(userStore.getUser());
  };

  const handleLoginClick = async event => {
    event.preventDefault();
    setCreateAccount(false);
  };

  const handleSignUpClick = async event => {
    event.preventDefault();
    setCreateAccount(true);
  };

  if (!currentUser.email && createAccount)
    return <SignUpForm handleLogInClick={handleLoginClick} />;
  else if (!currentUser.email && !createAccount)
    return <SignInForm handleSignUpClick={handleSignUpClick} />;
  else if (currentUser) return <ProfileForm />;
}

export default ProfilePage;
