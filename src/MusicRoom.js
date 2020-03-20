import React from "react";

import Chat from "./ChatComponent/Chat/Chat";
import MusicComponent from "./MusicComponent/MusicComponent";
import './MusicRoom.css';

const MusicRoom = () =>{
    return (
        <div className="musicRoom">
            <div className="musicComponent">
                <MusicComponent/>
            </div>
            <div className="chat">
                {/* eslint-disable-next-line no-restricted-globals */}
                <Chat location={location}/>
            </div>
        </div>
    )
}

export default MusicRoom;