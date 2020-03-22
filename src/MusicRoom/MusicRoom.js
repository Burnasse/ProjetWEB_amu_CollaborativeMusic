import React from "react";
import io from 'socket.io-client';

import Chat from "../ChatComponent/Chat/Chat";
import MusicComponent from "../MusicComponent/MusicComponent";
import './MusicRoom.css';

const addrLocation = "https://collaborativemusic-server.herokuapp.com/"
let socket;

const MusicRoom = () =>{
    socket = io(addrLocation)

    return (
        <div className="musicRoom">
            <div className="musicComponent">
                <MusicComponent/>
            </div>
            <div className="chat">
                {/* eslint-disable-next-line no-restricted-globals */}
                <Chat location={location} socket={socket} addrLocation={addrLocation}/>
            </div>
        </div>
    )
}

export default MusicRoom;