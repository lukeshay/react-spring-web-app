import React, { useState, Suspense } from "react";

const SignUpForm = React.lazy(() => import("./signupform/SignUpForm.jsx"));
const LogInForm = React.lazy(() => import("./loginform/LogInForm.jsx"));

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
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <SignUpForm handleLogInClick={handleLoginClick} />
            </Suspense>
        );
    else if (!loggedIn && !createAccount)
        return (
            <Suspense fallback={<div>Loading...</div>}>
                <LogInForm handleLogInClick={handleLoginClick} />
            </Suspense>
        );
}

export default ProfilePage;
