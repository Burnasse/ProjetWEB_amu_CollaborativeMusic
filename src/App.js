import React from "react";
import io from "socket.io-client";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Room from "./Room/Room";
import "./App.css";
import {AuthProvider} from "./Authentication/Auth/Auth";
import PrivateRoute from "./Authentication/PrivateRoute";
import SignUp from "./Authentication/SignUp/SignUp";
import LogIn from "./Authentication/LogIn/LogIn";
import Home from "./Home/Home";

const socket = io("localhost:5000"/*https://collaborativemusic-server.herokuapp.com/"*/);
export const SocketContext = React.createContext(socket);

class App extends React.Component {
    render() {
        return (
            <AuthProvider>
                <SocketContext.Provider value={socket}>
                <Router>
                    <div>
                        <PrivateRoute exact path="/" component={Home} />
                        <Route path="/musicroom" component={Room}/>
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