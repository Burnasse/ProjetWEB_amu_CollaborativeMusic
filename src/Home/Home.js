import React from "react";
import JoinRoom from "./joinRoom/JoinRoom";
import CreateRoom from "./createRoom/CreateRoom";
import "./home.css";
import app from "../firebaseConfig";

const Home = () => {

    app.auth().onAuthStateChanged(user =>{
        if(user){
            console.log(app.auth().currentUser.displayName)
        }
    })

    return(
        <div className="musicRoom">
                <div className="block"><JoinRoom/></div>
                <div className="block"><CreateRoom/></div>
        </div>
    )
};

export default Home;