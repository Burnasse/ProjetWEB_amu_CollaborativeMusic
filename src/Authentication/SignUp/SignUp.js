import React, {useCallback} from "react";
import {withRouter} from "react-router";
import app from "../../firebaseConfig";
import "./signup.css";

const SignUp = ({history}) => {

    const handleSignUp = useCallback(async event => {
        event.preventDefault();

        const {username, email, password} = event.target.elements;
        const emailValue = email.value;
        const usernameValue = username.value;
        const passwordValue = password.value;

        try{
            await app
                .auth()
                .createUserWithEmailAndPassword(emailValue, passwordValue).then((userCredential) => {

                    if(userCredential.user)
                        userCredential.user.updateProfile({
                            displayName: usernameValue
                        }).then((s) => history.push("/"));
                });
        }catch (error) {
            alert(error)
        }


        history.push("/");
    }, [history]);

    return (
        <div className="signupOut">
            <div className="signupIn">
                <h1 className="head">Sign up</h1>
                <form onSubmit={handleSignUp}>
                    <div><input className="signupInput" name="username" placeholder="Username"/></div>
                    <div><input className="signupInput" name="email" type="email" placeholder="Email"/></div>
                    <div><input className="signupInput" name="password" type="password" placeholder="Password"/></div>
                    <button className="button" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(SignUp);