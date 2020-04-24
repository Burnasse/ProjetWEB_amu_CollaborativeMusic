import React, {useCallback, useContext} from "react";
import {withRouter, Redirect} from "react-router";
import app from "../../firebaseConfig";
import {AuthContext} from "../Auth/Auth.js";
import {Link} from "react-router-dom";
import './login.css';

const Login = ({history}) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="loginOut">
            <div className="loginIn">
                <h1 className="head">Log in</h1>
                <form onSubmit={handleLogin}>
                    <div><input className="loginInput" name="email" type="email" placeholder="Email"/></div>
                    <div><input className="loginInput" name="password" type="password" placeholder="Password"/></div>
                    <button className="button" type="submit">Log in</button>
                </form>
                <div className="signup">
                    <Link to="/signup">
                        SignUp
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Login);