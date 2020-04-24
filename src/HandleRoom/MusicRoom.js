import React from "react";
import JoinRoom from "./Join/JoinRoom";
import CreateRoom from "./createRoom/CreateRoom";
import "./musicroom.css";

const MusicRoom = () => {

    return(
        <div className="musicRoom">
                <div className="block"><JoinRoom/></div>
                <div className="block"><CreateRoom/></div>
        </div>
    )
};

export default MusicRoom;