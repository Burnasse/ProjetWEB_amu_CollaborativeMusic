import React, {useContext, useEffect, useState} from "react";
import Chat from "../ChatComponent/Chat/Chat";
import MusicComponent from "../MusicComponent/MusicComponent";
import './room.css';
import queryString from "query-string";
import {SocketContext} from "../App";

const Room = ({location}) =>{

    const socket = useContext(SocketContext);

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    console.log(location)

    useEffect(() => {
        const {name, room} = queryString.parse(location.search)

        console.log(name, room)

        setRoom(room)
        setName(name)

        socket.emit('JOIN', {name, room}, (error) => {
            if(error){
                alert(error);
            }
        })

        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [location.search, socket])

    return (
        <div className="room">
            <div className="musicComponent">
                <MusicComponent/>
            </div>
            <div className="chat">
                {/* eslint-disable-next-line no-restricted-globals */}
                <Chat socket={socket} room={room} name={name}/>
            </div>
        </div>
    )
}

export default Room;