import React, { useState, useEffect } from "react";
import InlineTextInput from "../../common/inputs/InlineTextInput.jsx";
import InlineHiddenInput from "../../common/inputs/InlineHiddenInput.jsx";
import BlueButton from "../../common/buttons/BlueButton.jsx";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const LogInForm = props => {
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

    useEffect(() => {}, [password]);

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
                            text="Sign up"
                            bootstrap="float-right mt-1"
                            handleClick={props.handleSignUpClick}
                        />
                        <h4 className="card-title mt-2">Log in</h4>
                    </header>
                    <article className="card-body">
                        <form onSubmit={handleSubmit}>
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
                            text="Log in"
                            handleClick={() => {}}
                        />
                    </article>
                </div>
            </div>
        </div>
    );
};

export default LogInForm;
