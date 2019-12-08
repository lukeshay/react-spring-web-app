import React, { useState, useEffect } from "react";
import { lazy } from "@loadable/component";
import userStore from "../../stores/userStore";

const SignUpForm = lazy(() => import("./signupform/SignUpForm.jsx"));
const SignInForm = lazy(() => import("./signinform/SignInForm.jsx"));

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

    const handleLoginClick = async () => {
        setCreateAccount(false);
    };

    const handleSignUpClick = async () => {
        setCreateAccount(true);
    };

    if (!currentUser.email && createAccount)
        return <SignUpForm handleLogInClick={handleLoginClick} />;
    else if (!currentUser.email && !createAccount)
        return <SignInForm handleSignUpClick={handleSignUpClick} />;
    else if (currentUser) return <h1>Coming soon! {currentUser.email}</h1>;
}

export default ProfilePage;
