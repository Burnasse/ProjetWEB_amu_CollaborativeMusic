import React, {useEffect, useState} from "react";
import io from 'socket.io-client';

import Chat from "../ChatComponent/Chat/Chat";
import MusicComponent from "../MusicComponent/MusicComponent";
import './MusicRoom.css';
import queryString from "query-string";

const addrLocation = "localhost:5000";//"https://collaborativemusic-server.herokuapp.com/"
let socket = io(addrLocation);

const MusicRoom = ({location}) =>{

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    console.log(location)

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        console.log(name, room)

        setRoom(room)
        setName(name)

        socket.emit('JOIN', {name, room}, () => {})

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [addrLocation, location.search, socket]) // seulement si LOCATION et location.search change

    return (
        <div className="musicRoom">
            <div className="musicComponent">
                <MusicComponent socket={socket}/>
            </div>
            <div className="chat">
                {/* eslint-disable-next-line no-restricted-globals */}
                <Chat socket={socket} room={room} name={name}/>
            </div>
        </div>
    )
}

export default MusicRoom;