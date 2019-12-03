import React, { useState, Suspense } from "react";
import { lazy } from "@loadable/component";

const SignUpForm = lazy(() => import("./signupform/SignUpForm.jsx"));
const LogInForm = lazy(() => import("./loginform/LogInForm.jsx"));

const ProfilePage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [createAccount, setCreateAccount] = useState(true);

    const handleLoginClick = async () => {
        setCreateAccount(false);
    };

    const handleSignUpClick = async () => {
        setCreateAccount(true);
    };

    if (!loggedIn && createAccount)
        return <SignUpForm handleLogInClick={handleLoginClick} />;
    else if (!loggedIn && !createAccount)
        return <LogInForm handleSignUpClick={handleSignUpClick} />;
    else if (loggedIn) return <h1>Coming soon!</h1>;
};

export default ProfilePage;
