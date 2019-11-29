import React, { useState } from "react";
import SignUpForm from "./signupform/SignUpForm.jsx";
import LogInForm from "./loginform/LogInForm.jsx";

function ProfilePage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [createAccount, setCreateAccount] = useState(true);

    function handleLoginClick() {
        setCreateAccount(false);
    }

    function handleSignUpClick() {
        setCreateAccount(true);
    }

    if (!loggedIn && createAccount)
        return <SignUpForm handleLogInClick={handleLoginClick} />;
    else if (!loggedIn && !createAccount)
        return <LogInForm handleSignUpClick={handleSignUpClick} />;
}

export default ProfilePage;
