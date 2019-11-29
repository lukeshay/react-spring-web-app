import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InlineTextInput from "../../common/inputs/InlineTextInput.jsx";
import BlueButton from "../../common/buttons/BlueButton.jsx";
import BlueOutlineButton from "../../common/buttons/BlueOutlineButton.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const SignUpPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = event => {
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

    async function handleSubmit() {}

    async function handleLogin() {}

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card">
                    <header className="card-header">
                        <BlueOutlineButton
                            bootstrap="float-right mt-1"
                            handleClick={handleLogin}
                            text={"Log in"}
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
                            />
                            <InlineTextInput
                                label="Password"
                                id="password"
                                value={password}
                                handleChange={handleChange}
                            />
                        </form>
                        <BlueButton
                            bootstrap="btn-block"
                            text="Submit"
                            handleClick={() => {}}
                        />
                    </article>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
