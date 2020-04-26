import React, {useContext, useEffect, useState} from "react";
import Chat from "../ChatComponent/Chat/Chat";
import MusicComponent from "../MusicComponent/MusicComponent";
import './room.css';
import queryString from "query-string";
import {SocketContext} from "../App";
import * as firebase from "firebase";

const Room = ({location}) =>{

    let name = "Guest"

    if(firebase.auth().currentUser)
        name = firebase.auth().currentUser.displayName;

    const socket = useContext(SocketContext);

    const [room, setRoom] = useState('');

    console.log(location);

    useEffect(() => {

        const {room} = queryString.parse(location.search);

        setRoom(room);

        socket.emit('JOIN', {name, room}, (error) => {
            if(error){
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [location.search, socket]);


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
};

export default Room;