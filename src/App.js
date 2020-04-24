import React from "react";
import io from "socket.io-client";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Room from "./Room/Room";
import "./App.css";
import {AuthProvider} from "./Authentication/Auth/Auth";
import PrivateRoute from "./Authentication/PrivateRoute";
import SignUp from "./Authentication/SignUp/SignUp";
import LogIn from "./Authentication/LogIn/LogIn";
import MusicRoom from "./HandleRoom/MusicRoom";

export const SocketContext = React.createContext(io("localhost:5000"));

const socket = io("localhost:5000");

class App extends React.Component {
    render() {
        return (
            <AuthProvider>
                <SocketContext.Provider value={socket}>
                <Router>
                    <div>
                        <PrivateRoute exact path="/" component={MusicRoom} />
                        <PrivateRoute path="/musicroom" component={Room}/>
                        <Route exact path="/login" component={LogIn}/>
                        <Route exact path="/signup" component={SignUp}/>
                    </div>
                </Router>
                </SocketContext.Provider>
            </AuthProvider>
        )
    }
}

export default App;