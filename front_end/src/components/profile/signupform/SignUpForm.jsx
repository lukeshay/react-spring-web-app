import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InlineTextInput from "../../common/inputs/InlineTextInput.jsx";
import InlineHiddenInput from "../../common/inputs/InlineHiddenInput.jsx";
import BlueButton from "../../common/buttons/BlueButton.jsx";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUpForm = props => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState("");

    const handleChange = async event => {
        const { id, value } = event.target;

        if (id === "firstName") {
            setFirstName(value);
        } else if (id === "lastName") {
            setLastName(value);
        } else if (id === "email") {
            setEmail(value);
        } else if (id === "password") {
            setPassword(value);
        }
    };

    useEffect(() => {
        const lowerCaseLetters = /[a-z]/g;
        const upperCaseLetters = /[A-Z]/g;
        const numbers = /[0-9]/g;
        const specialCharacters = /[!@#\$%\^\&*\)\(+=._-]/g;

        if (password.length == 0) {
            setPasswordMessage("");
        } else if (password.length < 8) {
            setPasswordMessage("Password must be at least 8 characters long.");
        } else if (!password.match(lowerCaseLetters)) {
            setPasswordMessage("Password must contain a lower case letter.");
        } else if (!password.match(upperCaseLetters)) {
            setPasswordMessage("Password must contain an upper case letter.");
        } else if (!password.match(numbers)) {
            setPasswordMessage("Password must contain a number.");
        } else if (!password.match(specialCharacters)) {
            setPasswordMessage("Password must contain a special character.");
        } else {
            setPasswordMessage("");
        }
    }, [password]);

    useEffect(() => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.length === 0) {
            setEmailMessage("");
        } else if (!email.match(emailRegex)) {
            setEmailMessage("Invalid email.");
        } else {
            setEmailMessage("");
        }
    }, [email]);

    const handleSubmit = async () => {};

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <header className="card-header">
                        <BlueOutlineButton
                            text="Log in"
                            bootstrap="float-right mt-1"
                            handleClick={props.handleLogInClick}
                        />
                        <h4 className="card-title mt-2">Sign up</h4>
                    </header>
                    <article className="card-body">
                        <form onSubmit={handleSubmit}>
                            <InlineTextInput
                                label="First Name"
                                id="firstName"
                                value={firstName}
                                handleChange={handleChange}
                            />
                            <InlineTextInput
                                label="Last Name"
                                id="lastName"
                                value={lastName}
                                handleChange={handleChange}
                            />
                            <InlineTextInput
                                label="Email"
                                id="email"
                                value={email}
                                handleChange={handleChange}
                                helpText={emailMessage}
                            />
                            <InlineHiddenInput
                                label="Password"
                                id="password"
                                value={password}
                                handleChange={handleChange}
                                helpText={passwordMessage}
                            />
                        </form>
                        <BlueButton
                            bootstrap="btn-block"
                            text="Create Account"
                            handleClick={() => {}}
                        />
                    </article>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
